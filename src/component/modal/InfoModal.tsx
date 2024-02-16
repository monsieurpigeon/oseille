import { Button, useDisclosure } from '@chakra-ui/react';
import { MyIcon } from '../MyIcon';
import { MyModal } from './MyModal';

interface Props {
  children: React.ReactNode;
}

export function InfoModal({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        variant="ghost"
        padding={0}
      >
        <MyIcon name="info" />
      </Button>
      <MyModal
        isOpen={isOpen}
        onClose={onClose}
        title="Aide"
        cancelLabel="Fermer"
      >
        {children}
      </MyModal>
    </>
  );
}
