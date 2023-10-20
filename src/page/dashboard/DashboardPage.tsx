import { Box, Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useMemo } from 'react';
import { Invoice, isInvoicePaid } from '../../backend';
import { MySimpleLayout } from '../../component/layout/page-layout/MySimpleLayout';
import { useData } from '../../context/DataContext';
import { getInvoiceTotal } from '../../utils/aggregations';
import { priceFormatter } from '../../utils/formatter';
import { SalesTable } from './SalesTable';

function getValues(invoices: Invoice[]) {
  return invoices.reduce(
    (memo, invoice) => ({
      quantity: memo.quantity + 1,
      money: memo.money + getInvoiceTotal(invoice, true),
    }),
    { quantity: 0, money: 0 },
  );
}

export function DashboardPage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('home_page_viewed');
  }, []);
  const { invoices } = useData();

  const { invoicePaid, invoiceWaiting } = useMemo(() => {
    const invoicePaid = invoices.filter((i) => isInvoicePaid(i));
    const invoiceWaiting = invoices.filter((i) => !isInvoicePaid(i));
    return { invoicePaid: getValues(invoicePaid), invoiceWaiting: getValues(invoiceWaiting) };
  }, [invoices]);

  return (
    <MySimpleLayout>
      <Box width={400}>
        <StatGroup>
          <Stat>
            <StatLabel>{`${invoiceWaiting.quantity} facture${
              invoiceWaiting.quantity > 1 && 's'
            } en attente`}</StatLabel>
            <StatNumber>{priceFormatter(invoiceWaiting.money)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>{`${invoicePaid.quantity} facture${invoicePaid.quantity > 1 && 's'} payée${
              invoicePaid.quantity > 1 && 's'
            }`}</StatLabel>
            <StatNumber>{priceFormatter(invoicePaid.money)}</StatNumber>
          </Stat>
        </StatGroup>
      </Box>

      <SalesTable />
    </MySimpleLayout>
  );
}
