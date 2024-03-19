import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { BankSettingBlock } from './blocks/BankSettingBlock';
import { CompanySettingBlock } from './blocks/CompanySettingBlock';
import { InvoiceSettingBlock } from './blocks/InvoiceSettingBlock';

export function InvoiceSection() {
  return (
    <Flex
      gap={6}
      wrap="wrap"
      width="100%"
    >
      <BankSettingBlock />
      <CompanySettingBlock />
      <InvoiceSettingBlock />
      <Outlet />
    </Flex>
  );
}
