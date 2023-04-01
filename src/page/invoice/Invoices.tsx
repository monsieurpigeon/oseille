import { useSnapshot } from 'valtio';
import { Customer, Invoice, exportDocument, store } from '../../backend';
import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { CatalogDetail, CatalogList, CatalogMasterCard, CatalogueLayout } from '../../component/catalog/Catalog';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { useState } from 'react';

export function Invoices() {
  const [selected, setSelected] = useState<Invoice>();
  const snap = useSnapshot(store);

  return (
    <ScreenLayout>
      <CatalogueLayout>
        <CatalogList title="Mes Factures">
          {store.customers.map((customer) => (
            <InvoiceCustomer
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
                <div>{selected.documentId}</div>
                <div>{dateFormatter(selected.createdAt)}</div>
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
                    {selected.deliveries.map((id, index) => {
                      const delivery = store.deliveries.find((delivery) => delivery.id === id);
                      if (!delivery) return null;
                      return (
                        <tr key={`${index}`}>
                          <td>{delivery.id}</td>
                          <td>
                            {delivery.customer.name} {delivery.deliveredAt}
                          </td>
                        </tr>
                      );
                    })}
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

function InvoiceCustomer({
  customer,
  setSelected,
}: {
  customer: Customer;
  setSelected: (value: React.SetStateAction<Invoice | undefined>) => void;
}) {
  const invoices = store.invoices.filter((invoice) => invoice.customerId === customer.id);

  return (
    <CatalogMasterCard label={customer.name}>
      {invoices.length === 0 && <div>Aucune facture</div>}
      {invoices.length > 0 && (
        <div>
          <table style={{ borderCollapse: 'separate', borderSpacing: '20px 0' }}>
            <tbody>
              {invoices.map((invoice: Invoice) => {
                return (
                  <tr key={invoice.id}>
                    <td>
                      <div
                        onClick={() => setSelected((e) => (e === invoice ? undefined : invoice))}
                        onKeyDown={() => {}}
                      >
                        {invoice.documentId}
                      </div>
                    </td>
                    <td>{dateFormatter(invoice.createdAt)}</td>
                    <td>
                      <button
                        onClick={() => {
                          exportDocument({ payload: invoice, type: 'Invoice' });
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
