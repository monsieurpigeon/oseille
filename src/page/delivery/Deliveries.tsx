import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';

import { Button, useDisclosure } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Customer, Delivery, DeliveryInput, addDelivery, addInvoice, exportDocument, store } from '../../backend';
import { CatalogMasterCard } from '../../component/catalog/Catalog';
import { CreateModal } from '../../component/modal/CreateModal';
import { MyH1 } from '../../component/typography/MyFont';
import { dateFormatter } from '../../utils/formatter';
import { DeliveryDetail } from './DeliveryDetail';
import { DeliveryFields } from './DeliveryFields';

export const deliverySchema = z.object({
  customerId: z.string().min(1),
  deliveredAt: z.string(),
  lines: z
    .object({
      productId: z.string().min(1),
      quantity: z.string(),
    })
    .array()
    .nonempty(),
});

export function Deliveries() {
  const [selected, setSelected] = useState<Delivery>();
  const snap = useSnapshot(store);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { control, register, handleSubmit, reset } = useForm<DeliveryInput>({
    resolver: zodResolver(deliverySchema),
    defaultValues: { customerId: '', deliveredAt: new Date().toISOString().split('T')[0] },
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
                register={register}
                control={control}
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
                  colorScheme="blue"
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
          {store.customers.map((customer) => {
            const deliveries = store.deliveries.filter((delivery) => delivery.customerId === customer.id);
            return (
              <div
                className="catalog-sub-list"
                key={customer.id}
              >
                <div className="bold">{customer.name}</div>
                {deliveries.length === 0 && <div className="faded">Pas de livraison</div>}
                {deliveries.map((entity) => (
                  <div
                    className={`catalog-item ${selected?.id === entity.id && 'selected'}`}
                    key={entity.id}
                    onClick={() => setSelected((e) => (e?.id === entity.id ? undefined : { ...entity }))}
                    onKeyDown={() => {}}
                  >
                    {`${entity.documentId}`}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div className="catalog-side">{selected && <DeliveryDetail selected={selected} />}</div>
    </div>
  );
}

function DeliveryCustomer({
  customer,
  setSelected,
}: {
  customer: Customer;
  setSelected: (value: React.SetStateAction<Delivery | undefined>) => void;
}) {
  const [toInvoice, setToInvoice] = useState<{ [key: string]: boolean }>({});

  const deliveries = store.deliveries.filter((delivery) => delivery.customerId === customer.id);

  return (
    <CatalogMasterCard
      label={
        <div>
          {customer.name}
          {!!Object.values(toInvoice).filter((i) => i).length && (
            <button
              style={{ marginLeft: '30px', border: '1px solid grey', padding: '0px 10px', borderRadius: '5px' }}
              onClick={() => {
                addInvoice(
                  Object.entries(toInvoice)
                    .filter(([key, value]) => value)
                    .map(([key]) => store.deliveries.find((delivery) => delivery.id === key))
                    .filter((d) => !!d) as Delivery[],
                ).then(() => setToInvoice({}));
              }}
            >
              Facturer {Object.values(toInvoice).filter((i) => i).length}
            </button>
          )}
        </div>
      }
    >
      {deliveries.length === 0 && <div>Aucune livraison</div>}
      {deliveries.length > 0 && (
        <div>
          <table style={{ borderCollapse: 'separate', borderSpacing: '20px 0' }}>
            <tbody>
              {deliveries.map((delivery: Delivery) => {
                return (
                  <tr key={delivery.id}>
                    <td>
                      {!delivery.invoiceId && (
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
                      )}
                    </td>
                    <td>
                      <div
                        onClick={() => setSelected((e) => (e === delivery ? undefined : delivery))}
                        onKeyDown={() => {}}
                      >
                        {delivery.documentId}
                      </div>
                    </td>
                    <td>{dateFormatter(delivery.deliveredAt)}</td>
                    <td>
                      <button
                        onClick={() => {
                          exportDocument({ payload: delivery, type: 'Delivery' });
                        }}
                      >
                        EXPORT
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </CatalogMasterCard>
  );
}
