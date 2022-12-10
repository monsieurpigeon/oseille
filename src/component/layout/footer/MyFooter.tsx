import { Center, Flex, Link, Text } from '@chakra-ui/react';

export function MyFooter() {
  return (
    <Center h="50px">
      <Flex>
        <Text>
          Fabriqué avec ❤️ & 🍅🍆🧄🥦🥬🌽🥕🧅🥔 à Bordeaux. Retrouvez le code source sur{' '}
          <Link href="https://github.com/monsieurpigeon/oseille">Github</Link>
        </Text>
      </Flex>
    </Center>
  );
}
