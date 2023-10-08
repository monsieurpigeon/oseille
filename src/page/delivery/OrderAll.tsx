import { Box, Button, CloseButton, Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { usePostHog } from 'posthog-js/react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { Delivery, Product, confirmOrder, store } from '../../backend';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { useConfirm } from '../../component/modal/confirm-modal/ConfirmContext';
import { useSideKick } from '../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../component/modules/sidekick/enums';
import { selectedOrdersAtom } from './useSelectOrders';

export function OrderAll() {
  const snap = useSnapshot(store);
  const length = useMemo(
    () => store.deliveries.filter((delivery) => !delivery.invoiceId).filter((delivery) => delivery.isOrder).length,
    [snap],
  );
  const posthog = usePostHog();
  const { say } = useSideKick();

  const [toInvoice, setToInvoice] = useAtom(selectedOrdersAtom);
  const selectedOrders = Object.entries(toInvoice)
    .map(([key, value]) => {
      if (!value) return undefined;
      return store.deliveries.find((delivery) => delivery.id === key);
    })
    .filter((el) => el && !el.invoiceId) as Delivery[];

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
      await Promise.all(selectedOrders.map((order) => confirmOrder(order)));

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
