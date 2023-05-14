import { Button, ButtonProps } from '@chakra-ui/react';

interface MyButtonProps {
  onClick: () => void;
}

export function EditButton({ onClick, ...rest }: MyButtonProps & ButtonProps) {
  return (
    <Button
      colorScheme="yellow"
      onClick={onClick}
      {...rest}
    >
      Modifier
    </Button>
  );
}

export function DeleteButton() {}

export function CreateButton() {}
