import { Box } from '@chakra-ui/react';
import { Outlet, useLoaderData, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Product } from '../../backend';
import { DetailButton, EditButton } from '../../component/buttons';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { Country } from '../../utils/defaults';
import { renderTaxFields } from './modal/ProductListElement';

export const ProductDetail = () => {
  const navigate = useNavigate();
  const { isTVA, country } = useRouteLoaderData('farm') as { isTVA: boolean; country: Country };
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
        {renderTaxFields(isTVA, selected, country.value)}
      </Box>
    </Box>
  );
};
