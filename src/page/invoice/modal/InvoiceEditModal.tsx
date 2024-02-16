import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Invoice, InvoiceInfoInput, updateInvoice } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { invoiceSchema } from './InvoiceCreateModal';
import { InvoiceFields } from './InvoiceFields';

export function InvoiceEditModal() {
  const {
    invoices: [invoice],
  } = useRouteLoaderData('invoice') as { invoices: Invoice[] };

  if (!invoice) return null;

  const navigate = useNavigate();
  const { say } = useSideKick();

  const { register, handleSubmit, reset, formState } = useForm<InvoiceInfoInput>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: { notes: invoice.notes || '', createdAt: invoice.createdAt },
  });

  const handleClose = () => navigate('..');

  useEffect(() => {
    reset({ notes: invoice.notes || '', createdAt: invoice.createdAt });
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
    <MyModal
      isOpen={true}
      title="Modifier la livraison"
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={!formState.isDirty}
    >
      <InvoiceFields register={register} />
    </MyModal>
  );
}
