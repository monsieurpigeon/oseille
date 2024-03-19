import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { z } from 'zod';
import { DangerSettingBlock } from './blocks/DangerSettingBlock';
import { DocumentSettingBlock } from './blocks/DocumentSettingBlock';
import { ImportExportSettingBlock } from './blocks/ImportExportSettingBlock';

export const documentsSchema = z.object({
  invoiceId: z.number().gte(0),
  deliveryId: z.number().gte(0),
});

export function AdvancedSection() {
  return (
    <Flex
      gap={6}
      wrap="wrap"
      width="100%"
    >
      <ImportExportSettingBlock />
      <DocumentSettingBlock />
      <DangerSettingBlock />
      <Outlet />
    </Flex>
  );
}
