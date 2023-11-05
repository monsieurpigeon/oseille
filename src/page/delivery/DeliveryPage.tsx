import { Box, Button, Flex } from '@chakra-ui/react';
import { addDays } from 'date-fns';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useState } from 'react';
import { Outlet, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Customer, Delivery } from '../../backend';
import { MyIcon } from '../../component/MyIcon';
import { ListItem } from '../../component/card/ListItem';
import { ListItemGroup } from '../../component/card/ListItemGroup';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { InfoModal } from '../../component/modal/InfoModal';
import { MyH1 } from '../../component/typography/MyFont';
import { dateFormatter } from '../../utils/formatter';
import { InvoiceCreateModal } from '../invoice/modal/InvoiceCreateModal';

export function DeliveryPage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('delivery_page_viewed');
  }, []);
  const { customers, deliveries } = useLoaderData() as {
    customers: Customer[];
    deliveries: Delivery[];
  };

  const navigate = useNavigate();

  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <Flex
            alignItems="center"
            gap={2}
          >
            <MyH1>Livraisons</MyH1>
            <InfoModal>
              <Flex
                direction="column"
                gap={2}
              >
                <Box>
                  Une livraison est définie par un client, une date de livraison, une liste de produits et une note.
                </Box>
                <Box>Les livraisons sont classées par client.</Box>
                <Box>Cliquez sur une livraison pour ouvrir le détail.</Box>
                <Box>Cliquez sur IMPRIMER pour enregistrer la livraison en pdf.</Box>
                <Box>Sélectionnez plusieurs livraisons d'un client pour pouvoir les facturer en une seule fois.</Box>
                <Box>
                  Les livraisons facturées de plus de 15 jours disparaissent de cet écran mais sont toujours présentes
                  sur le détail client.
                </Box>
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
          {deliveries.length === 0 && (
            <MyScrollList.Empty onClick={() => navigate('create')}>Ajouter ma première livraison</MyScrollList.Empty>
          )}
          {customers.map((customer) => (
            <DeliveryCustomer
              key={customer.id}
              customer={customer}
              deliveries={deliveries.filter((delivery) => delivery.customer === customer.id)}
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

function DeliveryCustomer({ customer, deliveries }: { customer: Customer; deliveries: Delivery[] }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [toInvoice, setToInvoice] = useState<{ [key: string]: boolean }>({});
  const customerDeliveries = deliveries.filter((delivery) => {
    const date = new Date(delivery.deliveredAt);
    const today = addDays(new Date(), -2 * 7);
    return !delivery.invoice || date > today;
  });

  if (customerDeliveries.length === 0) {
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
      {customerDeliveries.map((delivery) => (
        <ListItem
          isSelected={id === delivery.id}
          key={delivery.id}
          onClick={() => navigate(delivery.id === id ? '' : delivery.id)}
          checkable={!delivery.invoice}
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
