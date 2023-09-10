import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { z } from 'zod';
import { store, updateFarm } from '../../../../backend';
import { useFarmParameters } from '../../../../utils/hooks/useFarmParameters';
import { DangerSettingBlock } from './blocks/DangerSettingBlock';
import { DocumentSettingBlock } from './blocks/DocumentSettingBlock';
import { ImportExportSettingBlock } from './blocks/ImportExportSettingBlock';

export const documentsSchema = z.object({
  invoiceId: z.number().gte(0),
  deliveryId: z.number().gte(0),
});

interface DocumentIdInput {
  invoiceId: number;
  deliveryId: number;
}

export function AdvancedSection() {
  const snap = useSnapshot(store);
  const { farm } = useFarmParameters();

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

  const onSubmit = (e: DocumentIdInput) => farm && updateFarm({ ...farm, ...e });
  return (
    <Flex
      gap={6}
      wrap="wrap"
      width="100%"
    >
      <ImportExportSettingBlock />
      <DocumentSettingBlock />
      <DangerSettingBlock />
    </Flex>
  );
}
