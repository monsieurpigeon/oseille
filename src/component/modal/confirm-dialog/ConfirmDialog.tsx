import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

export function ConfirmDialog({ title, message, isOpen, onConfirm, onCancel }: any) {
  const cancelRef = useRef<any>();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCancel}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
          >
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onCancel}
            >
              Annuler
            </Button>
            <Button
              colorScheme="blue"
              onClick={onConfirm}
              ml={3}
            >
              Confirmer
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
