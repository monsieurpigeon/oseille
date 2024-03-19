import { Box, Select, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Control, FieldValues, useForm } from 'react-hook-form';
import { useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { Farm, updateFarm } from '../../backend';
import { MyNumberInput } from '../form/MyNumberInput';
import { useSideKick } from '../modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../modules/sidekick/enums';
import { MyModal } from './MyModal';

export const documentsSchema = z.object({
  invoiceId: z
    .string()
    .transform((v) => Number(v))
    .or(z.number()),
  deliveryId: z
    .string()
    .transform((v) => Number(v))
    .or(z.number()),
  year: z.string(),
});

interface DocumentIdInput {
  invoiceId: number;
  deliveryId: number;
  year: string;
}

const YEARS = [2023, 2024, 2025, 2026, 2027, 2028, 2029];

export function FarmDocumentIdModal({ onClose }: { onClose: () => void }) {
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const { say } = useSideKick();

  const currentYear = farm.year || 2023;
  const { register, control, formState, handleSubmit, reset } = useForm<DocumentIdInput>({
    resolver: zodResolver(documentsSchema),
    defaultValues: {
      invoiceId: farm?.invoiceId,
      deliveryId: farm?.deliveryId,
      year: `${currentYear}`,
    },
  });

  useEffect(() => {
    reset({
      invoiceId: farm?.invoiceId,
      deliveryId: farm?.deliveryId,
      year: `${currentYear}`,
    });
  }, [farm]);

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
      isOpen={true}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Mes documents"
      disabled={!formState.isDirty}
    >
      <Box flexGrow={1}>
        <Text>Prochaine livraison:</Text>
        <MyNumberInput
          min={1}
          control={control as unknown as Control<FieldValues>}
          name="deliveryId"
          isInt
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
