import { Center, Flex, Spacer, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DEFAULT_FARM } from '../../utils/defaults';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';

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
        <Link to="/settings/farm">
          {farm?.title && <Text as="b">{farm?.title?.toUpperCase()}</Text>}
          {farm && !farm?.title && <Text as="b">{DEFAULT_FARM.title.toUpperCase()}</Text>}
        </Link>
      </Center>
    </Flex>
  );
}
