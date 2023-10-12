import { Button, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { MyIcon } from '../MyIcon';
import { MyModal } from './MyModal';

interface Props {
  children: React.ReactNode;
}

export function InfoModal({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
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
        cancelRef={cancelRef}
        cancelLabel="Fermer"
      >
        {children}
      </MyModal>
    </>
  );
}
