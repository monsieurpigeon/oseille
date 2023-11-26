import { Box, Button, Flex } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { Outlet, useLoaderData, useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';
import { Farm, Product } from '../../backend';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { InfoModal } from '../../component/modal/InfoModal';
import { MyH1 } from '../../component/typography/MyFont';
import { ProductListElement } from './modal/ProductListElement';

export function ProductPage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('product_page_viewed');
  }, []);
  const navigate = useNavigate();

  const { id } = useParams();
  const { farm } = useRouteLoaderData('farm') as { farm: Farm };
  const products = useLoaderData() as Product[];

  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <Flex
            alignItems="center"
            gap={2}
          >
            <MyH1>Produits</MyH1>
            <InfoModal>
              <Flex
                direction="column"
                gap={2}
              >
                <Box>Un produit est défini par un nom{farm?.isTVA === 'oui' && ', un taux de TVA'} et une unité.</Box>
                <Box>Cliquez sur NOUVEAU pour créer un nouveau produit.</Box>
                <Box>Cliquez sur un produit pour ouvrir une page de détail.</Box>
                <Box>Cliquez sur MODIFIER pour mettre à jour un produit.</Box>
              </Flex>
            </InfoModal>
          </Flex>
          <Button
            colorScheme="twitter"
            onClick={() => navigate('create')}
          >
            Nouveau
          </Button>
        </MyHeader>
        <MyScrollList empty={{ title: 'Ajouter mon premier produit', onClick: () => navigate('create') }}>
          {products.map((entity) => (
            <ProductListElement
              key={entity.id}
              entity={entity}
              selected={id === entity.id}
            />
          ))}
        </MyScrollList>
      </MySide>
      <MySide>
        <Outlet />
      </MySide>
    </MyPage>
  );
}
