import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostHog } from 'posthog-js/react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { addInvoice, InvoiceInfoInput } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { dateFormatter } from '../../../utils/formatter';
import { InvoiceFields } from './InvoiceFields';

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
});

const defaultValues = { createdAt: new Date().toISOString().split('T')[0], notes: '' };

export function InvoiceCreateModal({ toInvoice, setToInvoice }: InvoiceCreateModalProps) {
  const posthog = usePostHog();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { say } = useSideKick();
  const navigate = useNavigate();

  const handleClose = (val: { id: string } | undefined) => {
    if (!val) {
      onClose();
    } else {
      navigate(`../invoice/${val.id}`);
    }
  };

  const { register, handleSubmit } = useForm<InvoiceInfoInput>({
    resolver: zodResolver(invoiceSchema),
    defaultValues,
  });
  const onSubmit = (e: InvoiceInfoInput) => {
    posthog?.capture('invoice_add');

    const deliveries = Object.keys(toInvoice)
      .map((id) => toInvoice[id] && id)
      .filter((d) => !!d) as string[];

    addInvoice(deliveries, e.createdAt, e.notes)
      .then((val) => {
        setTimeout(() => {
          handleClose(val);
        }, 500);
      })
      .then(() =>
        say({
          sentence: `La facture a bien été enregistrée`,
          autoShutUp: true,
          feeling: SideKickFeeling.GOOD,
        }),
      )
      .then(() => setToInvoice({}));
  };

  const facturable = useMemo(() => {
    return Object.values(toInvoice).filter((val) => val).length;
  }, [toInvoice]);

  return (
    <>
      <Button
        isDisabled={!facturable}
        onClick={() => {
          onOpen();
        }}
      >
        Facturer{!!facturable && ` ${facturable} BL${facturable > 1 ? 's' : ''}`}
      </Button>
      <MyModal
        isOpen={isOpen}
        onClose={() => handleClose(undefined)}
        onSubmit={handleSubmit(onSubmit)}
        title={`Nouvelle Facture au ${dateFormatter(defaultValues.createdAt)}`}
      >
        <InvoiceFields register={register} />
      </MyModal>
    </>
  );
}
