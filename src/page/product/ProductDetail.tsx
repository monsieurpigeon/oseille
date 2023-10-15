import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';
import { DetailButton, EditButton } from '../../component/buttons';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { useData } from '../../utils/DataContext';
import { TVAFormatter } from '../../utils/formatter';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';

export const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const snap = useSnapshot(store);
  const { isTVA } = useFarmParameters();
  const { getProduct } = useData();
  const selected = useMemo(() => (id ? getProduct(id) : undefined), [id, snap]);

  if (!selected) return <></>;
  return (
    <Box>
      <MyHeader>
        <DetailButton />
        <EditButton onClick={() => navigate('edit')} />
        <Outlet />
      </MyHeader>
      <Box>
        <Box>
          {selected.name} /{selected.unit}
        </Box>
        {isTVA && <Box>TVA: {TVAFormatter(selected.tva)}</Box>}
      </Box>
    </Box>
  );
};
