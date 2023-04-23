import { Button, Flex } from '@chakra-ui/react';
import { Invoice, exportDocument, store } from '../../backend';
import { DeliveryDescriptionLine } from '../../component/shared/Delivery';
import { DeliveryDescription } from '../../component/table/DeliveryDescription';
import { InvoiceTotals } from '../../component/table/InvoiceTotals';
import { MyH1 } from '../../component/typography/MyFont';
import { dateFormatter } from '../../utils/formatter';

export const InvoiceDetail = ({ selected }: { selected: Invoice }) => {
  return (
    <>
      <div className="catalog-header">
        <MyH1>Détail</MyH1>
        <Button
          colorScheme="twitter"
          onClick={() => exportDocument({ payload: selected, type: 'Invoice' })}
          ml={3}
        >
          Exporter
        </Button>
      </div>

      <div>
        <Flex
          gap={5}
          fontWeight="bold"
        >
          <div>{selected.customer.name}</div>
          <div>{dateFormatter(selected.createdAt)}</div>
          <div>{selected.documentId}</div>
        </Flex>

        {selected.deliveries.map((id) => {
          const delivery = store.deliveries.find((delivery) => delivery.id === id);
          if (!delivery) return null;

          return (
            <div
              style={{ marginTop: '15px' }}
              key={id}
            >
              <DeliveryDescriptionLine delivery={delivery} />
              <DeliveryDescription delivery={delivery} />
            </div>
          );
        })}
        <Flex
          justifyContent="flex-end"
          mt={5}
        >
          <InvoiceTotals invoice={selected} />
        </Flex>
      </div>
    </>
  );
};
