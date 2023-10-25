import { Box, Button, Flex } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Delivery } from '../../backend';
import { ListItem } from '../../component/card/ListItem';
import { ListItemGroup } from '../../component/card/ListItemGroup';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { InfoModal } from '../../component/modal/InfoModal';
import { MyH1 } from '../../component/typography/MyFont';
import { useData } from '../../context/DataContext';
import { dateFormatter } from '../../utils/formatter';
import { selectedOrdersAtom } from './useSelectOrders';

export function OrderPage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('order_page_viewed');
  }, []);

  const { deliveries, getDelivery } = useData();
  const { id } = useParams();
  const navigate = useNavigate();

  const selected = useMemo(() => (id ? getDelivery(id) : undefined), [id, deliveries]);
  const orders = deliveries.filter((delivery) => delivery.isOrder);
  const dateList = orders.map((delivery) => delivery.deliveredAt).sort();
  const dateSet = new Set(dateList);

  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <Flex
            alignItems="center"
            gap={2}
          >
            <MyH1>Commandes</MyH1>
            <InfoModal>
              <Flex
                direction="column"
                gap={2}
              >
                <Box>
                  Une commande est définie par un client, une date de livraison, une liste de produits et une note.
                </Box>
                <Box>Les commandes sont classées par date de livraison</Box>
                <Box>Cliquez sur une commande pour ouvrir le détail.</Box>
                <Box>Cliquez sur IMPRIMER pour enregistrer la commande en pdf.</Box>
                <Box>
                  Sélectionnez plusieurs commandes pour connaître le total des produits à préparer pour ces commandes.
                </Box>
                <Box>Cliquez sur PASSER EN BL pour transformer les commandes sélectionnées en bons de livraison</Box>
              </Flex>
            </InfoModal>
          </Flex>
          <Button
            colorScheme="twitter"
            onClick={() => navigate('create')}
          >
            Nouveau
          </Button>
        </MyHeader>
        <MyScrollList>
          {orders.length === 0 && (
            <MyScrollList.Empty onClick={() => navigate('create')}>Ajouter une nouvelle commande</MyScrollList.Empty>
          )}
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
  const { getCustomer } = useData();
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
            const customer = getCustomer(delivery.customer as string);
            return (
              <ListItem
                isSelected={selected?.id === delivery.id}
                key={delivery.id}
                onClick={() => (delivery.id === id ? navigate('') : navigate(delivery.id))}
                checkable={!delivery.invoice}
                checked={toInvoice[delivery.id] || false}
                onCheck={() => {
                  setToInvoice((i: { [key: string]: boolean }) => ({
                    ...i,
                    [delivery.id]: !i[delivery.id],
                  }));
                  navigate('');
                }}
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
