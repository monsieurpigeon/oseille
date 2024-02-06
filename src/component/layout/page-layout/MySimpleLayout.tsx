import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface MySimpleLayoutProps {
  children: ReactNode;
}

export function MySimpleLayout({ children }: MySimpleLayoutProps) {
  return (
    <Flex
      padding="20px"
      direction="column"
      gap="20px"
    >
      {children}
    </Flex>
  );
}
