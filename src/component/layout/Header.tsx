import { Center, Flex, Spacer, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { SideKick } from '../modules/sidekick/SideKick';

export function Header() {
  return (
    <Flex
      borderBottom="4px solid lightcyan"
      h="50"
      marginBottom="20px"
    >
      <Center marginLeft="20px">
        <Link to="/">
          <Text fontSize="2xl">Oseille</Text>
        </Link>
      </Center>

      <Spacer />
      <Center marginRight="20px">
        <SideKick />
      </Center>
    </Flex>
  );
}
