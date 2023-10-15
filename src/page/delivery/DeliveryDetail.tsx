import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { DetailButton, EditButton } from '../../component/buttons';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { DeliveryDescriptionLine } from '../../component/shared/Delivery';
import { DeliveryDescription } from '../../component/table/DeliveryDescription';
import { useData } from '../../utils/DataContext';
import { DeliveryDeleteButton } from './button/DeliveryDeleteButton';
import { DeliveryPrintButton } from './button/DeliveryPrintButton';

export const DeliveryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const snap = useSnapshot(store);
  const { getCustomer } = useData();

  const selected = useMemo(() => (id ? store.deliveries.find((el) => el.id === id) : undefined), [id, snap]);
  const currentCustomer = getCustomer(selected?.customerId);

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
        {!!selected.invoiceId && (
          <div>{store.invoices.find((invoice) => invoice.id === selected.invoiceId)?.documentId}</div>
        )}
        <DeliveryDescription delivery={selected} />
      </div>
    </>
  );
};
