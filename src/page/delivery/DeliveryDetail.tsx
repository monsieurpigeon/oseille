import { Box, Link } from '@chakra-ui/react';
import { Outlet, Link as RouterLink, useLoaderData, useNavigate } from 'react-router-dom';
import { Customer, Delivery, Invoice } from '../../backend';
import { MyIcon } from '../../component/MyIcon';
import { DetailButton, EditButton } from '../../component/buttons';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { DeliveryDescriptionLine } from '../../component/shared/Delivery';
import { DeliveryDescription } from '../../component/table/DeliveryDescription';
import { DeliveryDeleteButton } from './button/DeliveryDeleteButton';
import { DeliveryPrintButton } from './button/DeliveryPrintButton';

export const DeliveryDetail = () => {
  const navigate = useNavigate();

  const {
    deliveries: [selected],
    customers: [currentCustomer],
    invoices: [invoice],
  } = useLoaderData() as { deliveries: Delivery[]; customers: Customer[]; invoices: Invoice[] };

  if (!currentCustomer) return null;
  const isEditable = !selected?.invoice;

  if (!selected) return null;
  return (
    <>
      <MyHeader>
        <DetailButton />
        <Box>
          <DeliveryDeleteButton delivery={selected} />
          <EditButton
            onClick={() => navigate(`edit`)}
            disabled={!isEditable}
            ml={3}
          />
          <Outlet />
          <DeliveryPrintButton delivery={selected} />
        </Box>
      </MyHeader>

      <div>
        <DeliveryDescriptionLine
          delivery={selected}
          customer={currentCustomer}
        />
        <div>Notes: {selected.notes}</div>
        {!!selected.invoice && (
          <Link
            to={`/invoicing/invoice/${selected.invoice}`}
            as={RouterLink}
          >
            <MyIcon name="link" /> {invoice.documentId}
          </Link>
        )}
        <DeliveryDescription delivery={selected} />
      </div>
    </>
  );
};
