import { Flex, useDisclosure } from '@chakra-ui/react';
import { Icon } from '../../../../../component/Icon';
import { FarmAddressModal } from '../../../../../component/modal/FarmAddressModal';
import { useFarmParameters } from '../../../../../utils/hooks/useFarmParameters';
import { SettingCard } from '../../../components/SettingCard';

export function AddressSettingBlock() {
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
              <Icon name="phone" /> {farm?.phone}
            </div>
          )}
          {farm.email && (
            <div>
              <Icon name="email" /> {farm?.email}
            </div>
          )}
        </Flex>
      )}
    </SettingCard>
  );
}
