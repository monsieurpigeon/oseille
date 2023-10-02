import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostHog } from 'posthog-js/react';
import { useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Delivery, InvoiceInfoInput, addInvoice, store } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { InvoiceFields } from '../../invoice/InvoiceFields';

interface InvoiceCreateModalProps {
  toInvoice: { [key: string]: boolean };
  setToInvoice: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
}

export const invoiceSchema = z.object({
  createdAt: z.string(),
  notes: z.string(),
  isPaid: z.boolean(),
});

const defaultValues = { createdAt: new Date().toISOString().split('T')[0], notes: '' };

export function InvoiceCreateModal({ toInvoice, setToInvoice }: InvoiceCreateModalProps) {
  const posthog = usePostHog();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();
  const { say } = useSideKick();

  const { control, register, handleSubmit, reset } = useForm<InvoiceInfoInput>({
    resolver: zodResolver(invoiceSchema),
    defaultValues,
  });
  const onSubmit = (e: InvoiceInfoInput) => {
    posthog?.capture('invoice_add');
    addInvoice(
      Object.entries(toInvoice)
        .filter(([_, value]) => value)
        .map(([key]) => store.deliveries.find((delivery) => delivery.id === key))
        .filter((d) => !!d) as Delivery[],
      e.createdAt,
      e.notes,
    )
      .then(() =>
        say({
          sentence: `La facture a bien été enregistrée`,
          autoShutUp: true,
          feeling: SideKickFeeling.GOOD,
        }),
      )
      .then(() => setToInvoice({}))
      .then(handleClose);
  };

  const facturable = useMemo(() => {
    return Object.values(toInvoice).filter((val) => val).length;
  }, [toInvoice]);

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  return (
    <>
      <Button
        disabled={!facturable}
        onClick={() => {
          onOpen();
        }}
      >
        Facturer{!!facturable && ` ${facturable} BL${facturable > 1 ? 's' : ''}`}
      </Button>
      <MyModal
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        title="Nouvelle Facture"
      >
        <InvoiceFields
          control={control}
          register={register}
        />
      </MyModal>
    </>
  );
}
