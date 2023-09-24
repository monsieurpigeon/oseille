import { Center, Flex, Link, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { SideKick } from '../modules/sidekick/SideKick';

interface FooterProps {
  version: string;
}

export function Footer({ version }: FooterProps) {
  return (
    <Center
      h="50px"
      borderTop="2px solid lightcyan"
    >
      <Flex>
        <Text>
          Fabriqué avec ❤️ & 🍅<NavLink to={'admin'}>🍆</NavLink>🧄🥦🥬🌽🥕🧅🥔 à Bordeaux. Retrouvez le code source sur{' '}
          <Link href="https://github.com/monsieurpigeon/oseille">Github</Link>
          ...version {version}
        </Text>
      </Flex>
      <SideKick />
    </Center>
  );
}
