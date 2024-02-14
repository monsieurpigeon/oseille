import { useDisclosure } from '@chakra-ui/react';
import { useRouteLoaderData } from 'react-router-dom';
import { Farm } from '../../../../../backend';
import { FarmDocumentIdModal } from '../../../../../component/modal/FarmDocumentIdModal';
import { SettingCard } from '../../../components/SettingCard';

export function DocumentSettingBlock() {
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentYear = farm.year || 2023;

  return (
    <SettingCard
      title="Documents"
      onUpdate={onOpen}
      isDanger
    >
      <FarmDocumentIdModal
        isOpen={isOpen}
        onClose={onClose}
      />
      <div>Prochaine livraison : {farm?.deliveryId}</div>
      <div>Prochaine facture : {farm?.invoiceId}</div>
      <div>Année en cours: {currentYear}</div>
    </SettingCard>
  );
}
