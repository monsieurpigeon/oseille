import { Flex, useDisclosure } from '@chakra-ui/react';
import { z } from 'zod';
import { Emoji } from '../../component/Emoji';
import { FarmAddressModal } from '../../component/modal/FarmAddressModal';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';
import { SettingCard } from './components/SettingCard';

export const farmSchema = z.object({
  title: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string(),
  zip: z.string().min(1),
  city: z.string().min(1),
  phone: z.string(),
  email: z.string(),
});

export function FarmSetting() {
  const { farm } = useFarmParameters();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <SettingCard
      title="Mon adresse"
      onUpdate={onOpen}
    >
      <FarmAddressModal
        isOpen={isOpen}
        onClose={onClose}
      />
      {farm && (
        <Flex direction="column">
          <div>{farm?.title}</div>
          <div>{farm?.address1}</div>
          <div>{farm?.address2}</div>
          <div>
            {farm?.zip} {farm?.city}
          </div>
          {farm.phone && (
            <div>
              <Emoji name="phone" /> {farm?.phone}
            </div>
          )}
          {farm.email && (
            <div>
              <Emoji name="email" /> {farm?.email}
            </div>
          )}
        </Flex>
      )}
    </SettingCard>
  );
}
