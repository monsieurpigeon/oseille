import { usePostHog } from 'posthog-js/react';
import { useEffect, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { Invoice, isInvoicePaid, store } from '../../backend';
import { MySimpleLayout } from '../../component/layout/page-layout/MySimpleLayout';
import { getInvoicePrice } from '../../utils/aggregations';
import { priceFormatter } from '../../utils/formatter';
import { MetricCard, StyledMetricCards } from './MetricCards';
import { SalesTable } from './SalesTable';

function getValues(invoices: Invoice[]) {
  return invoices.reduce(
    (memo, invoice) => ({
      quantity: memo.quantity + 1,
      money: memo.money + getInvoicePrice(invoice),
    }),
    { quantity: 0, money: 0 },
  );
}

export function DashboardPage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('home_page_viewed');
  }, []);
  const snap = useSnapshot(store);

  const { invoicePaid, invoiceWaiting } = useMemo(() => {
    const invoicePaid = store.invoices.filter((i) => isInvoicePaid(i));
    const invoiceWaiting = store.invoices.filter((i) => !isInvoicePaid(i));
    return { invoicePaid: getValues(invoicePaid), invoiceWaiting: getValues(invoiceWaiting) };
  }, [snap]);

  return (
    <MySimpleLayout>
      <StyledMetricCards>
        <MetricCard
          title="Factures en attente"
          value={priceFormatter(invoiceWaiting.money)}
          subValue={`${invoiceWaiting.quantity}`}
        />
        <MetricCard
          title="Factures payées"
          value={priceFormatter(invoicePaid.money)}
          subValue={`${invoicePaid.quantity}`}
        />
      </StyledMetricCards>
      <SalesTable />
    </MySimpleLayout>
  );
}
