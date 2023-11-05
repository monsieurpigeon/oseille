import { useDisclosure } from '@chakra-ui/react';
import { useRouteLoaderData } from 'react-router-dom';
import { FarmDocumentIdModal } from '../../../../../component/modal/FarmDocumentIdModal';
import { SettingCard } from '../../../components/SettingCard';

export function DocumentSettingBlock() {
  const { farm } = useRouteLoaderData('farm') as any;
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    </SettingCard>
  );
}
