import { Text, useDisclosure } from '@chakra-ui/react';
import { useRouteLoaderData } from 'react-router-dom';
import { Farm } from '../../../../../backend';
import { FarmCompanyModal } from '../../../../../component/modal/FarmCompanyModal';
import { SettingCard } from '../../../components/SettingCard';

export function CompanySettingBlock() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };

  return (
    <SettingCard
      title="Mon entreprise"
      onUpdate={onOpen}
    >
      {isOpen && <FarmCompanyModal onClose={onClose} />}
      {farm?.siret && <Text>SIRET: {farm.siret}</Text>}
      {farm?.naf && <Text>NAF: {farm.naf}</Text>}
      {farm?.tva && <Text>Num. TVA : {farm.tva}</Text>}
    </SettingCard>
  );
}
