import { Box } from '@chakra-ui/react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { Product } from '../../backend';
import { DetailButton, EditButton } from '../../component/buttons';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { TVAFormatter } from '../../utils/formatter';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';

export const ProductDetail = () => {
  const navigate = useNavigate();
  const { isTVA } = useFarmParameters();
  const selected = useLoaderData() as Product;

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
