import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Farm } from '../../../../../backend';
import { SettingCard } from '../../../components/SettingCard';

export function DocumentSettingBlock() {
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const navigate = useNavigate();

  const currentYear = farm.year || 2023;

  return (
    <SettingCard
      title="Documents"
      onUpdate={() => navigate('documents')}
      isDanger
    >
      <div>Prochaine livraison : {farm?.deliveryId}</div>
      <div>Prochaine facture : {farm?.invoiceId}</div>
      <div>Année en cours: {currentYear}</div>
    </SettingCard>
  );
}
