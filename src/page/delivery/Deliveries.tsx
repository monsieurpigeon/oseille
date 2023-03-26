import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Customer, Delivery, addInvoice, exportDocument, store } from '../../backend';
import { CatalogDetail, CatalogList, CatalogueLayout } from '../../component/catalog/Catalog';
import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { CreateDeliveries } from './CreateDeliveries';

export function Deliveries() {
  const [selected, setSelected] = useState<Delivery>();
  const snap = useSnapshot(store);

  useEffect(() => {
    const updated = store.deliveries.find((p) => p.id === selected?.id);
    if (updated) {
      setSelected(updated);
    }
  }, [snap]);

  return (
    <ScreenLayout>
      <CatalogueLayout>
        <CatalogList
          title="Mes Livraisons"
          slot={<CreateDeliveries />}
        >
          {store.customers.map((customer) => (
            <DeliveryCustomer
              customer={customer}
              setSelected={setSelected}
              key={customer.id}
            />
          ))}
        </CatalogList>
        <CatalogDetail
          show={!!selected}
          onClear={() => setSelected(undefined)}
        >
          {selected && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
              <div>
                <div>
                  {selected.documentId}
                  {selected.invoiceId ? ` - Facturé` : ''}
                </div>
                <div>{dateFormatter(selected.deliveredAt)}</div>
                <div>{selected.customer.name}</div>
                <table>
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Quantité</th>
                      <th>Prix unitaire</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.products.map((product) => (
                      <tr key={product.product.id}>
                        <td>{product.product.name}</td>
                        <td>
                          {product.quantity} {product.product.unit}
                        </td>
                        <td>{priceFormatter(product.product.price)}</td>
                        <td>{priceFormatter(product.product.price * product.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CatalogDetail>
      </CatalogueLayout>
    </ScreenLayout>
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

  return (
    <div>
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
      <div>
        {' '}
        <table style={{ borderCollapse: 'separate', borderSpacing: '20px 0' }}>
          <tbody>
            {store.deliveries
              .filter((delivery) => delivery.customerId === customer.id)
              .map((delivery: Delivery) => {
                return (
                  <tr>
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
              })}{' '}
          </tbody>
        </table>
      </div>
    </div>
  );
}
