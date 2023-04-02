import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';

export function ConfirmationModal({ label, title, message, onConfirm, color = 'twitter' }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  return (
    <>
      <Button
        colorScheme={color}
        onClick={onOpen}
      >
        {label}
      </Button>
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
            <AlertDialogBody>{message}</AlertDialogBody>

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
                  onConfirm();
                  onClose();
                }}
                ml={3}
              >
                Confirmer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
