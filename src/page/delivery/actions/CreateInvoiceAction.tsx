import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Delivery, InvoiceInfoInput, addInvoice, store } from '../../../backend';
import { CreateModal } from '../../../component/modal/CreateModal';
import { InvoiceFields } from '../../invoice/InvoiceFields';

interface CreateInvoiceActionProps {
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

export function CreateInvoiceAction({ toInvoice, setToInvoice }: CreateInvoiceActionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { control, register, handleSubmit, reset } = useForm<InvoiceInfoInput>({
    resolver: zodResolver(invoiceSchema),
    defaultValues,
  });
  const onSubmit = (e: InvoiceInfoInput) => {
    console.log(e);
    addInvoice(
      Object.entries(toInvoice)
        .filter(([_, value]) => value)
        .map(([key]) => store.deliveries.find((delivery) => delivery.id === key))
        .filter((d) => !!d) as Delivery[],
      e.createdAt,
      e.notes,
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
      <CreateModal
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        title="Nouvelle Facture"
        body={
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
