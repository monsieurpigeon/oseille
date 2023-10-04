import { Flex, FormControl, FormLabel, Input, Select, Text, Textarea } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FarmInput, updateFarm } from '../../backend';
import { DEFAULT_FOOTER, DEFAULT_THREAT, EMPTY_FARM } from '../../utils/defaults';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';
import { MyNumberInput } from '../form/MyNumberInput';
import { useSideKick } from '../modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../modules/sidekick/enums';
import { MyModal } from './MyModal';

interface FarmInvoicingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const configSchema = z.object({
  footer: z.string(),
  isTVA: z.string(),
  invoiceDelay: z.number().gte(0),
  threat: z.string(),
});

export function FarmInvoicingModal({ isOpen, onClose }: FarmInvoicingModalProps) {
  const { farm } = useFarmParameters();
  const { say } = useSideKick();
  const cancelRef = useRef<any>();

  const { control, register, handleSubmit, formState, setValue } = useForm<FarmInput>({
    resolver: zodResolver(configSchema),
    defaultValues: { ...EMPTY_FARM, ...farm },
  });

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

  useEffect(() => {
    if (farm) {
      Object.keys(farm).forEach((key) => {
        setValue(key as keyof FarmInput, farm[key as keyof FarmInput]);
      });
    }
  }, [farm]);

  return (
    <MyModal
      cancelRef={cancelRef}
      isOpen={isOpen}
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
            control={control}
            name="invoiceDelay"
            min={0}
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
