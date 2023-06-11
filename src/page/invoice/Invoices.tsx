import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Invoice, store } from '../../backend';
import { ListItem } from '../../component/card/ListItem';
import { ListItemGroup } from '../../component/card/ListItemGroup';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { MyH1 } from '../../component/typography/MyFont';
import { dateFormatter } from '../../utils/formatter';
import { InvoiceDetail } from './InvoiceDetail';

export function Invoices() {
  const [selected, setSelected] = useState<Invoice>();
  const snap = useSnapshot(store);

  useEffect(() => {
    const updated = store.invoices.find((p) => p.id === selected?.id);
    if (updated) {
      setSelected(updated);
    } else {
      setSelected(undefined);
    }
  }, [snap]);

  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <MyH1>Mes Factures</MyH1>
        </MyHeader>
        <MyScrollList>
          {store.customers.map((customer) => (
            <InvoiceCustomer
              key={customer.id}
              selected={selected}
              customer={customer}
              setSelected={setSelected}
            />
          ))}
        </MyScrollList>
      </MySide>
      <MySide>{selected && <InvoiceDetail selected={selected} />}</MySide>
    </MyPage>
  );
}

function InvoiceCustomer({ customer, selected, setSelected }: any) {
  const invoices = store.invoices.filter((invoice) => invoice.customerId === customer.id);

  return (
    <ListItemGroup title={customer.name}>
      {invoices.map((invoice) => (
        <ListItem
          key={invoice.id}
          isSelected={selected?.id === invoice.id}
          onClick={() => setSelected((e: Invoice) => (e?.id === invoice.id ? undefined : { ...invoice }))}
        >
          {`${invoice.documentId} - ${dateFormatter(invoice.createdAt)}`}
        </ListItem>
      ))}
    </ListItemGroup>
  );
}
