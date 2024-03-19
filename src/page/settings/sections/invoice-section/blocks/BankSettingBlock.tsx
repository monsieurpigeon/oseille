import { Text } from '@chakra-ui/react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Farm } from '../../../../../backend';
import { SettingCard } from '../../../components/SettingCard';

export function BankSettingBlock() {
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const navigate = useNavigate();

  return (
    <SettingCard
      title="Ma banque"
      onUpdate={() => navigate('bank')}
    >
      {farm?.rib && <Text>RIB: {farm.rib}</Text>}
      {farm?.iban && <Text>IBAN: {farm.iban}</Text>}
      {farm?.bic && <Text>BIC: {farm.bic}</Text>}
    </SettingCard>
  );
}
