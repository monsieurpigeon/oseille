import { Box, Button, CloseButton, Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { usePostHog } from 'posthog-js/react';
import { useMemo } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Delivery, Product, confirmOrder, exportOrders } from '../../backend';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { useConfirm } from '../../component/modal/confirm-modal/ConfirmContext';
import { useSideKick } from '../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../component/modules/sidekick/enums';
import { useData } from '../../context/DataContext';
import { selectedOrdersAtom } from './useSelectOrders';

export function OrderAll() {
  const { getDelivery } = useData();

  const { deliveries } = useRouteLoaderData('orders') as { deliveries: Delivery[] };
  const length = useMemo(
    () => deliveries.filter((delivery) => !delivery.invoice).filter((delivery) => delivery.isOrder).length,
    [deliveries],
  );

  const posthog = usePostHog();
  const { say } = useSideKick();

  const [toInvoice, setToInvoice] = useAtom(selectedOrdersAtom);
  const deliveryMap = useMemo(() => {
    return deliveries.reduce((memo, delivery) => {
      memo[delivery.id] = delivery;
      return memo;
    }, {} as { [key: string]: Delivery });
  }, [toInvoice]);

  const selectedOrders = Object.entries(toInvoice)
    .map(([key, value]) => {
      if (!value) return undefined;
      return deliveryMap[key];
    })
    .filter((el) => el && !el.invoice) as Delivery[];

  const selectedLength = selectedOrders.length;

  const { confirm } = useConfirm();

  const handleClick = async () => {
    if (
      await confirm({
        title: `Valider ${selectedLength > 1 ? `les ${selectedLength}` : 'la'} commande${
          selectedLength > 1 ? 's' : ''
        } en BL`,
        message: 'Vous pourrez toujours les retrouver dans la liste des bons de livraison',
      })
    ) {
      posthog?.capture('order_confirm');
      await Promise.all(selectedOrders.map((order) => confirmOrder(order.id)));

      say({
        sentence: `${
          selectedLength > 1
            ? `Les ${selectedLength} commandes ont bien été validées en BL`
            : 'La commande a bien été validée en BL'
        }`,
        autoShutUp: true,
        feeling: SideKickFeeling.GOOD,
      });
      setToInvoice({});
      navigate('');
    }
  };

  const navigate = useNavigate();

  const productLines = useMemo(() => {
    const aggregatedLines = selectedOrders
      .flatMap((order) => order.lines)
      .reduce((memo, line) => {
        if (!memo[line.product.id]) memo[line.product.id] = { product: line.product, quantity: 0 };
        memo[line.product.id].quantity += line.quantity;
        return memo;
      }, {} as { [key: string]: { product: Product; quantity: number } });

    return Object.values(aggregatedLines).sort((a, b) => a.product.name.localeCompare(b.product.name));
  }, [selectedOrders]);

  const onPrint = () => {
    exportOrders(selectedOrders);
  };

  return (
    <>
      <MyHeader>
        <Box>
          {!!selectedLength && (
            <Flex
              alignItems="center"
              gap={2}
            >
              <CloseButton onClick={() => setToInvoice({})} />
              <Button onClick={handleClick}>Passer en BL</Button>
              <Button
                colorScheme="twitter"
                onClick={onPrint}
              >
                Imprimer
              </Button>
            </Flex>
          )}
        </Box>
        <Box>{`${length} commande${length > 1 ? 's' : ''} dont ${selectedLength} sélectionnée${
          selectedLength > 1 ? 's' : ''
        }`}</Box>
      </MyHeader>
      <Flex
        direction="column"
        gap={2}
      ></Flex>
      {selectedLength > 0 && (
        <TableContainer>
          <Table size="lg">
            <Thead>
              <Tr>
                <Th>Produit</Th>
                <Th>Quantité totale</Th>
              </Tr>
            </Thead>
            <Tbody>
              {productLines.map((line) => (
                <Tr
                  key={line.product.id}
                  onClick={() => navigate(`/product/${line.product.id}`)}
                >
                  <Th>{line.product.name}</Th>
                  <Th>
                    {line.quantity} {line.product.unit}
                  </Th>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
