import { Box, Select, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form';
import { useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { Farm, updateFarm } from '../../backend';
import { MyNumberInput } from '../form/MyNumberInput';
import { SideKickFeeling } from '../modules/sidekick/enums';
import { useSideKick } from '../modules/sidekick/SideKickContext';
import { MyModal } from './MyModal';

export const documentsSchema = z.object({
  invoiceId: z.number().gte(0),
  deliveryId: z.number().gte(0),
  year: z.string(),
});

interface DocumentIdInput {
  invoiceId: number;
  deliveryId: number;
  year: number;
}

const YEARS = [2023, 2024, 2025, 2026, 2027, 2028, 2029];

export function FarmDocumentIdModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const { say } = useSideKick();

  const currentYear = farm.year || 2023;

  const { register, formState, handleSubmit, reset } = useForm<DocumentIdInput>({
    resolver: zodResolver(documentsSchema),
    defaultValues: {
      invoiceId: farm?.invoiceId,
      deliveryId: farm?.deliveryId,
      year: currentYear,
    },
  });

  useEffect(() => {
    reset({
      invoiceId: farm?.invoiceId,
      deliveryId: farm?.deliveryId,
      year: currentYear,
    });
  }, [farm, isOpen]);

  const onSubmit = (e: DocumentIdInput) =>
    farm &&
    updateFarm({ ...farm, ...e, year: +e.year })
      .then(() =>
        say({
          sentence: `Les compteurs de documents ont bien été enregistrés`,
          autoShutUp: true,
          feeling: SideKickFeeling.GOOD,
        }),
      )
      .then(onClose);

  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Mes documents"
      disabled={!formState.isDirty}
    >
      <Box flexGrow={1}>
        <Text>Prochaine livraison:</Text>
        <MyNumberInput
          min={1}
          register={register as unknown as UseFormRegister<FieldValues>}
          name="deliveryId"
        />
      </Box>
      <Box flexGrow={1}>
        <Text>Prochaine facture:</Text>
        <MyNumberInput
          min={1}
          register={register as unknown as UseFormRegister<FieldValues>}
          name="invoiceId"
        />
      </Box>
      <Box flexGrow={1}>
        <Text>Année en cours:</Text>
        <Select {...register('year')}>
          {YEARS.map((year) => (
            <option
              key={year}
              value={year}
              selected={year === currentYear}
            >
              {year}
            </option>
          ))}
        </Select>
      </Box>
    </MyModal>
  );
}
