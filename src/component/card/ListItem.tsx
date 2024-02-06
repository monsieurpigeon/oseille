import { Checkbox, Flex } from '@chakra-ui/react';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface ListItemProps {
  children: ReactNode;
  onClick: () => void;
  isSelected: boolean;
  checkable?: boolean;
  checked?: boolean;
  onCheck?: () => void;
  done?: boolean;
  alert?: boolean;
}

export function ListItem({ onClick, children, isSelected, checkable, checked, onCheck, done, alert }: ListItemProps) {
  return (
    <Flex
      alignItems="center"
      gap="20px"
      width="100%"
    >
      <Flex
        opacity={done ? 0.5 : 1}
        borderRadius="5px"
        alignItems="center"
        grow={1}
        border={isSelected ? '1px solid cyan' : '1px solid yellow'}
        p="10px"
        backgroundColor={isSelected ? 'lightcyan' : 'lightyellow'}
        justifyContent="space-between"
        cursor="pointer"
        className={clsx(isSelected && 'selected', done && 'done', alert && 'alert')}
        onClick={onClick}
        _hover={{ border: '1px dashed black' }}
      >
        {children}
      </Flex>
      {checkable && (
        <Checkbox
          border="darkcyan"
          checked={checked}
          onChange={onCheck}
          width="20px"
          height="20px"
          cursor="pointer"
          marginRight="20px"
        />
      )}
    </Flex>
  );
}
