import { Box, Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { differenceInDays } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { Customer, Invoice, isInvoicePaid } from '../../backend';
import { getInvoiceTotal } from '../../utils/aggregations';
import { Country } from '../../utils/defaults';
import { priceFormatter } from '../../utils/formatter';

const plural = (val: number) => (val > 1 ? 's' : '');

const StyledTr = styled(Tr)`
  &:hover {
    background-color: #f5f5f5;
  }
`;

export function InvoiceAll() {
  const { invoiceDelay } = useRouteLoaderData('farm') as any;
  const { invoices, customers } = useRouteLoaderData('invoices') as {
    invoices: Invoice[];
    customers: Customer[];
  };

  const { country } = useRouteLoaderData('farm') as { country: Country };

  const [totals, setTotals] = useState<Record<string, number>>({});

  useEffect(() => {
    const totalsPromise = invoices.map((invoice) => getInvoiceTotal(invoice, false, country.value));
    Promise.all(totalsPromise)
      .then((result) =>
        result.reduce((memo, total, index) => {
          memo[invoices[index].id] = total;
          return memo;
        }, {} as Record<string, number>),
      )
      .then(setTotals);
  }, [invoices, customers]);

  const navigate = useNavigate();

  const paidLength = useMemo(() => invoices.filter((el) => isInvoicePaid(el)).length, [invoices]);
  const notPaidLength = useMemo(() => invoices.filter((el) => !isInvoicePaid(el)).length, [invoices]);

  const lateInvoices = invoices
    .filter((el) => !isInvoicePaid(el) && differenceInDays(new Date(), new Date(el.createdAt)) > invoiceDelay)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  const lateLength = lateInvoices.length;

  return (
    <Flex
      direction="column"
      gap={10}
      alignItems="center"
    >
      <Flex direction="column">
        <Box>{`${paidLength} facture${plural(paidLength)} payée${plural(paidLength)}`}</Box>
        <Box>{`${notPaidLength} facture${plural(notPaidLength)} non-payée${plural(notPaidLength)}`}</Box>
        <Box>{lateLength > 0 && `Dont ${lateLength} facture${plural(lateLength)} en retard`}</Box>
      </Flex>
      {lateLength > 0 && (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>🔔 Retard</Th>
                <Th>Client</Th>
                <Th>Montant</Th>
              </Tr>
            </Thead>
            <Tbody>
              {lateInvoices.map((invoice) => {
                const customer = customers.find((customer) => customer.id === invoice.customer);
                return (
                  <StyledTr
                    key={invoice.id}
                    onClick={() => navigate(invoice.id)}
                    className="clickable"
                  >
                    <Th>J+{differenceInDays(new Date(), new Date(invoice.createdAt))}</Th>
                    <Th>
                      <Flex direction="column">
                        <Box>{customer?.name}</Box>
                        <Box>{customer?.phone}</Box>
                      </Flex>
                    </Th>
                    <Th isNumeric>{priceFormatter(totals[invoice.id], country.currency)}</Th>
                  </StyledTr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Flex>
  );
}
