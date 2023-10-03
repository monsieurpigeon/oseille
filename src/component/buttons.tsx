import { Button, ButtonProps, CloseButton, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { MyH1 } from './typography/MyFont';

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

export function DetailButton() {
  const navigate = useNavigate();

  return (
    <Flex
      gap={2}
      alignItems="center"
    >
      <CloseButton onClick={() => navigate('..')} />
      <MyH1>Détail</MyH1>
    </Flex>
  );
}
