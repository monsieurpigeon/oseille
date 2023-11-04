import { Flex, FormLabel, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { FarmInput, updateFarm } from '../../backend';
import { EMPTY_FARM } from '../../utils/defaults';
import { useSideKick } from '../modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../modules/sidekick/enums';
import { MyModal } from './MyModal';

interface FarmBankModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const configSchema = z.object({
  rib: z.string(),
  iban: z.string(),
  bic: z.string(),
});

export function FarmBankModal({ isOpen, onClose }: FarmBankModalProps) {
  const { farm } = useRouteLoaderData('farm') as any;

  const cancelRef = useRef<any>();
  const { say } = useSideKick();

  const { register, handleSubmit, reset, formState } = useForm<FarmInput>({
    resolver: zodResolver(configSchema),
    defaultValues: { ...EMPTY_FARM, ...farm },
  });

  const onSubmit = (e: FarmInput) => {
    farm &&
      updateFarm({ ...farm, ...e })
        .then(() =>
          say({
            sentence: `Les coordonnées bancaires ont bien été enregistrées`,
            autoShutUp: true,
            feeling: SideKickFeeling.GOOD,
          }),
        )
        .then(onClose)
        .catch(console.error);
  };

  useEffect(() => {
    if (farm) reset(farm);
  }, [farm]);

  return (
    <MyModal
      cancelRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Ma banque"
      disabled={!formState.isDirty}
    >
      <Flex
        direction="column"
        mt={3}
        mb={3}
      >
        <FormLabel
          flexGrow={1}
          htmlFor="rib"
        >
          RIB
        </FormLabel>
        <Input
          placeholder={'RIB'}
          {...register('rib')}
        />
      </Flex>
      <Flex
        direction="column"
        mt={3}
        mb={3}
      >
        <FormLabel
          flexGrow={1}
          htmlFor="iban"
        >
          IBAN
        </FormLabel>
        <Input
          placeholder={'IBAN'}
          {...register('iban')}
        />
      </Flex>
      <Flex
        direction="column"
        mt={3}
        mb={3}
      >
        <FormLabel
          flexGrow={1}
          htmlFor="bic"
        >
          BIC
        </FormLabel>
        <Input
          placeholder={'BIC'}
          {...register('bic')}
        />
      </Flex>
    </MyModal>
  );
}
