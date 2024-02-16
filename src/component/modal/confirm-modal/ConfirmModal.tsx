import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface Props {
  title?: string;
  message?: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ title, message, isOpen, onConfirm, onCancel }: Props) {
  return (
    <Modal
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onCancel}
    >
      <ModalOverlay backdropFilter="blur(1px)" />
      <ModalContent>
        <ModalHeader
          fontSize="lg"
          fontWeight="bold"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{message}</ModalBody>

        <ModalFooter>
          <Button onClick={onCancel}>Annuler</Button>
          <Button
            colorScheme="twitter"
            onClick={onConfirm}
            ml={3}
          >
            Confirmer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
