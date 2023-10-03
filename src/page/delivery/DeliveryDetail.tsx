import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { DetailButton, EditButton } from '../../component/buttons';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { DeliveryDescriptionLine } from '../../component/shared/Delivery';
import { DeliveryDescription } from '../../component/table/DeliveryDescription';
import { DeliveryDeleteButton } from './button/DeliveryDeleteButton';
import { DeliveryExportButton } from './button/DeliveryExportButton';

export const DeliveryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const snap = useSnapshot(store);

  const selected = useMemo(() => (id ? store.deliveries.find((el) => el.id === id) : undefined), [id, snap]);
  const currentCustomer = store.customers.find((customer) => customer.id === selected?.customerId);

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
            onClick={() => navigate(`/delivery/${selected.id}/edit`)}
            disabled={!isEditable}
            ml={3}
          />
          <Outlet />
          <DeliveryExportButton delivery={selected} />
        </Box>
      </MyHeader>

      <div>
        <DeliveryDescriptionLine delivery={{ ...selected, customer: currentCustomer }} />
        <div>Notes: {selected.notes}</div>
        {!!selected.invoiceId && (
          <div>{store.invoices.find((invoice) => invoice.id === selected.invoiceId)?.documentId}</div>
        )}
        <DeliveryDescription delivery={selected} />
      </div>
    </>
  );
};
