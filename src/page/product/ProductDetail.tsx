import { Box, Button, Flex, Input, Select, Spacer, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Product, ProductInput, updateProduct } from '../../backend';
import { MyNumberInput } from '../../component/form/MyNumberInput';
import { MyH1 } from '../../component/typography/MyFont';
import { z } from 'zod';

const schema = z.object({
  id: z.string(),
  name: z.string().min(1),
  price: z.string(),
  unit: z.string(),
});

export function ProductDetail({ selected }: { selected: Product | undefined }) {
  const { control, register, handleSubmit, reset } = useForm<ProductInput>({
    resolver: zodResolver(schema),
    defaultValues: selected,
  });

  useEffect(() => {
    console.log(selected);
    reset(selected);
  }, [selected]);

  const onSubmit = (e: ProductInput) => {
    console.log(e);
    selected && updateProduct({ ...selected, ...e });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {!!selected && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Flex alignItems="center">
              <MyH1>Détail</MyH1>
              <Spacer />
              <Button
                colorScheme="twitter"
                type="submit"
                ml={3}
              >
                Enregistrer
              </Button>
            </Flex>

            <Box>
              {selected && (
                <Box>
                  <div>
                    <Box p={1}>
                      <Text>Nom</Text>
                      <Input
                        placeholder="Tomates cerises"
                        {...register('name')}
                      />
                    </Box>
                    <Box p={1}>
                      <Text>Prix</Text>
                      <MyNumberInput
                        control={control}
                        name="price"
                        min={0}
                        step={0.2}
                      />
                    </Box>
                    <Box p={1}>
                      <Text>Unité</Text>
                      <Select {...register('unit')}>
                        <option value={'kg'}>kg</option>
                        <option value={'piece'}>piece</option>
                      </Select>
                    </Box>
                  </div>
                </Box>
              )}
            </Box>
          </div>
        )}
      </div>
    </form>
  );
}
