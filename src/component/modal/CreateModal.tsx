import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';

export const CreateModal = ({ title, body, footer, isOpen, cancelRef, onClose, onSubmit }: any) => {
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
