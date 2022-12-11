import { ReactNode, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

type MyModalProps = { children: ReactNode; isOpen: boolean; title: string; onClose: () => void; onSubmit: () => void };

export function MySaveModal({ children, title, isOpen, onClose, onSubmit }: MyModalProps) {
  // TODO fix this type
  const cancelRef = useRef<any>();

  return (
    <AlertDialog
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
