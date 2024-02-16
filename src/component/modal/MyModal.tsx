import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title: string;
  children?: ReactNode;
  disabled?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  onRemove?: () => void;
  width?: string;
}

export const MyModal = ({
  title,
  children,
  isOpen,
  onClose,
  onSubmit,
  disabled,
  confirmLabel,
  cancelLabel,
  onRemove,
  width,
}: CreateModalProps) => {
  return (
    <Modal
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay backdropFilter="blur(2px)" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit && onSubmit();
        }}
      >
        <ModalContent maxW={width}>
          <ModalHeader
            fontSize="lg"
            fontWeight="bold"
          >
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            <Flex
              flexGrow={1}
              justifyContent="space-between"
              direction="row-reverse"
            >
              <Flex gap={2}>
                <Button onClick={onClose}>{cancelLabel ?? 'Annuler'}</Button>
                {onSubmit && (
                  <Button
                    colorScheme="twitter"
                    type="submit"
                    disabled={disabled}
                  >
                    {confirmLabel ?? 'Enregistrer'}
                  </Button>
                )}
              </Flex>
              {onRemove && (
                <Button
                  onClick={onRemove}
                  colorScheme="red"
                >
                  Supprimer
                </Button>
              )}
            </Flex>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};
