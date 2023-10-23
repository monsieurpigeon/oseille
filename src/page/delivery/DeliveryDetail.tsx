import { Box } from '@chakra-ui/react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { Customer, Delivery } from '../../backend';
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
    customerSummaries: [currentCustomer],
  } = useLoaderData() as { deliveries: [Delivery]; customerSummaries: [Customer] };

  if (!currentCustomer) return null;
  const isEditable = !selected?.invoiceId;

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
        <DeliveryDescriptionLine delivery={{ ...selected, customer: currentCustomer }} />
        <div>Notes: {selected.notes}</div>
        {!!selected.invoiceId && <div>{selected.invoiceId}</div>}
        <DeliveryDescription delivery={selected} />
      </div>
    </>
  );
};
