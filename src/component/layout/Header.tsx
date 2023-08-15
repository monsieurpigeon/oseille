import { Center, Flex, Spacer, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';
import { SideKick } from '../modules/sidekick/SideKick';

export function Header() {
  const { farm } = useFarmParameters();
  return (
    <Flex
      borderBottom="4px solid lightcyan"
      h="50"
      marginBottom="20px"
      bg="white"
    >
      <Center marginLeft="20px">
        <Link to="/">
          <Text fontSize="2xl">Oseille</Text>
        </Link>
      </Center>
      <Spacer />
      <Center marginRight="20px">
        <Text as="b">{farm?.title?.toUpperCase()}</Text>
      </Center>

      <Spacer />
      <Center marginRight="20px">
        <SideKick />
      </Center>
    </Flex>
  );
}
