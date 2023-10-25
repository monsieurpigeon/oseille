import { Flex, Spacer, Text } from '@chakra-ui/react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import { DEFAULT_FARM } from '../../utils/defaults';
import { HeaderNavigation } from './Navigation';

export function Header() {
  const { farm } = useRouteLoaderData('farm') as any;

  return (
    <Flex
      alignItems="center"
      padding="0 20px"
      gap={8}
      borderBottom="4px solid lightcyan"
      h="50"
      marginBottom="20px"
      bg="white"
    >
      <Link to="/">
        <Text fontSize="2xl">Oseille</Text>
      </Link>
      <Spacer />
      <HeaderNavigation />
      <Spacer />

      <Link to="/settings/farm">
        {farm?.title && <Text as="b">{farm?.title?.toUpperCase()}</Text>}
        {farm && !farm?.title && <Text as="b">{DEFAULT_FARM.title.toUpperCase()}</Text>}
      </Link>
    </Flex>
  );
}
