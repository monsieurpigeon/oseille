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

export function MyCreateModal({ onCreate, reset, title, handleSubmit, children }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      reset();
    }, 100);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    onCreate(e).then(handleClose).catch(console.error);
  };

  return (
    <>
      <Button
        colorScheme="twitter"
        onClick={onOpen}
      >
        Nouveau
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        closeOnOverlayClick={false}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
      >
        <AlertDialogOverlay>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  onClick={handleClose}
                >
                  Annuler
                </Button>
                <Button
                  colorScheme="blue"
                  type="submit"
                  ml={3}
                >
                  Enregistrer
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </form>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
