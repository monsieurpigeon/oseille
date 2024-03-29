import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useRouteLoaderData } from 'react-router-dom';
import { Delivery } from '../../backend';
import { getDeliveryTotal } from '../../utils/aggregations';
import { Country } from '../../utils/defaults';
import { priceFormatter } from '../../utils/formatter';

export function DeliveryDescription({ delivery }: { delivery: Delivery }) {
  const { country } = useRouteLoaderData('farm') as { country: Country };

  return (
    <TableContainer
      width="full"
      overflowY="auto"
    >
      <Table size="sm">
        <Thead>
          <Tr>
            <Th width="50%">Produit</Th>
            <Th>Quantité</Th>
            <Th isNumeric>P.U. {delivery.isTVA && 'HT'}</Th>
            <Th isNumeric>Total {delivery.isTVA && 'HT'}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {delivery.lines
            .sort((a, b) => a.product.name.localeCompare(b.product.name))
            .map((line, index) => (
              <Tr key={`${index}`}>
                <Td whiteSpace="pre-wrap">{line.product.name}</Td>
                <Td>
                  {line.quantity} {line.product.unit}
                  {line.quantity > 1 ? 's' : ''}
                </Td>
                <Td isNumeric>{priceFormatter(line.product.price, country.currency)}</Td>
                <Td isNumeric>{priceFormatter(line.product.price * line.quantity, country.currency)}</Td>
              </Tr>
            ))}
          <Tr>
            <Td fontWeight="bold">
              {delivery.lines.length} ligne{delivery.lines.length > 1 ? 's' : ''} produit
            </Td>
            <Td></Td>
            <Td></Td>
            <Td
              isNumeric
              fontWeight="bold"
            >
              {priceFormatter(getDeliveryTotal(delivery), country.currency)}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
