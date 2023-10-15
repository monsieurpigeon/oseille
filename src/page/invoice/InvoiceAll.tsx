import { Box, Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { differenceInDays } from 'date-fns';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { isInvoicePaid, store } from '../../backend';
import { useData } from '../../utils/DataContext';
import { getInvoiceTotal } from '../../utils/aggregations';
import { priceFormatter } from '../../utils/formatter';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';

const plural = (val: number) => (val > 1 ? 's' : '');

const StyledTr = styled(Tr)`
  &:hover {
    background-color: #f5f5f5;
  }
`;

export function InvoiceAll() {
  const snap = useSnapshot(store);
  const { invoiceDelay } = useFarmParameters();
  const { getCustomer } = useData();

  const navigate = useNavigate();

  const paidLength = useMemo(() => store.invoices.filter((el) => isInvoicePaid(el)).length, [snap]);
  const notPaidLength = useMemo(() => store.invoices.filter((el) => !isInvoicePaid(el)).length, [snap]);

  const lateInvoices = store.invoices
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
              {lateInvoices.map((invoice) => (
                <StyledTr
                  key={invoice.id}
                  onClick={() => navigate(invoice.id)}
                  className="clickable"
                >
                  <Th>J+{differenceInDays(new Date(), new Date(invoice.createdAt))}</Th>
                  <Th>
                    <Flex direction="column">
                      <Box>{invoice.customer.name}</Box>
                      <Box>{getCustomer(invoice?.customerId)?.phone}</Box>
                    </Flex>
                  </Th>
                  <Th isNumeric>{priceFormatter(getInvoiceTotal(invoice))}</Th>
                </StyledTr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Flex>
  );
}
