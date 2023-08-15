import { Box, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Invoice, store } from '../../backend';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { DeliveryDescriptionLine } from '../../component/shared/Delivery';
import { DeliveryDescription } from '../../component/table/DeliveryDescription';
import { InvoiceTotals } from '../../component/table/InvoiceTotals';
import { MyH1 } from '../../component/typography/MyFont';
import { dateFormatter } from '../../utils/formatter';
import { DeleteInvoiceAction } from './actions/DeleteInvoiceAction';
import { EditInvoiceAction } from './actions/EditInvoiceAction';
import { ExportInvoiceAction } from './actions/ExportInvoiceAction';

export const InvoiceDetail = ({ selected }: { selected: Invoice }) => {
  const currentCustomer = useMemo(
    () => store.customers.find((customer) => customer.id === selected.customerId),
    [store],
  );

  return (
    <>
      <MyHeader>
        <MyH1>Détail</MyH1>
        <Box>
          <DeleteInvoiceAction invoice={selected} />
          <EditInvoiceAction invoice={selected} />
          <ExportInvoiceAction invoice={selected} />
        </Box>
      </MyHeader>

      <Flex
        gap={5}
        fontWeight="bold"
      >
        <div>
          {selected.isPaid && '✅'} {selected.customer.name}
        </div>
        <div>{dateFormatter(selected.createdAt)}</div>
        <div>{selected.documentId}</div>
      </Flex>
      {currentCustomer?.phone && <div>📞 {currentCustomer.phone}</div>}
      {!!selected.notes && <div>Notes: {selected.notes}</div>}
      <Flex
        justifyContent="flex-end"
        mt={5}
      >
        <InvoiceTotals invoice={selected} />
      </Flex>
      <MyScrollList>
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
      </MyScrollList>
    </>
  );
};
