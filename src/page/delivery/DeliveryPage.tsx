import { Button } from '@chakra-ui/react';
import { addDays } from 'date-fns';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { MyIcon } from '../../component/MyIcon';
import { ListItem } from '../../component/card/ListItem';
import { ListItemGroup } from '../../component/card/ListItemGroup';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { MyH1 } from '../../component/typography/MyFont';
import { dateFormatter } from '../../utils/formatter';
import { InvoiceCreateModal } from '../invoice/modal/InvoiceCreateModal';

export function DeliveryPage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('delivery_page_viewed');
  }, []);
  const snap = useSnapshot(store);
  const { id } = useParams();

  const navigate = useNavigate();

  const selected = useMemo(() => (id ? store.deliveries.find((el) => el.id === id) : undefined), [id, snap]);

  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <MyH1>Livraisons</MyH1>
          <Button
            colorScheme="twitter"
            onClick={() => navigate('create')}
          >
            Nouveau
          </Button>
        </MyHeader>
        <MyScrollList>
          {store.deliveries.length === 0 && (
            <MyScrollList.Empty onClick={() => navigate('create')}>Ajouter ma première livraison</MyScrollList.Empty>
          )}
          {store.customers.map((customer) => (
            <DeliveryCustomer
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

function DeliveryCustomer({ customer, selected }: any) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [toInvoice, setToInvoice] = useState<{ [key: string]: boolean }>({});
  const deliveries = store.deliveries
    .filter((delivery) => delivery.customerId === customer.id)
    .filter((delivery) => {
      const date = new Date(delivery.deliveredAt);
      const today = addDays(new Date(), -2 * 7);
      return !delivery.invoiceId || date > today;
    })
    .sort((a, b) => b.deliveredAt.localeCompare(a.deliveredAt));

  if (deliveries.length === 0) {
    return null;
  }
  return (
    <ListItemGroup
      title={customer.name}
      key={customer.id}
      action={
        <InvoiceCreateModal
          toInvoice={toInvoice}
          setToInvoice={setToInvoice}
        />
      }
    >
      {deliveries.map((delivery) => (
        <ListItem
          isSelected={selected?.id === delivery.id}
          key={delivery.id}
          onClick={() => navigate(delivery.id === id ? `/delivery` : `/delivery/${delivery.id}`)}
          checkable={!delivery.invoiceId}
          checked={toInvoice[delivery.id] || false}
          onCheck={() =>
            setToInvoice((i) => ({
              ...i,
              [delivery.id]: !i[delivery.id],
            }))
          }
        >
          {delivery.isOrder && <MyIcon name="order" />}
          {` ${delivery.documentId} - ${dateFormatter(delivery.deliveredAt)}`}
        </ListItem>
      ))}
    </ListItemGroup>
  );
}
