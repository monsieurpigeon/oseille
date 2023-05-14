import { Button, Flex, FormControl, HStack, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FarmInput, updateFarm } from '../../backend';
import { MyH2 } from '../../component/typography/MyFont';
import { DEFAULT_FARM } from '../../utils/defaults';
import { EMPTY_FARM } from './Settings';

export const farmSchema = z.object({
  title: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string(),
  zip: z.string().min(1),
  city: z.string().min(1),
  phone: z.string(),
  email: z.string(),
});

export function Farm({ farm }: any) {
  const { register, handleSubmit, reset, formState } = useForm<FarmInput>({
    resolver: zodResolver(farmSchema),
    defaultValues: { ...EMPTY_FARM, ...farm },
  });

  useEffect(() => {
    if (farm) reset(farm);
  }, [farm]);

  const onSubmit = (e: FarmInput) => farm && updateFarm({ ...farm, ...e }).catch(console.error);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <MyH2>Ma ferme</MyH2>
          {
            <Flex
              direction="column"
              gap="3"
              marginBottom="20px"
            >
              <Input
                placeholder={DEFAULT_FARM.title}
                {...register('title')}
              />
              <Input
                placeholder={DEFAULT_FARM.address1}
                {...register('address1')}
              />
              <Input
                placeholder={DEFAULT_FARM.address2}
                {...register('address2')}
              />
              <HStack>
                <Input
                  placeholder={DEFAULT_FARM.zip}
                  {...register('zip')}
                />

                <Input
                  placeholder={DEFAULT_FARM.city}
                  {...register('city')}
                />
              </HStack>
              <Input
                placeholder={DEFAULT_FARM.phone}
                {...register('phone')}
              />
              <Input
                placeholder={DEFAULT_FARM.email}
                {...register('email')}
              />

              <Button
                type="submit"
                colorScheme={formState.isDirty ? 'blue' : 'gray'}
              >
                Enregistrer
              </Button>
            </Flex>
          }
        </FormControl>
      </form>
    </div>
  );
}
