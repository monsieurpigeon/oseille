import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Invoice, InvoiceInfoInput, deleteInvoice, exportDocument, store, updateInvoice } from '../../backend';
import { DeleteButton, EditButton } from '../../component/buttons';
import { useConfirm } from '../../component/modal/confirm-dialog/ConfirmContext';
import { EditDialog } from '../../component/modal/edit-dialog/EditDialog';
import { DeliveryDescriptionLine } from '../../component/shared/Delivery';
import { DeliveryDescription } from '../../component/table/DeliveryDescription';
import { InvoiceTotals } from '../../component/table/InvoiceTotals';
import { MyH1 } from '../../component/typography/MyFont';
import { dateFormatter } from '../../utils/formatter';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';
import { invoiceSchema } from '../delivery/Deliveries';
import { InvoiceFields } from './InvoiceFields';

export const InvoiceDetail = ({ selected }: { selected: Invoice }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { farm } = useFarmParameters();

  const { control, register, handleSubmit, reset } = useForm<InvoiceInfoInput>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: { notes: selected.notes || '', createdAt: selected.createdAt },
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    reset({ notes: selected.notes || '', createdAt: selected.createdAt });
  }, [selected]);

  const onSubmit = (e: InvoiceInfoInput) => {
    updateInvoice({ ...selected, ...e }).then(handleClose);
  };

  const isDeletable = farm && Number(selected.documentId.split('-')[2]) === farm.invoiceId - 1;

  const { confirm } = useConfirm();
  const handleDeleteInvoice = async () => {
    if (
      await confirm({
        title: 'Supprimer la facture',
        message: 'Vous ne pourrez pas la récupérer',
      })
    ) {
      deleteInvoice(selected);
    }
  };

  return (
    <>
      <div className="catalog-header">
        <MyH1>Détail</MyH1>
        <Box>
          <DeleteButton
            onClick={handleDeleteInvoice}
            disabled={!isDeletable}
          />
          <EditButton
            onClick={onOpen}
            ml={3}
          />
          <EditDialog
            isOpen={isOpen}
            cancelRef={cancelRef}
            title="Modifier la livraison"
            onClose={handleClose}
            onSubmit={handleSubmit(onSubmit)}
            fields={
              <InvoiceFields
                control={control}
                register={register}
              />
            }
            footer={
              <>
                <Button
                  ref={cancelRef}
                  onClick={handleClose}
                >
                  Annuler
                </Button>
                <Button
                  colorScheme="twitter"
                  type="submit"
                  ml={3}
                >
                  Enregistrer
                </Button>
              </>
            }
          />
          <Button
            colorScheme="twitter"
            onClick={() => exportDocument({ payload: selected, type: 'Invoice' })}
            ml={3}
          >
            Exporter
          </Button>
        </Box>
      </div>

      <div>
        <Flex
          gap={5}
          fontWeight="bold"
        >
          <div>{selected.customer.name}</div>
          <div>{dateFormatter(selected.createdAt)}</div>
          <div>{selected.documentId}</div>
        </Flex>
        <div>Notes: {selected.notes}</div>
        {selected.deliveries.map((id) => {
          const delivery = store.deliveries.find((delivery) => delivery.id === id);
          if (!delivery) return null;

          return (
            <div
              style={{ marginTop: '15px' }}
              key={id}
            >
              <DeliveryDescriptionLine delivery={delivery} />
              <DeliveryDescription delivery={delivery} />
            </div>
          );
        })}
        <Flex
          justifyContent="flex-end"
          mt={5}
        >
          <InvoiceTotals invoice={selected} />
        </Flex>
      </div>
    </>
  );
};
