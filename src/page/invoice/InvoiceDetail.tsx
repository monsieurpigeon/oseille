import { Badge, Box, Button, Flex, Text } from '@chakra-ui/react';
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { Customer, Delivery, Invoice, isInvoicePaid, paymentModesMap } from '../../backend';
import { DetailButton, EditButton } from '../../component/buttons';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { DeliveryDescriptionLine } from '../../component/shared/Delivery';
import { DeliveryDescription } from '../../component/table/DeliveryDescription';
import { InvoiceTotals } from '../../component/table/InvoiceTotals';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { InvoiceDeleteButton } from './button/InvoiceDeleteButton';
import { InvoicePrintButton } from './button/InvoicePrintButton';

export const InvoiceDetail = () => {
  const navigate = useNavigate();

  const {
    invoices: [selected],
    customers: [currentCustomer],
    deliveries,
  } = useLoaderData() as { invoices: Invoice[]; customers: Customer[]; deliveries: Delivery[] };

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
              Paiement
            </Button>
            <InvoicePrintButton invoice={selected} />
          </Flex>

          <Outlet />
        </Box>
      </MyHeader>
      <Flex gap={10}>
        <Box>
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
        </Box>
        {selected?.payments?.length && (
          <Box
            onClick={() => navigate('pay')}
            className="clickable"
          >
            <Text as="b">Paiement</Text>
            {selected.payments.map((pay) => (
              <>
                <Text>
                  {dateFormatter(pay.paidAt)} {paymentModesMap[pay.paymentMode]} {priceFormatter(pay.amount)}
                </Text>
                <Text as="kbd">{pay.reference}</Text>
                {pay.notes && <Text>Notes: {pay.notes}</Text>}
              </>
            ))}
          </Box>
        )}
      </Flex>

      <Flex
        justifyContent="flex-end"
        mt={5}
      >
        <InvoiceTotals invoice={selected} />
      </Flex>
      <MyScrollList>
        {deliveries.map((delivery) => {
          if (!delivery) return null;

          return (
            <div
              style={{ marginTop: '15px' }}
              key={delivery.id}
            >
              <DeliveryDescriptionLine
                delivery={delivery}
                customer={currentCustomer}
              />
              <DeliveryDescription delivery={delivery} />
            </div>
          );
        })}
      </MyScrollList>
    </>
  );
};
