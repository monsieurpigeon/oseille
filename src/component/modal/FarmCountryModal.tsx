import { Flex, Select } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { FarmInput, updateFarm } from '../../backend';
import { COUNTRIES, EMPTY_FARM } from '../../utils/defaults';
import { useSideKick } from '../modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../modules/sidekick/enums';
import { MyModal } from './MyModal';

const farmSchema = z.object({
  country: z.string().min(1),
});

interface FarmCountryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FarmCountryModal({ isOpen, onClose }: FarmCountryModalProps) {
  const posthog = usePostHog();
  const { farm } = useRouteLoaderData('farm') as any;
  const cancelRef = useRef<any>();
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
    farmInput.title &&
      farmInput.zip &&
      posthog?.identify(farmUserId, {
        farmUserId,
      });

    posthog?.capture('country_update');

    farm &&
      updateFarm({ ...farm, ...e })
        .then(() =>
          say({
            sentence: `Le pays a bien été enregistrée`,
            autoShutUp: true,
            feeling: SideKickFeeling.GOOD,
          }),
        )
        .then(onClose)
        .catch(console.error);
  };

  return (
    <MyModal
      cancelRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Mon pays"
      disabled={!formState.isDirty}
    >
      <Flex
        direction="column"
        gap="3"
        marginBottom="20px"
      >
        <Select {...register('country')}>
          {COUNTRIES.map((country) => (
            <option
              key={country.value}
              value={country.value}
            >
              {country.label}
            </option>
          ))}
        </Select>
      </Flex>
    </MyModal>
  );
}
