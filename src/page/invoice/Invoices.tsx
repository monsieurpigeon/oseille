import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { Invoice, store } from '../../backend';
import { MyH1 } from '../../component/typography/MyFont';
import { InvoiceDetail } from './InvoiceDetail';

export function Invoices() {
  const [selected, setSelected] = useState<Invoice>();
  const snap = useSnapshot(store);

  return (
    <div className="catalog">
      <div className="catalog-side">
        <div className="catalog-header">
          <MyH1>Mes Factures</MyH1>
        </div>
        <div className="catalog-list">
          {store.customers.map((customer) => (
            <InvoiceCustomer
              key={customer.id}
              selected={selected}
              customer={customer}
              setSelected={setSelected}
            />
          ))}
        </div>
      </div>
      <div className="catalog-side">{selected && <InvoiceDetail selected={selected} />}</div>
    </div>
  );
}

function InvoiceCustomer({ customer, selected, setSelected }: any) {
  const invoices = store.invoices.filter((invoice) => invoice.customerId === customer.id);

  return (
    <div
      className="catalog-sub-list"
      key={customer.id}
    >
      <div className="catalog-sub-list-customer">
        <div className="bold">{customer.name}</div>
      </div>

      {invoices.length === 0 && <div className="faded">Pas de facture</div>}
      {invoices.map((invoice) => (
        <div
          className="catalog-item-select"
          key={invoice.id}
        >
          <div
            className={`catalog-item grow ${selected?.id === invoice.id && 'selected'}`}
            key={invoice.id}
            onClick={() => setSelected((e: Invoice) => (e?.id === invoice.id ? undefined : { ...invoice }))}
            onKeyDown={() => {}}
          >
            {`${invoice.documentId}`}
          </div>
        </div>
      ))}
    </div>
  );
}
