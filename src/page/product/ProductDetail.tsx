import { Box } from '@chakra-ui/react';
import { Outlet, useLoaderData, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Product } from '../../backend';
import { DetailButton, EditButton } from '../../component/buttons';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { TVAFormatter } from '../../utils/formatter';

export const ProductDetail = () => {
  const navigate = useNavigate();
  const { isTVA } = useRouteLoaderData('farm') as any;
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
