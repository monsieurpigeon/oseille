import { Box, Button, Flex } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { Outlet, useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Customer } from '../../backend';
import { ListItem } from '../../component/card/ListItem';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { InfoModal } from '../../component/modal/InfoModal';
import { MyH1 } from '../../component/typography/MyFont';

export function CustomerPage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('customer_page_viewed');
  }, []);

  const customers = useLoaderData() as Customer[];
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <Flex
            alignItems="center"
            gap={2}
          >
            <MyH1>Clients</MyH1>
            <InfoModal>
              <Flex
                direction="column"
                gap={2}
              >
                <Box>Un client est défini par un nom, une adresse, des coordonnées et une note.</Box>
                <Box>Cliquez sur NOUVEAU pour créer un nouveau client.</Box>
                <Box>
                  Cliquez sur un client pour ouvrir une page de détail. Tous les bons de livraison et factures du client
                  y sont visibles.
                </Box>
                <Box>Cliquez sur MODIFIER pour mettre à jour un client.</Box>
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
        <MyScrollList empty={{ title: 'Ajouter mon premier client', onClick: () => navigate('create') }}>
          {customers.map((entity) => (
            <ListItem
              key={entity.id}
              isSelected={id === entity.id}
              onClick={() => navigate(entity.id === id ? '' : `${entity.id}${location.hash}`)}
            >
              {entity.name}
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
