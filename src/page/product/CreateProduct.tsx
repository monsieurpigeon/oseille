import { Box, Input, Select, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ProductInput, addProduct } from '../../backend';
import { MyNumberInput } from '../../component/form/MyNumberInput';
import { MyCreateModal } from '../../component/modal/MyCreateModal';

const schema = z.object({
  name: z.string().min(1),
  price: z.string(),
  unit: z.string(),
});

export function CreateProduct() {
  const { control, register, handleSubmit, reset } = useForm<ProductInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      price: 0,
      unit: 'kg',
    },
  });

  return (
    <MyCreateModal
      onCreate={addProduct}
      handleSubmit={handleSubmit}
      reset={reset}
      title="Nouveau produit"
    >
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
    </MyCreateModal>
  );
}
