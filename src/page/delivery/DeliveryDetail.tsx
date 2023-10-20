import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { DetailButton, EditButton } from '../../component/buttons';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { DeliveryDescriptionLine } from '../../component/shared/Delivery';
import { DeliveryDescription } from '../../component/table/DeliveryDescription';
import { useData } from '../../context/DataContext';
import { DeliveryDeleteButton } from './button/DeliveryDeleteButton';
import { DeliveryPrintButton } from './button/DeliveryPrintButton';

export const DeliveryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getCustomer, getDelivery, deliveries, getInvoice } = useData();

  const selected = useMemo(() => (id ? getDelivery(id) : undefined), [id, deliveries]);
  const currentCustomer = getCustomer(selected?.customerId || '');

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
        {!!selected.invoiceId && <div>{getInvoice(selected.invoiceId)?.documentId}</div>}
        <DeliveryDescription delivery={selected} />
      </div>
    </>
  );
};
