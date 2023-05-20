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

export function DeleteButton({ onClick, ...rest }: MyButtonProps & ButtonProps) {
  return (
    <Button
      colorScheme="red"
      onClick={onClick}
      {...rest}
    >
      Supprimer
    </Button>
  );
}

export function CreateButton() {}
