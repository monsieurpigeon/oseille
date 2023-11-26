import { Flex } from '@chakra-ui/react';
import { AddressSettingBlock } from './blocks/AddressSettingBlock';
import { CountrySettingBlock } from './blocks/CountrySettingBlock';
import { LogoSettingBlock } from './blocks/LogoSettingBlock';
import { PracticesSettingBlock } from './blocks/PracticesSettingBlock';

export function FarmSection() {
  return (
    <Flex
      gap={6}
      wrap="wrap"
      width="100%"
    >
      <CountrySettingBlock />
      <AddressSettingBlock />
      <LogoSettingBlock />
      <PracticesSettingBlock />
    </Flex>
  );
}
