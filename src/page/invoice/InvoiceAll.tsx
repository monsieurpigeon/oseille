import { Box, Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { differenceInDays } from 'date-fns';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { getInvoicePrice } from '../../utils/aggregations';
import { priceFormatter } from '../../utils/formatter';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';

const plural = (val: number) => (val > 1 ? 's' : '');

export function InvoiceAll() {
  const snap = useSnapshot(store);
  const { invoiceDelay } = useFarmParameters();

  const navigate = useNavigate();

  const paidLength = useMemo(() => store.invoices.filter((el) => el.isPaid).length, [snap]);
  const notPaidLength = useMemo(() => store.invoices.filter((el) => !el.isPaid).length, [snap]);

  const lateInvoices = store.invoices
    .filter((el) => !el.isPaid && differenceInDays(new Date(), new Date(el.createdAt)) > invoiceDelay)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  const lateLength = lateInvoices.length;

  const getCustomer = (id: string) => {
    return store.customers.find((el) => el.id === id);
  };

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
                <Tr
                  key={invoice.id}
                  onClick={() => navigate(`/invoice/${invoice.id}`)}
                >
                  <Th>J+{differenceInDays(new Date(), new Date(invoice.createdAt))}</Th>
                  <Th>
                    <Flex direction="column">
                      <Box>{invoice.customer.name}</Box>
                      <Box>{getCustomer(invoice?.customerId)?.phone}</Box>
                    </Flex>
                  </Th>
                  <Th isNumeric>{priceFormatter(getInvoicePrice(invoice))}</Th>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Flex>
  );
}
