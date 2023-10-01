import { SettingCard } from '../../../components/SettingCard';
import { DestroyAction } from '../actions/DestoyAction';

export function DangerSettingBlock() {
  return (
    <SettingCard
      title="Réglages risqués"
      isDanger
    >
      <div>Pour absolument tout supprimer de Oseille. Pensez à Exporter avant, pour ne pas tout perdre.</div>
      <DestroyAction />
    </SettingCard>
  );
}
