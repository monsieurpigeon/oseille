import {
  Box,
  Button,
  Flex,
  Kbd,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useRouteLoaderData } from 'react-router-dom';
import { Farm, updateFarm } from '../../../backend';
import { SideKickFeeling } from '../../modules/sidekick/enums';
import { useSideKick } from '../../modules/sidekick/SideKickContext';

export function YearAlertModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const { say } = useSideKick();

  const onCorrect = () => {
    farm &&
      updateFarm({ ...farm, year: new Date().getFullYear(), deliveryId: 1, invoiceId: 1 })
        .then(() =>
          say({
            sentence: `Les compteurs de documents ont bien été enregistrés`,
            autoShutUp: true,
            feeling: SideKickFeeling.GOOD,
          }),
        )
        .then(onClose);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay backdropFilter="blur(1px)" />
      <ModalContent>
        <ModalHeader
          fontSize="lg"
          fontWeight="bold"
        >
          🚨 Attention
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Votre année de facturation ne correspond pas à l'année en cours !</Text>
          <Text>
            En cliquant sur <Kbd>Corriger</Kbd> les numéros de BL et de factures seront remis à zéro, et l'année de
            facturation sera mise à jour avec l'année en cours.
          </Text>
          <SimpleGrid
            columns={4}
            gap={4}
            mt={4}
          >
            <Box>Année</Box>
            <Flex justifyContent="end">{farm?.year}</Flex>
            <Flex justifyContent="end">➡️</Flex>
            <Flex justifyContent="end">{new Date().getFullYear()}</Flex>
            <Box>N° BL</Box>
            <Flex justifyContent="end">{farm?.deliveryId}</Flex>
            <Flex justifyContent="end">➡️</Flex>
            <Flex justifyContent="end">1</Flex>
            <Box>N° Facture</Box>
            <Flex justifyContent="end">{farm?.invoiceId}</Flex>
            <Flex justifyContent="end">➡️</Flex>
            <Flex justifyContent="end">1</Flex>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Annuler</Button>
          <Button
            colorScheme="twitter"
            onClick={onCorrect}
            ml={3}
          >
            Corriger
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
