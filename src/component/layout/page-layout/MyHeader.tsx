import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface MyHeaderProps {
  children: ReactNode;
}

export function MyHeader({ children }: MyHeaderProps) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
    >
      {children}
    </Flex>
  );
}
