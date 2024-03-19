import { Text } from '@chakra-ui/react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Farm } from '../../../../../backend';
import { SettingCard } from '../../../components/SettingCard';

export function CompanySettingBlock() {
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const navigate = useNavigate();

  return (
    <SettingCard
      title="Mon entreprise"
      onUpdate={() => navigate('company')}
    >
      {farm?.siret && <Text>SIRET: {farm.siret}</Text>}
      {farm?.naf && <Text>NAF: {farm.naf}</Text>}
      {farm?.tva && <Text>Num. TVA : {farm.tva}</Text>}
    </SettingCard>
  );
}
