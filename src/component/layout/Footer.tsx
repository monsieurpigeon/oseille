import { Center, Flex, Link, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { VERSION } from '../../updateMe';
import { SideKick } from '../modules/sidekick/SideKick';

export function Footer() {
  return (
    <Center
      h="50px"
      borderTop="2px solid lightcyan"
    >
      <Flex>
        <Text>
          Fabriqué avec ❤️ & 🍅<NavLink to={'admin'}>🍆</NavLink>🧄🥦🥬🌽🥕🧅🥔 à Bordeaux. Retrouvez le code source sur{' '}
          <Link href="https://github.com/monsieurpigeon/oseille">Github</Link>
          ...version {VERSION}
        </Text>
      </Flex>
      <SideKick />
    </Center>
  );
}
