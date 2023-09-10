import { useDisclosure } from '@chakra-ui/react';
import { z } from 'zod';
import { Icon } from '../../../../../component/Icon';
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
      {farm?.bioLabel !== 'non' ? (
        <div>
          <Icon name="good" /> BIO : {farm?.bioLabel.toUpperCase()}
        </div>
      ) : (
        <div>Agriculture conventionnelle</div>
      )}
    </SettingCard>
  );
}
