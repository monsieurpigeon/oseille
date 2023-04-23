import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Delivery } from '../../backend';
import { priceFormatter } from '../../utils/formatter';
import { getDeliveryPrice, getDeliveryTaxes } from '../../utils/aggregations';
import { computeTaxes } from '../../utils/compute';

export function DeliveryDescription({ delivery }: { delivery: Delivery }) {
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th width="50%">Produit</Th>
            <Th>Quantité</Th>
            <Th isNumeric>P.U. {delivery.isTVA && 'HT'}</Th>
            <Th isNumeric>Total {delivery.isTVA && 'HT'}</Th>
            {delivery.isTVA && (
              <>
                <Th isNumeric>Total TVA</Th>
                <Th isNumeric>Total TTC</Th>
              </>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {delivery.lines.map((line, index) => (
            <Tr key={`${index}`}>
              <Td whiteSpace="pre-wrap">{line.product.name}</Td>
              <Td>
                {line.quantity} {line.product.unit}
                {line.quantity > 1 ? 's' : ''}
              </Td>
              <Td isNumeric>{priceFormatter(line.product.price)}</Td>
              <Td isNumeric>{priceFormatter(line.product.price * line.quantity)}</Td>
              {delivery.isTVA && (
                <>
                  <Td isNumeric>{priceFormatter(computeTaxes(line.product.price, line.quantity, line.product.tva))}</Td>
                  <Td isNumeric>
                    {priceFormatter(
                      line.product.price * line.quantity +
                        computeTaxes(line.product.price, line.quantity, line.product.tva),
                    )}
                  </Td>
                </>
              )}
            </Tr>
          ))}
          <Tr>
            <Td></Td>
            <Td></Td>
            <Td></Td>
            <Td
              isNumeric
              fontWeight="bold"
            >
              {priceFormatter(getDeliveryPrice(delivery))}
            </Td>
            {delivery.isTVA && (
              <>
                <Td
                  isNumeric
                  fontWeight="bold"
                >
                  {priceFormatter(getDeliveryTaxes(delivery))}
                </Td>
                <Td
                  isNumeric
                  fontWeight="bold"
                >
                  {priceFormatter(getDeliveryPrice(delivery) + getDeliveryTaxes(delivery))}
                </Td>
              </>
            )}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
