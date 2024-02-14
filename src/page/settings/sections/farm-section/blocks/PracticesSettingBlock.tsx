import { useDisclosure } from '@chakra-ui/react';
import { useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { Farm } from '../../../../../backend';
import { FarmPracticeModal } from '../../../../../component/modal/FarmPracticeModal';
import { MyIcon } from '../../../../../component/MyIcon';
import { SettingCard } from '../../../components/SettingCard';

export const practicesSchema = z.object({
  bioLabel: z.string(),
});

export function PracticesSettingBlock() {
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <SettingCard
      title="Mes pratiques"
      onUpdate={onOpen}
    >
      <FarmPracticeModal
        isOpen={isOpen}
        onClose={onClose}
      />
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
