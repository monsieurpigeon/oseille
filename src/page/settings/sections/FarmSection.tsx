import { Flex } from '@chakra-ui/react';
import { FarmSetting } from '../FarmSetting';
import { LogoSetting } from '../LogoSetting';

export function FarmSection() {
  return (
    <Flex gap={16}>
      <LogoSetting />
      <FarmSetting />
    </Flex>
  );
}
