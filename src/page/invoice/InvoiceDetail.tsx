import { Box, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { store } from '../../backend';
import { DetailButton, EditButton } from '../../component/buttons';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { DeliveryDescriptionLine } from '../../component/shared/Delivery';
import { DeliveryDescription } from '../../component/table/DeliveryDescription';
import { InvoiceTotals } from '../../component/table/InvoiceTotals';
import { dateFormatter } from '../../utils/formatter';
import { InvoiceDeleteButton } from './button/InvoiceDeleteButton';
import { InvoiceExportPdfButton } from './button/InvoiceExportPdfButton';

export const InvoiceDetail = () => {
  const { id } = useParams();
  const selected = useMemo(() => (id ? store.invoices.find((el) => el.id === id) : undefined), [id, store]);
  if (!selected) return null;

  const navigate = useNavigate();

  const currentCustomer = useMemo(
    () => store.customers.find((customer) => customer.id === selected.customerId),
    [store, selected.customerId],
  );

  if (!currentCustomer) return null;

  return (
    <>
      <MyHeader>
        <DetailButton />
        <Box>
          <InvoiceDeleteButton invoice={selected} />
          <InvoiceExportPdfButton invoice={selected} />
          <EditButton
            onClick={() => navigate(`/invoice/${selected.id}/edit`)}
            ml={3}
          />
          <Outlet />
        </Box>
      </MyHeader>

      <Flex
        gap={5}
        fontWeight="bold"
      >
        <div>
          {selected.isPaid && '✅'} <Link to={`/customer/${currentCustomer.id}`}>{currentCustomer.name}</Link>
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
              <DeliveryDescriptionLine delivery={{ ...delivery, customer: currentCustomer }} />
              <DeliveryDescription delivery={delivery} />
            </div>
          );
        })}
      </MyScrollList>
    </>
  );
};
