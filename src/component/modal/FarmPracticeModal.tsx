import { Flex, FormLabel, Select } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { FarmInput, updateFarm } from '../../backend';
import { EMPTY_FARM } from '../../utils/defaults';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';
import { useSideKick } from '../modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../modules/sidekick/enums';
import { MyModal } from './MyModal';

const practiceSchema = z.object({
  bioLabel: z.string(),
});

interface FarmPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FarmPracticeModal({ isOpen, onClose }: FarmPracticeModalProps) {
  const posthog = usePostHog();

  const { farm } = useFarmParameters();
  const cancelRef = useRef<any>();
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
      cancelRef={cancelRef}
      isOpen={isOpen}
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
        <Select {...register('bioLabel')}>
          <option value="non">NON</option>
          <option value="fr-bio-01">FR-BIO-01</option>
          <option value="fr-bio-09">FR-BIO-09</option>
          <option value="fr-bio-15">FR-BIO-15</option>
        </Select>
      </Flex>
      <div>
        <Link to="/contact">Contactez moi</Link> pour ajouter des labels
      </div>
    </MyModal>
  );
}
