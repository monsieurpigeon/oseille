import { SimpleGrid, Text } from '@chakra-ui/react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Farm } from '../../../../../backend';
import { Country } from '../../../../../utils/defaults';
import { SettingCard } from '../../../components/SettingCard';

export function CountrySettingBlock() {
  const { country } = useRouteLoaderData('farm') as { farm: Farm; country: Country };
  const navigate = useNavigate();

  return (
    <SettingCard
      title="Mon pays"
      onUpdate={() => navigate('country')}
    >
      <SimpleGrid
        columns={2}
        spacing={2}
      >
        <Text>Pays</Text>
        <Text as="b">{country.label}</Text>
        <Text>Devise</Text>
        <Text as="b">{country.symbol}</Text>
        <Text>Taxes</Text>
        <Text as="b">{country.taxes}</Text>
      </SimpleGrid>
    </SettingCard>
  );
}
