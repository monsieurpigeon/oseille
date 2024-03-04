import { zodResolver } from '@hookform/resolvers/zod';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { Invoice, InvoicePaymentInput, PaymentMode, updateInvoice } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { useConfirm } from '../../../component/modal/confirm-modal/ConfirmContext';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { getInvoiceTotal } from '../../../utils/aggregations';
import { Country } from '../../../utils/defaults';
import { PaymentFields } from './PaymentFields';

export const paymentSchema = z.object({
  paidAt: z.string(),
  paymentMode: z.nativeEnum(PaymentMode),
  amount: z.number().min(0),
  reference: z.string(),
  notes: z.string(),
});

export function PaymentModal() {
  const {
    invoices: [invoice],
  } = useRouteLoaderData('invoice') as { invoices: Invoice[] };
  const { country } = useRouteLoaderData('farm') as { country: Country };

  const [amount, setAmount] = useState(0);
  useEffect(() => {
    getInvoiceTotal(invoice, false, country.value).then(setAmount);
  }, [invoice]);

  if (!invoice) return null;

  const posthog = usePostHog();
  const { say } = useSideKick();
  const navigate = useNavigate();
  const handleClose = () => navigate('..');
  const { confirm } = useConfirm();

  const emptyPayment = {
    paymentMode: undefined,
    paidAt: new Date().toISOString().split('T')[0],
    amount,
    reference: '',
    notes: '',
  };

  const { control, register, handleSubmit, reset } = useForm<InvoicePaymentInput>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { ...emptyPayment, ...invoice?.payments?.[0] },
  });

  useEffect(() => reset({ ...emptyPayment, amount, ...invoice?.payments?.[0] }), [amount]);

  const onRemove = async () => {
    if (
      await confirm({
        title: 'Êtes-vous sûr de vouloir supprimer ce paiement ?',
        message: 'Vous ne pourrez pas revenir en arrière',
      })
    ) {
      posthog?.capture('invoice_pay_delete');
      invoice &&
        updateInvoice({ ...invoice, payments: undefined, isPaid: undefined })
          .then(() =>
            say({
              sentence: `Le paiement pour la facture ${invoice.documentId} a bien été supprimé`,
              autoShutUp: true,
              feeling: SideKickFeeling.GOOD,
            }),
          )
          .then(handleClose);
    }
  };
  const onSubmit = (payment: InvoicePaymentInput) => {
    posthog?.capture('invoice_pay');
    invoice &&
      updateInvoice({ ...invoice, payments: [payment] })
        .then(() =>
          say({
            sentence: `Le paiement pour la facture ${invoice.documentId} a bien été enregistré`,
            autoShutUp: true,
            feeling: SideKickFeeling.GOOD,
          }),
        )
        .then(handleClose);
  };

  return (
    <MyModal
      isOpen={true}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      onRemove={(invoice?.payments && invoice.payments.length > 0 && onRemove) || undefined}
      title={invoice?.payments && invoice.payments.length > 0 ? "Edition d'un paiement" : "Ajout d'un paiement"}
    >
      <PaymentFields
        control={control}
        register={register}
      />
    </MyModal>
  );
}
