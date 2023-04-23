import { Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { Invoice } from '../../backend';
import { getInvoicePrice, getInvoiceTaxes, getIsTVA } from '../../utils/aggregations';
import { priceFormatter } from '../../utils/formatter';

export function InvoiceTotals({ invoice }: { invoice: Invoice }) {
  const isTVA = getIsTVA(invoice);
  return (
    <TableContainer>
      <Table size="sm">
        <Tbody>
          <Tr>
            <Td>Total{isTVA && ' HT'}</Td>
            <Td
              isNumeric
              fontWeight="bold"
            >
              {priceFormatter(getInvoicePrice(invoice))}
            </Td>
          </Tr>
          {isTVA && (
            <>
              <Tr>
                <Td>Total TVA</Td>
                <Td
                  isNumeric
                  fontWeight="bold"
                >
                  {priceFormatter(getInvoiceTaxes(invoice))}
                </Td>
              </Tr>
              <Tr>
                <Td>Total TTC</Td>
                <Td
                  isNumeric
                  fontWeight="bold"
                >
                  {priceFormatter(getInvoicePrice(invoice) + getInvoiceTaxes(invoice))}
                </Td>
              </Tr>
            </>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
