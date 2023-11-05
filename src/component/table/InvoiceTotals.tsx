import { Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Invoice } from '../../backend';
import { computeTaxes, getIsTVA } from '../../utils/aggregations';
import { priceFormatter } from '../../utils/formatter';

export function InvoiceTotals({ invoice }: { invoice: Invoice }) {
  const [state, setState] = useState<any>({ isTva: undefined, taxes: undefined });

  useEffect(() => {
    const getState = async () => ({ isTVA: await getIsTVA(invoice), taxes: await computeTaxes(invoice) });
    getState().then(setState);
  }, [invoice]);

  return (
    <TableContainer>
      <Table size="sm">
        <Tbody>
          <Tr>
            <Td>Total{state.isTVA && ' HT'}</Td>
            <Td
              isNumeric
              fontWeight="bold"
            >
              {priceFormatter(state.taxes?.total.ht)}
            </Td>
            {state.isTVA && (
              <>
                <Td>Total TVA</Td>
                <Td
                  isNumeric
                  fontWeight="bold"
                >
                  {priceFormatter(state.taxes?.total.tax)}
                </Td>

                <Td>Total TTC</Td>
                <Td
                  isNumeric
                  fontWeight="bold"
                >
                  {priceFormatter(state.taxes?.total.ttc)}
                </Td>
              </>
            )}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
