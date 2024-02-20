import { Box, Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useMemo, useState } from 'react';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { Invoice, isInvoicePaid } from '../../backend';
import { yearAtom } from '../../component/layout/Header';
import { MySimpleLayout } from '../../component/layout/page-layout/MySimpleLayout';
import { getInvoiceTotal } from '../../utils/aggregations';
import { Country, CountryCode } from '../../utils/defaults';
import { priceFormatter } from '../../utils/formatter';
import { SalesTable } from './SalesTable';

async function getValues(invoices: Invoice[], code: CountryCode) {
  const result = await Promise.all(
    invoices.map(async (invoice) => {
      const total = await getInvoiceTotal(invoice, true, code);
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
  const [year] = useAtom(yearAtom);
  const { invoices: invoicesRaw } = useLoaderData() as { invoices: Invoice[] };
  const { country } = useRouteLoaderData('farm') as { country: Country };
  const [{ invoicePaid, invoiceWaiting }, setInvoices] = useState({
    invoicePaid: { quantity: 0, money: 0 },
    invoiceWaiting: { quantity: 0, money: 0 },
  });

  const invoices = useMemo(() => {
    if (year === '') return invoicesRaw;
    return invoicesRaw?.filter((invoice) => new Date(invoice.createdAt).getFullYear() === +year);
  }, [invoicesRaw, year]);

  useEffect(() => {
    const getInvoices = async () => {
      const invoicePaid = getValues(
        invoices.filter((i) => isInvoicePaid(i)),
        country.value,
      );
      const invoiceWaiting = getValues(
        invoices.filter((i) => !isInvoicePaid(i)),
        country.value,
      );
      const result = await Promise.all([invoicePaid, invoiceWaiting]);
      return { invoicePaid: result[0], invoiceWaiting: result[1] };
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
            <StatNumber>{priceFormatter(invoiceWaiting.money, country.currency)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>{`${invoicePaid.quantity} facture${invoicePaid.quantity > 1 ? 's' : ''} payée${
              invoicePaid.quantity > 1 ? 's' : ''
            }`}</StatLabel>
            <StatNumber>{priceFormatter(invoicePaid.money, country.currency)}</StatNumber>
          </Stat>
        </StatGroup>
      </Box>

      <SalesTable />
    </MySimpleLayout>
  );
}
