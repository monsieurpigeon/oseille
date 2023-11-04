import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const welcomeAtom = atomWithStorage('welcome', true);

export function WelcomeModal() {
  const [welcome, setWelcome] = useAtom(welcomeAtom);
  const onClose = () => setWelcome(false);

  return (
    <>
      {welcome && (
        <Modal
          isOpen={welcome}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Bienvenue sur Oseille !</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex
                gap={4}
                direction="column"
              >
                <Text>
                  Oseille est une application gratuite et hors-ligne qui vous permet de gérer la facturation de votre
                  exploitation.
                </Text>
                <Text>Pas besoin de s'inscrire, vous êtes tout de suite à la maison.</Text>
                <Text>Vos données restent chez vous et sont accessibles même sans internet.</Text>
                <Text>Pensez à régulièrement exporter vos données et à les stocker en sécurité.</Text>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={onClose}
              >
                C'est parti !
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
