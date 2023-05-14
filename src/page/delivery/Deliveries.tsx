import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { z } from 'zod';
import { Delivery, DeliveryInput, InvoiceInfoInput, addDelivery, addInvoice, store } from '../../backend';
import { CreateModal } from '../../component/modal/CreateModal';
import { MyH1 } from '../../component/typography/MyFont';
import { InvoiceFields } from '../invoice/InvoiceFields';
import { DeliveryDetail } from './DeliveryDetail';
import { DeliveryFields } from './DeliveryFields';

export const deliverySchema = z.object({
  customerId: z.string().min(1),
  deliveredAt: z.string(),
  lines: z
    .object({
      productId: z.string().min(1),
      price: z.number().gt(0),
      quantity: z.number().gt(0),
    })
    .array()
    .nonempty(),
  notes: z.string(),
});

export function Deliveries() {
  const [selected, setSelected] = useState<Delivery>();
  const snap = useSnapshot(store);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  useEffect(() => {
    const updated = store.deliveries.find((p) => p.id === selected?.id);
    if (updated) {
      setSelected(updated);
    }
  }, [snap]);

  const { control, register, handleSubmit, reset, watch, setValue, getValues } = useForm<DeliveryInput>({
    resolver: zodResolver(deliverySchema),
    defaultValues: { customerId: '', deliveredAt: new Date().toISOString().split('T')[0], notes: '' },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lines',
  });

  useEffect(() => {
    const updated = store.deliveries.find((p) => p.id === selected?.id);
    if (updated) {
      setSelected(updated);
    }
  }, [snap]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      reset();
      remove();
    }, 100);
  };

  const onSubmit = (e: DeliveryInput) => addDelivery(e).then(handleClose).catch(console.error);

  return (
    <div className="catalog">
      <div className="catalog-side">
        <div className="catalog-header">
          <MyH1>Mes Livraisons</MyH1>
          <Button
            colorScheme="twitter"
            onClick={onOpen}
          >
            Nouveau
          </Button>
          <CreateModal
            isOpen={isOpen}
            cancelRef={cancelRef}
            title="Nouveau produit"
            onClose={handleClose}
            onSubmit={handleSubmit(onSubmit)}
            body={
              <DeliveryFields
                control={control}
                register={register}
                fields={fields}
                append={append}
                remove={remove}
                watch={watch}
                setValue={setValue}
                getValues={getValues}
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
        </div>
        <div className="catalog-list">
          {store.customers.map((customer) => (
            <DeliveryCustomer
              key={customer.id}
              selected={selected}
              customer={customer}
              setSelected={setSelected}
            />
          ))}
        </div>
      </div>
      <div className="catalog-side">{selected && <DeliveryDetail selected={selected} />}</div>
    </div>
  );
}

export const invoiceSchema = z.object({
  createdAt: z.string(),
  notes: z.string(),
});

const defaultValues = { createdAt: new Date().toISOString().split('T')[0], notes: '' };

function DeliveryCustomer({ customer, selected, setSelected }: any) {
  const [toInvoice, setToInvoice] = useState<{ [key: string]: boolean }>({});
  const deliveries = store.deliveries.filter((delivery) => delivery.customerId === customer.id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { control, register, handleSubmit, reset } = useForm<InvoiceInfoInput>({
    resolver: zodResolver(invoiceSchema),
    defaultValues,
  });

  const facturable = useMemo(() => {
    return Object.values(toInvoice).filter((val) => val).length;
  }, [toInvoice]);

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  const onSubmit = (e: InvoiceInfoInput) => {
    console.log(e);
    addInvoice(
      Object.entries(toInvoice)
        .filter(([key, value]) => value)
        .map(([key]) => store.deliveries.find((delivery) => delivery.id === key))
        .filter((d) => !!d) as Delivery[],
      e.createdAt,
      e.notes,
    )
      .then(() => setToInvoice({}))
      .then(handleClose);
  };

  return (
    <div
      className="catalog-sub-list"
      key={customer.id}
    >
      <div className="catalog-sub-list-customer">
        <div className="bold">{customer.name}</div>
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
          title={'Nouvelle Facture'}
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
      </div>

      {deliveries.length === 0 && <div className="faded">Pas de livraison</div>}
      {deliveries.map((delivery) => (
        <div
          className="catalog-item-select"
          key={delivery.id}
        >
          <div
            className={`catalog-item grow ${selected?.id === delivery.id && 'selected'}`}
            key={delivery.id}
            onClick={() => setSelected((e: Delivery) => (e?.id === delivery.id ? undefined : { ...delivery }))}
            onKeyDown={() => {}}
          >
            {`${delivery.documentId}`}
          </div>
          {!delivery.invoiceId ? (
            <input
              type="checkbox"
              id={delivery.id}
              // rome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
              checked={toInvoice[delivery.id] || false}
              onChange={() =>
                setToInvoice((i) => ({
                  ...i,
                  [delivery.id]: !i[delivery.id],
                }))
              }
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
