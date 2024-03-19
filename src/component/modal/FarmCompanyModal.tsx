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
  siret: z.string(),
  naf: z.string(),
  tva: z.string(),
});

export function FarmCompanyModal() {
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
            sentence: `Les informations professionnelles ont bien été enregistrées`,
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
      title="Mon entreprise"
      disabled={!formState.isDirty}
    >
      <Flex
        direction="column"
        mt={3}
        mb={3}
      >
        <FormLabel
          flexGrow={1}
          htmlFor="siret"
        >
          SIRET
        </FormLabel>
        <Input
          placeholder={'SIRET'}
          {...register('siret')}
        />
      </Flex>

      <Flex
        direction="column"
        mt={3}
        mb={3}
      >
        <FormLabel
          flexGrow={1}
          htmlFor="naf"
        >
          NAF
        </FormLabel>
        <Input
          placeholder={'NAF'}
          {...register('naf')}
        />
      </Flex>

      <Flex
        direction="column"
        mt={3}
        mb={3}
      >
        <FormLabel
          flexGrow={1}
          htmlFor="tva"
        >
          N° TVA
        </FormLabel>
        <Input
          placeholder={'N° TVA'}
          {...register('tva')}
        />
      </Flex>
    </MyModal>
  );
}
