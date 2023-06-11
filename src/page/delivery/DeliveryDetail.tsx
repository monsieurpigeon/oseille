import { Box } from '@chakra-ui/react';
import { Delivery, store } from '../../backend';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { DeliveryDescriptionLine } from '../../component/shared/Delivery';
import { DeliveryDescription } from '../../component/table/DeliveryDescription';
import { MyH1 } from '../../component/typography/MyFont';
import { DeleteDeliveryAction } from './actions/DeleteDeliveryAction';
import { EditDeliveryAction } from './actions/EditDeliveryAction';
import { ExportDeliveryAction } from './actions/ExportDeliveryAction';

export const DeliveryDetail = ({ selected }: { selected: Delivery }) => {
  return (
    <>
      <MyHeader>
        <MyH1>Détail</MyH1>
        <Box>
          <DeleteDeliveryAction delivery={selected} />
          <EditDeliveryAction delivery={selected} />
          <ExportDeliveryAction delivery={selected} />
        </Box>
      </MyHeader>

      <div>
        <DeliveryDescriptionLine delivery={selected} />
        <div>Notes: {selected.notes}</div>
        {!!selected.invoiceId && (
          <div>{store.invoices.find((invoice) => invoice.id === selected.invoiceId)?.documentId}</div>
        )}
        <DeliveryDescription delivery={selected} />
      </div>
    </>
  );
};
