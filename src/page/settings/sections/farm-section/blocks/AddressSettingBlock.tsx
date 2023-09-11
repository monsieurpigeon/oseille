import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { MyIcon } from '../../../../../component/MyIcon';
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
      {!farm?.title && <Text>Aucune adresse</Text>}
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
              <MyIcon name="phone" /> {farm?.phone}
            </div>
          )}
          {farm.email && (
            <div>
              <MyIcon name="email" /> {farm?.email}
            </div>
          )}
        </Flex>
      )}
    </SettingCard>
  );
}
