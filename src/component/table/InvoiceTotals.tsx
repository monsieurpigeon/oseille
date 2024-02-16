import { Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { Invoice } from '../../backend';
import { computeCanadaTaxes, computeTaxes, getIsTVA, TaxLine } from '../../utils/aggregations';
import { Country } from '../../utils/defaults';
import { priceFormatter } from '../../utils/formatter';

export function InvoiceTotals({ invoice }: { invoice: Invoice }) {
  const [state, setState] = useState<{
    isTVA: boolean | undefined;
    taxes:
      | undefined
      | {
          total: TaxLine & {
            tps: number;
            tvq: number;
          };
        }
      | {
          total: TaxLine;
          detail: TaxLine[];
        };
  }>({ isTVA: undefined, taxes: undefined });
  const { country } = useRouteLoaderData('farm') as { country: Country };

  useEffect(() => {
    const getState = async () => ({
      isTVA: await getIsTVA(invoice),
      taxes: country.value === 'CA' ? await computeCanadaTaxes(invoice) : await computeTaxes(invoice, country.value),
    });
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
              {state.taxes && priceFormatter(state.taxes.total.ht, country.currency)}
            </Td>
            {state.isTVA && (
              <>
                <Td>Total TVA</Td>
                <Td
                  isNumeric
                  fontWeight="bold"
                >
                  {state.taxes && priceFormatter(state.taxes.total.tax, country.currency)}
                </Td>

                <Td>Total TTC</Td>
                <Td
                  isNumeric
                  fontWeight="bold"
                >
                  {state.taxes && priceFormatter(state.taxes.total.ttc, country.currency)}
                </Td>
              </>
            )}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
