import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Product } from '../../../backend';
import { MyIcon } from '../../../component/MyIcon';
import { ListItem } from '../../../component/card/ListItem';
import { Country, CountryCode, DEFAULT_TAX } from '../../../utils/defaults';
import { TVAFormatter } from '../../../utils/formatter';

interface Props {
  selected: boolean;
  entity: Product;
}

export const renderTaxFields = (isTVA: boolean, entity: Product, code: CountryCode) => {
  if (code === 'CA') {
    return (
      <>{isTVA && <Box whiteSpace="nowrap">TVQ: {entity.tvq ? <MyIcon name="good" /> : <MyIcon name="bad" />}</Box>}</>
    );
  }

  return <>{isTVA && <Text whiteSpace="nowrap">{`TVA: ${TVAFormatter(entity.tva || DEFAULT_TAX)}`}</Text>}</>;
};

export function ProductListElement({ selected, entity }: Props) {
  const navigate = useNavigate();

  const { country, isTVA } = useRouteLoaderData('farm') as { country: Country; isTVA: boolean };

  return (
    <ListItem
      key={entity.id}
      isSelected={selected}
      onClick={() => navigate(selected ? '' : entity.id)}
    >
      <Flex width="100%">
        <div>{`${entity.name} /${entity.unit}`}</div>
        <Spacer />
        {renderTaxFields(isTVA, entity, country.value)}
      </Flex>
    </ListItem>
  );
}
