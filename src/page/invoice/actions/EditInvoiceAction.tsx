import { useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Invoice, InvoiceInfoInput, updateInvoice } from '../../../backend';
import { EditButton } from '../../../component/buttons';
import { MyModal } from '../../../component/modal/MyModal';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { invoiceSchema } from '../../delivery/actions/CreateInvoiceAction';
import { InvoiceFields } from '../InvoiceFields';

interface EditInvoiceActionProps {
  invoice: Invoice;
}

export function EditInvoiceAction({ invoice }: EditInvoiceActionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { say } = useSideKick();
  const cancelRef = useRef<any>();

  const { control, register, handleSubmit, reset, formState } = useForm<InvoiceInfoInput>({
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
    updateInvoice({ ...invoice, ...e })
      .then(() =>
        say({
          sentence: `La facture ${invoice.documentId} a bien été enregistrée`,
          autoShutUp: true,
          feeling: SideKickFeeling.GOOD,
        }),
      )
      .then(handleClose);
  };

  return (
    <>
      <EditButton
        onClick={onOpen}
        ml={3}
      />
      <MyModal
        isOpen={isOpen}
        cancelRef={cancelRef}
        title="Modifier la livraison"
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        disabled={!formState.isDirty}
      >
        <InvoiceFields
          control={control}
          register={register}
        />
      </MyModal>
    </>
  );
}
