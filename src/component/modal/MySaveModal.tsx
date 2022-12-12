import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { ReactNode, useRef } from 'react';

type MyModalProps = {
  closeOnOverlayClick?: boolean;
  children: ReactNode;
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
};

export function MySaveModal({ children, title, isOpen, onClose, onSubmit, closeOnOverlayClick = true }: MyModalProps) {
  // TODO fix this type
  const cancelRef = useRef<any>();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      closeOnOverlayClick={closeOnOverlayClick}
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

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                onSubmit();
                onClose();
              }}
              ml={3}
            >
              Enregistrer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
