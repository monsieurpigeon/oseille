import { Box, Button, Flex } from '@chakra-ui/react';
import { Delivery, exportDocument, store } from '../../backend';
import { DeliveryDescriptionLine } from '../../component/shared/Delivery';
import { DeliveryDescription } from '../../component/table/DeliveryDescription';
import { MyH1 } from '../../component/typography/MyFont';
import { useConfirm } from '../../component/modal/confirm-dialog/ConfirmContext';

export const DeliveryDetail = ({ selected }: { selected: Delivery }) => {
  const { confirm } = useConfirm();
  const isEditable = !selected.invoiceId;

  const deleteDelivery = async () => {
    if (await confirm({ title: 'Supprimer la livraison', message: 'Il ne sera pas possible de revenir en arrière' })) {
      console.log('SUPPRIMER');
    }
  };

  return (
    <>
      <div className="catalog-header">
        <MyH1>Détail</MyH1>
        <Box>
          <Button
            disabled={!isEditable}
            colorScheme="red"
            onClick={() => {
              console.log({ selected });
            }}
          >
            Modifier
          </Button>
          <Button
            colorScheme="twitter"
            onClick={() => exportDocument({ payload: selected, type: 'Delivery' })}
            ml={3}
          >
            Exporter
          </Button>
        </Box>
      </div>

      <div>
        <DeliveryDescriptionLine delivery={selected} />
        {!!selected.invoiceId && (
          <div>{store.invoices.find((invoice) => invoice.id === selected.invoiceId)?.documentId}</div>
        )}
        <DeliveryDescription delivery={selected} />
      </div>
    </>
  );
};
