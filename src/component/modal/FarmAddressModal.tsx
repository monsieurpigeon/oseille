import { Flex, HStack, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { Farm, FarmInput, updateFarm } from '../../backend';
import { DEFAULT_FARM, EMPTY_FARM } from '../../utils/defaults';
import { SideKickFeeling } from '../modules/sidekick/enums';
import { useSideKick } from '../modules/sidekick/SideKickContext';
import { MyModal } from './MyModal';

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
  onClose: () => void;
}

export function FarmAddressModal({ onClose }: FarmAddressModalProps) {
  const posthog = usePostHog();
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const { say } = useSideKick();

  const { register, handleSubmit, reset, formState } = useForm<FarmInput>({
    resolver: zodResolver(farmSchema),
    defaultValues: { ...EMPTY_FARM, ...farm },
  });

  useEffect(() => {
    if (farm) reset(farm);
  }, [farm]);

  const onSubmit = (e: FarmInput) => {
    const farmInput = { ...farm, ...e };
    const farmUserId = `${farmInput.title} (${farmInput.zip})`;
    posthog?.identify(farmUserId, {
      farmUserId,
    });

    posthog?.capture('farm_update');

    farm &&
      updateFarm({ ...farm, ...e })
        .then(() =>
          say({
            sentence: `L'adresse a bien été enregistrée`,
            autoShutUp: true,
            feeling: SideKickFeeling.GOOD,
          }),
        )
        .then(onClose)
        .catch(console.error);
  };

  return (
    <MyModal
      isOpen={true}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Mon adresse"
      disabled={!formState.isDirty}
    >
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
    </MyModal>
  );
}
