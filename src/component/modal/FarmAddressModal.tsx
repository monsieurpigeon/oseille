import { Button, Flex, HStack, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FarmInput, updateFarm } from '../../backend';
import { EMPTY_FARM } from '../../page/settings/Settings';
import { DEFAULT_FARM } from '../../utils/defaults';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';
import { CreateModal } from './CreateModal';

const farmSchema = z.object({
  title: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string(),
  zip: z.string().min(1),
  city: z.string().min(1),
  phone: z.string(),
  email: z.string(),
});

interface FarmAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FarmAddressModal({ isOpen, onClose }: FarmAddressModalProps) {
  const { farm } = useFarmParameters();
  const cancelRef = useRef<any>();

  const { register, handleSubmit, reset, formState } = useForm<FarmInput>({
    resolver: zodResolver(farmSchema),
    defaultValues: { ...EMPTY_FARM, ...farm },
  });

  useEffect(() => {
    if (farm) reset(farm);
  }, [farm]);

  const onSubmit = (e: FarmInput) =>
    farm &&
    updateFarm({ ...farm, ...e })
      .then(onClose)
      .catch(console.error);

  return (
    <CreateModal
      cancelRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Mon adresse"
      body={
        <>
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
            </Flex>
          }
        </>
      }
      footer={
        <>
          <Button
            ref={cancelRef}
            onClick={onClose}
          >
            Annuler
          </Button>
          <Button
            colorScheme={formState.isDirty ? 'blue' : 'gray'}
            type="submit"
            ml={3}
          >
            Enregistrer
          </Button>
        </>
      }
    />
  );
}
