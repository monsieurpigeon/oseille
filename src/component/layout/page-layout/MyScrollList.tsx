import { Flex } from '@chakra-ui/react';
import { Children, ReactNode } from 'react';

interface MyScrollListProps {
  children: ReactNode;
  empty?: { title: string; onClick: () => void };
}

export function MyScrollList({ children, empty }: MyScrollListProps) {
  const isEmpty = Children.count(children) === 0;

  return isEmpty && empty != null ? (
    <Empty onClick={empty.onClick}>{children}</Empty>
  ) : (
    <Flex
      grow={1}
      direction="column"
      gap="10px"
      height={0}
      overflowY="auto"
      marginTop="20px"
    >
      {children}
    </Flex>
  );
}

const Empty = ({ children, onClick }: { children: ReactNode; onClick: () => void }) => {
  return (
    <Flex
      onClick={onClick}
      padding="10px"
      fontSize="1.2rem"
      textAlign="center"
      border="2px solid var(--chakra-colors-blue-200)"
      borderRadius="10px"
      cursor="pointer"
      alignItems="center"
      _hover={{ border: '2px solid var(--chakra-colors-blue-400)' }}
    >
      {children}
    </Flex>
  );
};

MyScrollList.Empty = Empty;
