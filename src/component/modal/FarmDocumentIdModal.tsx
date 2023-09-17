import { Box, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateFarm } from '../../backend';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';
import { MyNumberInput } from '../form/MyNumberInput';
import { useSideKick } from '../modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../modules/sidekick/enums';
import { BasicModalProps, MyModal } from './MyModal';

export const documentsSchema = z.object({
  invoiceId: z.number().gte(0),
  deliveryId: z.number().gte(0),
});

interface DocumentIdInput {
  invoiceId: number;
  deliveryId: number;
}

export function FarmDocumentIdModal({ isOpen, onClose }: BasicModalProps) {
  const { farm } = useFarmParameters();
  const cancelRef = useRef<any>();
  const { say } = useSideKick();

  const { control, formState, handleSubmit, reset } = useForm<DocumentIdInput>({
    resolver: zodResolver(documentsSchema),
    defaultValues: {
      invoiceId: farm?.invoiceId,
      deliveryId: farm?.deliveryId,
    },
  });

  useEffect(() => {
    reset({
      invoiceId: farm?.invoiceId,
      deliveryId: farm?.deliveryId,
    });
  }, [farm]);

  const onSubmit = (e: DocumentIdInput) =>
    farm &&
    updateFarm({ ...farm, ...e })
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
      cancelRef={cancelRef}
      disabled={!formState.isDirty}
    >
      <Box flexGrow={1}>
        <Text>Prochaine livraison:</Text>
        <MyNumberInput
          min={1}
          control={control}
          name="deliveryId"
        />
      </Box>
      <Box flexGrow={1}>
        <Text>Prochaine facture:</Text>
        <MyNumberInput
          min={1}
          control={control}
          name="invoiceId"
        />
      </Box>
    </MyModal>
  );
}
