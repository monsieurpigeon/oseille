import { Center, Flex, Link, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export function Footer() {
  return (
    <Center h="50px">
      <Flex>
        <Text>
          Fabriqué avec ❤️ & 🍅<NavLink to={'admin'}>🍆</NavLink>🧄🥦🥬🌽🥕🧅🥔 à Bordeaux. Retrouvez le code source sur{' '}
          <Link href="https://github.com/monsieurpigeon/oseille">Github</Link>
        </Text>
      </Flex>
    </Center>
  );
}
