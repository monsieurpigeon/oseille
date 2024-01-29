import { Flex } from '@chakra-ui/react';
import { Children, ReactNode } from 'react';

interface ListItemGroupProps {
  children: ReactNode;
  title: string;
  action?: ReactNode;
}

export function ListItemGroup({ children, title, action }: ListItemGroupProps) {
  const arrayChildren = Children.toArray(children);

  return (
    <Flex
      direction="column"
      gap="10px"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
      >
        <div className="bold">{title}</div>
        {action}
      </Flex>
      {arrayChildren.length === 0 ? <div className="faded">Rien pour le moment</div> : children}
    </Flex>
  );
}
