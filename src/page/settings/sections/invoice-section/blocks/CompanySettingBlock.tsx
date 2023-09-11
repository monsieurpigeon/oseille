import { Text, useDisclosure } from '@chakra-ui/react';
import { FarmCompanyModal } from '../../../../../component/modal/FarmCompanyModal';
import { useFarmParameters } from '../../../../../utils/hooks/useFarmParameters';
import { SettingCard } from '../../../components/SettingCard';

export function CompanySettingBlock() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { farm } = useFarmParameters();

  return (
    <SettingCard
      title="Mon entreprise"
      onUpdate={onOpen}
    >
      <FarmCompanyModal
        isOpen={isOpen}
        onClose={onClose}
      />
      {farm?.siret && <Text>SIRET: {farm.siret}</Text>}
      {farm?.naf && <Text>NAF: {farm.naf}</Text>}
      {farm?.tva && <Text>Num. TVA : {farm.tva}</Text>}
    </SettingCard>
  );
}
