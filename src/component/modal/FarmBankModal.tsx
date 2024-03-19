import { Flex, FormLabel, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { Farm, FarmInput, updateFarm } from '../../backend';
import { EMPTY_FARM } from '../../utils/defaults';
import { SideKickFeeling } from '../modules/sidekick/enums';
import { useSideKick } from '../modules/sidekick/SideKickContext';
import { MyModal } from './MyModal';

export const configSchema = z.object({
  rib: z.string(),
  iban: z.string(),
  bic: z.string(),
});

export function FarmBankModal() {
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const { say } = useSideKick();
  const navigate = useNavigate();
  const onClose = () => {
    navigate('..');
  };

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
      isOpen={true}
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
