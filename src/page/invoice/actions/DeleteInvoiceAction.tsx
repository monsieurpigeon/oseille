import { Invoice, deleteInvoice } from '../../../backend';
import { DeleteButton } from '../../../component/buttons';
import { useConfirm } from '../../../component/modal/confirm-dialog/ConfirmContext';
import { useFarmParameters } from '../../../utils/hooks/useFarmParameters';

interface DeleteInvoiceActionProps {
  invoice: Invoice;
}

export function DeleteInvoiceAction({ invoice }: DeleteInvoiceActionProps) {
  const { confirm } = useConfirm();
  const { farm } = useFarmParameters();

  const isDeletable = farm && Number(invoice.documentId.split('-')[2]) === farm.invoiceId - 1;

  const handleDeleteInvoice = async () => {
    if (
      await confirm({
        title: 'Supprimer la facture',
        message: 'Vous ne pourrez pas la récupérer',
      })
    ) {
      deleteInvoice(invoice);
    }
  };

  return (
    <DeleteButton
      onClick={handleDeleteInvoice}
      disabled={!isDeletable}
    />
  );
}
