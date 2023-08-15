import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Invoice, InvoiceInfoInput, updateInvoice } from '../../../backend';
import { EditButton } from '../../../component/buttons';
import { EditDialog } from '../../../component/modal/edit-dialog/EditDialog';
import { invoiceSchema } from '../../delivery/actions/CreateInvoiceAction';
import { InvoiceFields } from '../InvoiceFields';

interface EditInvoiceActionProps {
  invoice: Invoice;
}

export function EditInvoiceAction({ invoice }: EditInvoiceActionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { control, register, handleSubmit, reset } = useForm<InvoiceInfoInput>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: { notes: invoice.notes || '', createdAt: invoice.createdAt, isPaid: invoice.isPaid || false },
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    reset({ notes: invoice.notes || '', createdAt: invoice.createdAt, isPaid: invoice.isPaid || false });
  }, [invoice]);

  const onSubmit = (e: InvoiceInfoInput) => {
    updateInvoice({ ...invoice, ...e }).then(handleClose);
  };

  return (
    <>
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
    </>
  );
}
