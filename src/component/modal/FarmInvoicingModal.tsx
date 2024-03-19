import { Flex, FormControl, FormLabel, Input, Select, Text, Textarea } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Control, FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { Farm, FarmInput, updateFarm } from '../../backend';
import { DEFAULT_FOOTER, DEFAULT_THREAT, EMPTY_FARM } from '../../utils/defaults';
import { MyNumberInput } from '../form/MyNumberInput';
import { SideKickFeeling } from '../modules/sidekick/enums';
import { useSideKick } from '../modules/sidekick/SideKickContext';
import { MyModal } from './MyModal';

export const configSchema = z.object({
  footer: z.string(),
  isTVA: z.string(),
  invoiceDelay: z
    .string()
    .transform((v) => Number(v))
    .or(z.number()),
  threat: z.string(),
});

export function FarmInvoicingModal() {
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const { say } = useSideKick();
  const navigate = useNavigate();
  const onClose = () => {
    navigate('..');
  };

  const { register, control, handleSubmit, formState, reset } = useForm<FarmInput>({
    resolver: zodResolver(configSchema),
    defaultValues: { ...EMPTY_FARM, ...farm },
  });

  useEffect(() => {
    reset({
      ...EMPTY_FARM,
      ...farm,
    });
  }, [farm]);

  const onSubmit = (e: FarmInput) => {
    farm &&
      updateFarm({ ...farm, ...e })
        .then(() =>
          say({
            sentence: `Les informations de facturation ont bien été enregistrées`,
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
      title="Mes factures"
      disabled={!formState.isDirty}
    >
      <FormControl>
        <Flex
          direction="column"
          mt={3}
          mb={3}
        >
          <FormLabel
            flexGrow={1}
            htmlFor="isTVA"
          >
            Gérer la TVA ?
          </FormLabel>
          <Select {...register('isTVA')}>
            <option value="non">NON</option>
            <option value="oui">OUI</option>
          </Select>
        </Flex>
        <Flex direction="column">
          <FormLabel>Mon pied de page</FormLabel>
          <Text>S'affiche en bas des documents</Text>
          <Input
            placeholder={DEFAULT_FOOTER}
            {...register('footer')}
          />
        </Flex>
        <Flex direction="column">
          <FormLabel>Échéance</FormLabel>
          <MyNumberInput
            control={control as unknown as Control<FieldValues>}
            name="invoiceDelay"
            min={0}
            isInt
          />
        </Flex>
        <Flex direction="column">
          <FormLabel>En cas de retard de paiement</FormLabel>
          <Textarea
            placeholder={`${DEFAULT_THREAT.slice(0, 56)}...`}
            {...register('threat')}
          />
        </Flex>
      </FormControl>
    </MyModal>
  );
}
