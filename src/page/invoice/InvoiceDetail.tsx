import { Button, Flex, Spacer } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Invoice, exportDocument, store } from '../../backend';
import { DeliveryDescription } from '../../component/table/DeliveryDescription';
import { MyH1 } from '../../component/typography/MyFont';
import { getDeliveryPrice, getInvoicePrice } from '../../utils/aggregations';
import { dateFormatter, priceFormatter } from '../../utils/formatter';

export const InvoiceDetail = ({ selected }: { selected: Invoice }) => {
  const price = useMemo(() => getInvoicePrice(selected), [selected]);

  return (
    <>
      <div className="catalog-header">
        <MyH1>Détail</MyH1>
        <Button
          colorScheme="twitter"
          onClick={() => {
            console.log(JSON.stringify(selected, null, 4));
            exportDocument({ payload: selected, type: 'Invoice' });
          }}
          ml={3}
        >
          Exporter
        </Button>
      </div>

      <div>
        <Flex>
          <div>{selected.documentId}</div>
          <Spacer />
          <div>{dateFormatter(selected.createdAt)}</div>
        </Flex>
        <Flex>
          <div>{selected.customer.name}</div>
          <Spacer />
          <div className="bold">{priceFormatter(price)}</div>
        </Flex>
        {selected.deliveries.map((id) => {
          const delivery = store.deliveries.find((delivery) => delivery.id === id);
          if (!delivery) return null;

          return (
            <div style={{ marginTop: '15px' }}>
              <div>
                {delivery.documentId} - {dateFormatter(delivery.deliveredAt)} -{' '}
                {priceFormatter(getDeliveryPrice(delivery))}
              </div>
              <DeliveryDescription delivery={delivery} />
            </div>
          );
        })}
      </div>
    </>
  );
};
