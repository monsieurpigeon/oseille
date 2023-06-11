import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { ReactNode, useRef } from 'react';

interface BasicModalProps {
  title: string;
  children: ReactNode;
  footer: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  cancelRef: React.MutableRefObject<any>;
}

export function BasicModal({ title, children, footer, isOpen, onClose, cancelRef }: BasicModalProps) {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
          >
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>{children}</AlertDialogBody>

          <AlertDialogFooter>{footer}</AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
