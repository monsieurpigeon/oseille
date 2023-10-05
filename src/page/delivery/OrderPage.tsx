import { Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
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
import { selectedOrdersAtom } from './useSelectOrders';

export function OrderPage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('order_page_viewed');
  }, []);

  const snap = useSnapshot(store);
  const { id } = useParams();

  const navigate = useNavigate();

  const selected = useMemo(() => (id ? store.deliveries.find((el) => el.id === id) : undefined), [id, snap]);
  const orders = store.deliveries.filter((delivery) => delivery.isOrder);
  const dateList = orders.map((delivery) => delivery.deliveredAt).sort();
  const dateSet = new Set(dateList);

  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <MyH1>Commandes</MyH1>
          <Button
            colorScheme="twitter"
            onClick={() => navigate('/order/create')}
          >
            Nouveau
          </Button>
        </MyHeader>
        <MyScrollList>
          {Array.from(dateSet).map((date) => (
            <OrderDate
              key={date}
              selected={selected}
              date={date}
              orders={orders.filter((order) => order.deliveredAt === date)}
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

function OrderDate({ date, selected, orders }: { date: string; selected: Delivery | undefined; orders: Delivery[] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toInvoice, setToInvoice]: [toInvoice: { [key: string]: boolean }, setToInvoice: any] =
    useAtom(selectedOrdersAtom);

  return (
    <>
      {orders.length > 0 && (
        <ListItemGroup
          title={dateFormatter(date)}
          key={date}
        >
          {orders.map((delivery) => {
            const customer = store.customers.find((customer) => customer.id === delivery.customerId);
            return (
              <ListItem
                isSelected={selected?.id === delivery.id}
                key={delivery.id}
                onClick={() => navigate(delivery.id === id ? `/order` : `/order/${delivery.id}`)}
                checkable={!delivery.invoiceId}
                checked={toInvoice[delivery.id] || false}
                onCheck={() =>
                  setToInvoice((i: { [key: string]: boolean }) => ({
                    ...i,
                    [delivery.id]: !i[delivery.id],
                  }))
                }
              >
                {`${delivery.documentId} - ${customer?.name}`}
              </ListItem>
            );
          })}
        </ListItemGroup>
      )}
    </>
  );
}
