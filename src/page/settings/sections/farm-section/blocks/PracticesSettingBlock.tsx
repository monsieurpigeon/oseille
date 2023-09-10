import { useDisclosure } from '@chakra-ui/react';
import { z } from 'zod';
import { MyIcon } from '../../../../../component/MyIcon';
import { FarmPracticeModal } from '../../../../../component/modal/FarmPracticeModal';
import { useFarmParameters } from '../../../../../utils/hooks/useFarmParameters';
import { SettingCard } from '../../../components/SettingCard';

export const practicesSchema = z.object({
  bioLabel: z.string(),
});

export function PracticesSettingBlock() {
  const { farm } = useFarmParameters();
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
      {farm?.bioLabel && farm.bioLabel !== 'non' ? (
        <div>
          <MyIcon name="good" /> BIO : {farm?.bioLabel?.toUpperCase()}
        </div>
      ) : (
        <div>Agriculture conventionnelle</div>
      )}
    </SettingCard>
  );
}
