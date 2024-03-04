import {
  Button,
  Flex,
  Image,
  Kbd,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { welcomeAtom } from './WelcomeModal';

export function WelcomePresentationModal({ onConfirm }: { onConfirm: () => void }) {
  const [, setWelcome] = useAtom(welcomeAtom);
  const onClose = () => setWelcome(false);

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={true}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent className="no-select">
        <ModalHeader>Bienvenue sur Oseille !</ModalHeader>
        <Image
          src="/maraicher.jpg"
          alt="Maraicher"
          height={300}
          fit="cover"
        />
        <ModalBody>
          <Flex
            gap={4}
            direction="column"
          >
            <Text>
              Oseille est une application open-source, hors-ligne et gratuite qui vous permet de gérer facilement la
              facturation de votre ferme.
            </Text>
            <Text>Pas besoin de s'inscrire, vous êtes tout de suite à la maison.</Text>
            <Text>Vos données restent chez vous et sont accessibles même sans internet.</Text>
            <Text>
              Pensez à exporter régulièrement vos données (bouton <Kbd>Export</Kbd> en haut a droite) et à les stocker
              en sécurité.
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={onConfirm}
          >
            C'est parti !
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
