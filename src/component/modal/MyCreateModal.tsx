import { ReactNode } from 'react';
import { MySaveModal } from './MySaveModal';
import { MyButton } from '../form/button/MyButton';
import { useDisclosure } from '@chakra-ui/react';

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
      >
        {children}
      </MySaveModal>
    </>
  );
}
