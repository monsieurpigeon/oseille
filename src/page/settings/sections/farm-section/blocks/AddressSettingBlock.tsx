import { Flex, Text } from '@chakra-ui/react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Farm } from '../../../../../backend';
import { MyIcon } from '../../../../../component/MyIcon';
import { SettingCard } from '../../../components/SettingCard';

export function AddressSettingBlock() {
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const navigate = useNavigate();

  return (
    <SettingCard
      title="Mon adresse"
      onUpdate={() => navigate('address')}
    >
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
