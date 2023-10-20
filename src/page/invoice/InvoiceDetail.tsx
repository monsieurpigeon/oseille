import { Badge, Box, Button, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { isInvoicePaid } from '../../backend';
import { DetailButton, EditButton } from '../../component/buttons';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { DeliveryDescriptionLine } from '../../component/shared/Delivery';
import { DeliveryDescription } from '../../component/table/DeliveryDescription';
import { InvoiceTotals } from '../../component/table/InvoiceTotals';
import { useData } from '../../context/DataContext';
import { dateFormatter } from '../../utils/formatter';
import { InvoiceDeleteButton } from './button/InvoiceDeleteButton';
import { InvoicePrintButton } from './button/InvoicePrintButton';

export const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCustomer, getInvoice, invoices } = useData();
  const selected = useMemo(() => (id ? getInvoice(id) : undefined), [id, invoices]);
  const currentCustomer = useMemo(() => getCustomer(selected?.customerId || ''), [selected?.customerId]);
  if (!selected) return null;
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
        fontWeight="bold"
        alignItems="center"
        gap={2}
      >
        {isInvoicePaid(selected) && '✅'}
        {selected.isPaid && !selected.payments && (
          <Badge
            colorScheme="yellow"
            variant="solid"
          >
            Paiement incomplet
          </Badge>
        )}
        <Link to={`../../customer/${currentCustomer.id}`}>{currentCustomer.name}</Link>
      </Flex>
      <Flex
        fontWeight="bold"
        alignItems="center"
        gap={2}
      >
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
        {selected.deliveries.map((delivery) => {
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
