import { Button, Flex } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { atomWithHash } from 'jotai-location';
import { useLoaderData } from 'react-router-dom';
import { Delivery, Invoice } from '../../../backend';
import { SalesGraph } from '../../../component/modules/graph/SalesGraph';
import { DeliveryCard, InvoiceCard } from './DocumentCard';

const tabAtom = atomWithHash('tab', 0);

export function CustomerDocuments() {
  const { invoices, deliveries } = useLoaderData() as { invoices: Invoice[]; deliveries: Delivery[] };

  const [tab, setTab] = useAtom(tabAtom);

  return (
    <Flex
      grow={1}
      height={0}
      direction="column"
      gap={2}
    >
      <Flex gap={2}>
        <Button
          variant={tab === 0 ? 'solid' : 'outlined'}
          onClick={() => setTab(0)}
        >
          Bons de Livraison
        </Button>
        <Button
          variant={tab === 1 ? 'solid' : 'outlined'}
          onClick={() => setTab(1)}
        >
          Factures
        </Button>
        <Button
          variant={tab === 2 ? 'solid' : 'outlined'}
          onClick={() => setTab(2)}
        >
          Ventes
        </Button>
      </Flex>
      <Flex
        grow={1}
        direction="column"
      >
        {tab === 0 && (
          <Flex
            grow={1}
            height={0}
          >
            <Flex
              direction="column"
              gap={2}
              grow={1}
            >
              {deliveries.length === 0 && <div>Aucun bon de livraison</div>}
              {deliveries.map((delivery) => {
                return (
                  <DeliveryCard
                    key={delivery.id}
                    delivery={delivery}
                  />
                );
              })}
            </Flex>
          </Flex>
        )}
        {tab === 1 && (
          <Flex
            grow={1}
            height={0}
          >
            <Flex
              direction="column"
              gap={2}
              grow={1}
            >
              {invoices.length === 0 && <div>Aucune facture</div>}
              {invoices.map((invoice) => (
                <InvoiceCard
                  key={invoice.id}
                  invoice={invoice}
                />
              ))}
            </Flex>
          </Flex>
        )}
        {tab === 2 && (
          <Flex
            grow={1}
            height={0}
          >
            <SalesGraph deliveries={deliveries} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
