import { Box, Flex, Grid } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { InfoModal } from '../../component/modal/InfoModal';
import { MyH1 } from '../../component/typography/MyFont';
import { PriceTable } from './PriceTable';

export function PricePage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('price_page_viewed');
  }, []);
  const { farm } = useRouteLoaderData('farm') as any;

  return (
    <Grid
      position="relative"
      p="0 20px"
      gridTemplateColumns="1fr"
      gridTemplateRows="auto 600px"
    >
      <Flex
        alignItems="center"
        gap={2}
      >
        <MyH1>Tarifs</MyH1>
        <InfoModal>
          <Flex
            direction="column"
            gap={2}
          >
            <Box>Un tarif est défini entre un produit et un client.</Box>
            <Box>
              Il est possible de définir un tarif PAR DÉFAUT qui sera utilisé pour tous les clients si aucun autre tarif
              n'est enregistré.
            </Box>
            <Box>
              Seuls les produits avec un tarif apparaîtront dans la liste de produits d'un client pendant la création
              des documents.
            </Box>
            {farm?.isTVA === 'oui' && <Box>Le tarif TTC est calculé en direct par Max 😃</Box>}
          </Flex>
        </InfoModal>
      </Flex>
      <PriceTable />
    </Grid>
  );
}
