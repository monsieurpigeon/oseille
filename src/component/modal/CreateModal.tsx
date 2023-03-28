import { useDisclosure } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { MyButton } from '../form/button/MyButton';
import { SaveModal } from './SaveModal';

type CreateModalProps = { children: ReactNode; title: string; onSubmit: () => void; onCancel?: () => void };
export function CreateModal({ children, onSubmit, onCancel, title }: CreateModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MyButton
        label={'Nouveau'}
        onClick={onOpen}
      />
      <SaveModal
        isOpen={isOpen}
        title={title}
        onClose={() => {
          onCancel?.();
          onClose();
        }}
        onSubmit={onSubmit}
        closeOnOverlayClick={false}
      >
        {children}
      </SaveModal>
    </>
  );
}

// TODO : DEPRECATED
