import { useDisclosure } from '@chakra-ui/react';
import { FarmDocumentIdModal } from '../../../../../component/modal/FarmDocumentIdModal';
import { useFarmParameters } from '../../../../../utils/hooks/useFarmParameters';
import { SettingCard } from '../../../components/SettingCard';

export function DocumentSettingBlock() {
  const { farm } = useFarmParameters();
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
