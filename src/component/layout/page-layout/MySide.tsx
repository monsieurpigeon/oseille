import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface MySideProps {
  children: ReactNode;
}

export function MySide({ children }: MySideProps) {
  return (
    <Flex
      direction="column"
      p="0 20px"
    >
      {children}
    </Flex>
  );
}
