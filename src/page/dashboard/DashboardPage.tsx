import { Box, Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Invoice, isInvoicePaid } from '../../backend';
import { MySimpleLayout } from '../../component/layout/page-layout/MySimpleLayout';
import { getInvoiceTotal } from '../../utils/aggregations';
import { priceFormatter } from '../../utils/formatter';
import { SalesTable } from './SalesTable';

async function getValues(invoices: Invoice[]) {
  const result = await Promise.all(
    invoices.map(async (invoice) => {
      const total = await getInvoiceTotal(invoice, true);
      return { quantity: 1, money: total };
    }),
  );

  return result.reduce(
    (memo, value) => ({
      quantity: memo.quantity + value.quantity,
      money: memo.money + value.money,
    }),
    { quantity: 0, money: 0 },
  );
}

export function DashboardPage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('home_page_viewed');
  }, []);
  const { invoices } = useLoaderData() as { invoices: Invoice[] };
  const [{ invoicePaid, invoiceWaiting }, setInvoices] = useState({
    invoicePaid: { quantity: 0, money: 0 },
    invoiceWaiting: { quantity: 0, money: 0 },
  });

  useEffect(() => {
    const getInvoices = async () => {
      const invoicePaid = await getValues(invoices.filter((i) => isInvoicePaid(i)));
      const invoiceWaiting = await getValues(invoices.filter((i) => !isInvoicePaid(i)));
      return { invoicePaid, invoiceWaiting };
    };
    getInvoices().then((result) => setInvoices(result));
  }, [invoices]);

  return (
    <MySimpleLayout>
      <Box width={400}>
        <StatGroup>
          <Stat>
            <StatLabel>{`${invoiceWaiting.quantity} facture${
              invoiceWaiting.quantity > 1 ? 's' : ''
            } en attente`}</StatLabel>
            <StatNumber>{priceFormatter(invoiceWaiting.money)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>{`${invoicePaid.quantity} facture${invoicePaid.quantity > 1 ? 's' : ''} payée${
              invoicePaid.quantity > 1 ? 's' : ''
            }`}</StatLabel>
            <StatNumber>{priceFormatter(invoicePaid.money)}</StatNumber>
          </Stat>
        </StatGroup>
      </Box>

      <SalesTable />
    </MySimpleLayout>
  );
}
