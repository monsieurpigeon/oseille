import { Center, Flex, Spacer, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { SideKick } from '../modules/sidekick/SideKick';

export function Header() {
  return (
    <Flex>
      <Center p="4">
        <Link to="/">
          <Text fontSize="2xl">Oseille</Text>
        </Link>
      </Center>
      <Spacer />
      <Center p="4">
        <SideKick />
      </Center>
    </Flex>
  );
}
