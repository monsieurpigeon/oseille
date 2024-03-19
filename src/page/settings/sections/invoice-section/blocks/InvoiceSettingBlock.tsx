import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Farm } from '../../../../../backend';
import { MyIcon } from '../../../../../component/MyIcon';
import { DEFAULT_INVOICE_DELAY, DEFAULT_THREAT } from '../../../../../utils/defaults';
import { SettingCard } from '../../../components/SettingCard';

export function InvoiceSettingBlock() {
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const navigate = useNavigate();

  const delay = farm?.invoiceDelay ?? DEFAULT_INVOICE_DELAY;

  return (
    <SettingCard
      title="Mes factures"
      onUpdate={() => navigate('invoices')}
    >
      {farm?.isTVA && farm.isTVA !== 'non' ? (
        <div>
          <MyIcon name="good" /> Gestion de la TVA
        </div>
      ) : (
        <div>Pas de gestion de TVA</div>
      )}
      {farm?.footer && (
        <div>
          <div>
            <MyIcon name="good" /> Pied de page personnalisé
          </div>
          <div>{farm.footer}</div>
        </div>
      )}
      <div>{`Échéance : ${delay} jour${delay > 1 ? 's' : ''}`}</div>
      <div>Conditions de retard de paiement: {farm?.threat || DEFAULT_THREAT}</div>
    </SettingCard>
  );
}
