import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { BaseSyntheticEvent, ReactNode } from 'react';

interface CreateModalProps {
  isOpen: boolean;
  cancelRef: React.MutableRefObject<any>;
  onClose: () => void;
  onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  title: string;
  body: ReactNode;
  footer: ReactNode;
}

export const CreateModal = ({ title, body, footer, isOpen, cancelRef, onClose, onSubmit }: CreateModalProps) => {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <form onSubmit={onSubmit}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
            >
              {title}
            </AlertDialogHeader>
            <AlertDialogBody>{body}</AlertDialogBody>

            <AlertDialogFooter>{footer}</AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </form>
    </AlertDialog>
  );
};
