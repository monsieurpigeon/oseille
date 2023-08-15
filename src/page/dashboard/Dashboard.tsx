import { useMemo } from 'react';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { Invoice, store } from '../../backend';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MySide } from '../../component/layout/page-layout/MySide';
import { MyH1 } from '../../component/typography/MyFont';
import { getInvoicePrice } from '../../utils/aggregations';
import { priceFormatter } from '../../utils/formatter';

function getValues(invoices: Invoice[]) {
  return invoices.reduce(
    (memo, invoice) => {
      return {
        quantity: memo.quantity + 1,
        money: memo.money + getInvoicePrice(invoice),
      };
    },
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
    <MyPage>
      <MySide>
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
      </MySide>
    </MyPage>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  subValue: string;
}

const StyledMetricCards = styled.div`
  display: flex;
  gap: 24px;

  .card {
    box-sizing: content-box;
    width: 300px;
    height: 300px;
    border: 1px solid yellow;
    padding: 24px;
    border-radius: 10px;
    background-color: lightgrey;

    .title {
      font-weight: bold;
      font-size: 1.2em;
    }
  }
`;

function MetricCard({ title, value, subValue }: MetricCardProps) {
  return (
    <div className="card">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
      <div className="subValue">{subValue}</div>
    </div>
  );
}
