import { useDisclosure } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { MyButton } from '../form/button/MyButton';
import { MySaveModal } from './MySaveModal';

type MyCreateModalProps = { children: ReactNode; title: string; onSubmit: () => void };
export function MyCreateModal({ children, onSubmit, title }: MyCreateModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MyButton
        label={'Nouveau'}
        onClick={onOpen}
      />
      <MySaveModal
        isOpen={isOpen}
        title={title}
        onClose={onClose}
        onSubmit={onSubmit}
        closeOnOverlayClick={false}
      >
        {children}
      </MySaveModal>
    </>
  );
}
