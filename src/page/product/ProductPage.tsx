import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { ListItem } from '../../component/card/ListItem';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { InfoModal } from '../../component/modal/InfoModal';
import { MyH1 } from '../../component/typography/MyFont';
import { useData } from '../../utils/DataContext';
import { DEFAULT_TAX } from '../../utils/defaults';
import { TVAFormatter } from '../../utils/formatter';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';

export function ProductPage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('product_page_viewed');
  }, []);
  const navigate = useNavigate();

  const { id } = useParams();
  const { farm, isTVA } = useFarmParameters();
  const { products, getProduct } = useData();

  const selected = useMemo(() => (id ? getProduct(id) : undefined), [id, products]);

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
            <ListItem
              key={entity.id}
              isSelected={selected?.id === entity.id}
              onClick={() => navigate(entity.id === id ? '' : entity.id)}
            >
              <Flex width="100%">
                <div>{`${entity.name} /${entity.unit}`}</div>
                <Spacer />
                <Text whiteSpace="nowrap">{isTVA && `TVA: ${TVAFormatter(entity.tva || DEFAULT_TAX)}`}</Text>
              </Flex>
            </ListItem>
          ))}
        </MyScrollList>
      </MySide>
      <MySide>
        <Outlet />
      </MySide>
    </MyPage>
  );
}
