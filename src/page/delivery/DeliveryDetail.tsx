import { Box, Flex, Link } from '@chakra-ui/react';
import { Outlet, Link as RouterLink, useLoaderData, useNavigate } from 'react-router-dom';
import { Customer, Delivery, Invoice } from '../../backend';
import { DetailButton, EditButton } from '../../component/buttons';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyIcon } from '../../component/MyIcon';
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
            isDisabled={!isEditable}
            ml={3}
          />
          <Outlet />
          <DeliveryPrintButton delivery={selected} />
        </Box>
      </MyHeader>

      <Flex
        direction="column"
        height="100%"
      >
        <DeliveryDescriptionLine
          delivery={selected}
          customer={currentCustomer}
        />
        <Box>Notes: {selected.notes}</Box>
        {!!selected.invoice && (
          <Link
            to={`/invoicing/invoice/${selected.invoice}`}
            as={RouterLink}
          >
            <MyIcon name="link" /> {invoice.documentId}
          </Link>
        )}

        <Flex
          height={0}
          grow={1}
        >
          <DeliveryDescription delivery={selected} />
        </Flex>
      </Flex>
    </>
  );
};
