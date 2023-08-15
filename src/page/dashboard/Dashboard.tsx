import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { Invoice, store } from '../../backend';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MySimpleLayout } from '../../component/layout/page-layout/MySimpleLayout';
import { MyH1 } from '../../component/typography/MyFont';
import { getInvoicePrice } from '../../utils/aggregations';
import { priceFormatter } from '../../utils/formatter';
import { MetricCard, StyledMetricCards } from './MetricCards';

function getValues(invoices: Invoice[]) {
  return invoices.reduce(
    (memo, invoice) => ({
      quantity: memo.quantity + 1,
      money: memo.money + getInvoicePrice(invoice),
    }),
    { quantity: 0, money: 0 },
  );
}

export function Dashboard() {
  const snap = useSnapshot(store);

  const { invoicePaid, invoiceWaiting } = useMemo(() => {
    const invoicePaid = store.invoices.filter((i) => i.isPaid);
    const invoiceWaiting = store.invoices.filter((i) => !i.isPaid);

    return { invoicePaid: getValues(invoicePaid), invoiceWaiting: getValues(invoiceWaiting) };
  }, [snap]);

  return (
    <MySimpleLayout>
      <MyHeader>
        <MyH1>Dashboard</MyH1>
      </MyHeader>
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
    </MySimpleLayout>
  );
}
