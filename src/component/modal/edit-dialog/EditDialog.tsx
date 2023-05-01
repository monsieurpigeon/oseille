import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useRef } from 'react';

export function EditDialog({ title, fields, footer, isOpen, onSubmit, onCancel }: any) {
  const cancelRef = useRef<any>();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCancel}
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
            <AlertDialogBody>{fields}</AlertDialogBody>

            <AlertDialogFooter>{footer}</AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </form>
    </AlertDialog>
  );
}
