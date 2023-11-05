import { Text, useDisclosure } from '@chakra-ui/react';
import { useRouteLoaderData } from 'react-router-dom';
import { FarmCompanyModal } from '../../../../../component/modal/FarmCompanyModal';
import { SettingCard } from '../../../components/SettingCard';

export function CompanySettingBlock() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { farm } = useRouteLoaderData('farm') as any;

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
