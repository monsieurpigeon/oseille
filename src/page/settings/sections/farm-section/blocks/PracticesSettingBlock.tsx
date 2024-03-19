import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { Farm } from '../../../../../backend';
import { MyIcon } from '../../../../../component/MyIcon';
import { SettingCard } from '../../../components/SettingCard';

export const practicesSchema = z.object({
  bioLabel: z.string(),
});

export function PracticesSettingBlock() {
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const navigate = useNavigate();

  return (
    <SettingCard
      title="Mes pratiques"
      onUpdate={() => navigate('practices')}
    >
      {farm?.bioLabel && farm.bioLabel !== 'non' && farm.bioLabel !== 'sustainable' ? (
        <div>
          <MyIcon name="good" /> BIO : {farm?.bioLabel?.toUpperCase()}
        </div>
      ) : farm.bioLabel !== 'non' ? (
        <div>Agriculture raisonnée</div>
      ) : (
        <div>Agriculture conventionnelle</div>
      )}
    </SettingCard>
  );
}
