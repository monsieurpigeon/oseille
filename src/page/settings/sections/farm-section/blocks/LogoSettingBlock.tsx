import { Image, Text } from '@chakra-ui/react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { SettingCard } from '../../../components/SettingCard';

export function LogoSettingBlock() {
  const { logo } = useRouteLoaderData('farm') as { logo: string };
  const navigate = useNavigate();

  return (
    <SettingCard
      title="Mon Logo"
      onUpdate={() => navigate('logo')}
    >
      {logo && (
        <Image
          boxSize="150px"
          src={logo}
        />
      )}
      {!logo && <Text>Aucun logo</Text>}
    </SettingCard>
  );
}
