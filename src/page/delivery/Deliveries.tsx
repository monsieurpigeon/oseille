import { addDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Delivery, store } from '../../backend';
import { ListItem } from '../../component/card/ListItem';
import { ListItemGroup } from '../../component/card/ListItemGroup';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { MyH1 } from '../../component/typography/MyFont';
import { dateFormatter } from '../../utils/formatter';
import { DeliveryDetail } from './DeliveryDetail';
import { CreateDeliveryAction } from './actions/CreateDeliveryAction';
import { CreateInvoiceAction } from './actions/CreateInvoiceAction';

export function Deliveries() {
  const [selected, setSelected] = useState<Delivery>();
  const snap = useSnapshot(store);

  useEffect(() => {
    const updated = store.deliveries.find((p) => p.id === selected?.id);
    if (updated) {
      setSelected(updated);
    }
  }, [snap]);

  useEffect(() => {
    const updated = store.deliveries.find((p) => p.id === selected?.id);
    if (updated) {
      setSelected(updated);
    }
  }, [snap]);

  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <MyH1>Mes Livraisons</MyH1>
          <CreateDeliveryAction />
        </MyHeader>
        <MyScrollList>
          {store.customers.map((customer) => (
            <DeliveryCustomer
              key={customer.id}
              selected={selected}
              customer={customer}
              setSelected={setSelected}
            />
          ))}
        </MyScrollList>
      </MySide>
      <MySide>{selected && <DeliveryDetail selected={selected} />}</MySide>
    </MyPage>
  );
}

function DeliveryCustomer({ customer, selected, setSelected }: any) {
  const [toInvoice, setToInvoice] = useState<{ [key: string]: boolean }>({});
  const deliveries = store.deliveries
    .filter((delivery) => delivery.customerId === customer.id)
    .filter((delivery) => {
      const date = new Date(delivery.deliveredAt);
      const today = addDays(new Date(), -14);
      return !delivery.invoiceId || date > today;
    })
    .sort((a, b) => b.deliveredAt.localeCompare(a.deliveredAt));

  return (
    <ListItemGroup
      title={customer.name}
      key={customer.id}
      action={
        <CreateInvoiceAction
          toInvoice={toInvoice}
          setToInvoice={setToInvoice}
        />
      }
    >
      {deliveries.map((delivery) => (
        <ListItem
          isSelected={selected?.id === delivery.id}
          key={delivery.id}
          onClick={() => setSelected((e: Delivery) => (e?.id === delivery.id ? undefined : { ...delivery }))}
          checkable={!delivery.invoiceId}
          checked={toInvoice[delivery.id] || false}
          onCheck={() =>
            setToInvoice((i) => ({
              ...i,
              [delivery.id]: !i[delivery.id],
            }))
          }
        >
          {`${delivery.documentId} - ${dateFormatter(delivery.deliveredAt)}`}
        </ListItem>
      ))}
    </ListItemGroup>
  );
}
