import { differenceInDays } from 'date-fns';
import { useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { ListItem } from '../../component/card/ListItem';
import { ListItemGroup } from '../../component/card/ListItemGroup';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { MyH1 } from '../../component/typography/MyFont';
import { dateFormatter } from '../../utils/formatter';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';
import { InvoiceExportCsvButton } from './button/InvoiceExportCsvButton';

export function Invoices() {
  const snap = useSnapshot(store);
  const { id } = useParams();

  const selected = useMemo(() => (id ? store.invoices.find((el) => el.id === id) : undefined), [id, snap]);

  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <MyH1>Mes Factures</MyH1>
          <InvoiceExportCsvButton />
        </MyHeader>
        <MyScrollList>
          {store.customers.map((customer) => (
            <InvoiceCustomer
              key={customer.id}
              selected={selected}
              customer={customer}
            />
          ))}
        </MyScrollList>
      </MySide>
      <MySide>
        <Outlet />
      </MySide>
    </MyPage>
  );
}

function InvoiceCustomer({ customer, selected }: any) {
  const { id } = useParams();
  const { invoiceDelay } = useFarmParameters();

  const invoices = store.invoices.filter((invoice) => invoice.customerId === customer.id);
  const navigate = useNavigate();

  return (
    <ListItemGroup title={customer.name}>
      {invoices.map((invoice) => {
        const isLate = invoice.isPaid
          ? false
          : differenceInDays(new Date(), new Date(invoice.createdAt)) > invoiceDelay;
        return (
          <ListItem
            key={invoice.id}
            done={invoice.isPaid}
            alert={isLate}
            isSelected={selected?.id === invoice.id}
            onClick={() => navigate(invoice.id === id ? `/invoice` : `/invoice/${invoice.id}`)}
          >
            {isLate && '⚠️'} {`${invoice.documentId} - ${dateFormatter(invoice.createdAt)}`}
          </ListItem>
        );
      })}
    </ListItemGroup>
  );
}
