import { Flex, FormLabel } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { Farm, FarmInput, updateFarm } from '../../backend';
import { EMPTY_FARM } from '../../utils/defaults';
import { SelectBio } from '../form/SelectBio';
import { SideKickFeeling } from '../modules/sidekick/enums';
import { useSideKick } from '../modules/sidekick/SideKickContext';
import { MyModal } from './MyModal';

const practiceSchema = z.object({
  bioLabel: z.string(),
});

interface FarmPracticeModalProps {
  onClose: () => void;
}

export function FarmPracticeModal({ onClose }: FarmPracticeModalProps) {
  const posthog = usePostHog();
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const { say } = useSideKick();

  const { register, handleSubmit, reset, formState } = useForm<FarmInput>({
    resolver: zodResolver(practiceSchema),
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

    farm &&
      updateFarm({ ...farm, ...e })
        .then(() =>
          say({
            sentence: `Les pratiques ont bien été enregistrées`,
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
      title="Mes Pratiques"
      disabled={!formState.isDirty}
    >
      <Flex
        direction="column"
        gap="3"
        marginBottom="20px"
      >
        <FormLabel
          flexGrow={1}
          htmlFor="bioLabel"
        >
          Agriculture biologique ?
        </FormLabel>
        <SelectBio register={register} />
      </Flex>
      <div>
        <Link to="/about/team">Contactez moi</Link> pour ajouter des labels
      </div>
    </MyModal>
  );
}
