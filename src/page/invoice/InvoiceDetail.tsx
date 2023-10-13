import { Badge, Box, Button, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { isInvoicePaid, store } from '../../backend';
import { DetailButton, EditButton } from '../../component/buttons';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { DeliveryDescriptionLine } from '../../component/shared/Delivery';
import { DeliveryDescription } from '../../component/table/DeliveryDescription';
import { InvoiceTotals } from '../../component/table/InvoiceTotals';
import { dateFormatter } from '../../utils/formatter';
import { InvoiceDeleteButton } from './button/InvoiceDeleteButton';
import { InvoicePrintButton } from './button/InvoicePrintButton';

export const InvoiceDetail = () => {
  const { id } = useParams();
  const snap = useSnapshot(store);
  const selected = useMemo(() => (id ? store.invoices.find((el) => el.id === id) : undefined), [id, snap]);
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
          <Flex gap={3}>
            <InvoiceDeleteButton invoice={selected} />
            <EditButton onClick={() => navigate('edit')} />
            <Button
              colorScheme="green"
              onClick={() => navigate('pay')}
            >
              Payer
            </Button>
            <InvoicePrintButton invoice={selected} />
          </Flex>

          <Outlet />
        </Box>
      </MyHeader>

      <Flex
        gap={5}
        fontWeight="bold"
      >
        <div>
          {isInvoicePaid(selected) && '✅'}{' '}
          {selected.isPaid && !selected.payments && (
            <Badge
              colorScheme="yellow"
              variant="solid"
            >
              Paiement incomplet
            </Badge>
          )}{' '}
          <Link to={`../../customer/${currentCustomer.id}`}>{currentCustomer.name}</Link>
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
