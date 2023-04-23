import { Button } from '@chakra-ui/react';
import { Delivery, exportDocument, store } from '../../backend';
import { DeliveryDescriptionLine } from '../../component/shared/Delivery';
import { DeliveryDescription } from '../../component/table/DeliveryDescription';
import { MyH1 } from '../../component/typography/MyFont';

export const DeliveryDetail = ({ selected }: { selected: Delivery }) => {
  return (
    <>
      <div className="catalog-header">
        <MyH1>Détail</MyH1>
        <Button
          colorScheme="twitter"
          onClick={() => exportDocument({ payload: selected, type: 'Delivery' })}
          ml={3}
        >
          Exporter
        </Button>
      </div>

      <div>
        <DeliveryDescriptionLine delivery={selected} />
        {!!selected.invoiceId && (
          <div>{store.invoices.find((invoice) => invoice.id === selected.invoiceId)?.documentId}</div>
        )}
        <DeliveryDescription delivery={selected} />
      </div>
    </>
  );
};
