import { useSnapshot } from 'valtio';
import { Invoice, Product, exportDocument, store } from '../../backend';
import { MyButton } from '../../component/form/button/MyButton';
import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { MyH1 } from '../../component/typography/MyFont';

export function Invoices() {
  const { invoices } = useSnapshot(store);
  return (
    <ScreenLayout>
      <MyH1>Factures</MyH1>
      {invoices.map((invoice) => (
        <div key={invoice.id}>
          <div>
            {invoice.customer.name} - {invoice.documentId}
          </div>
          {invoice.deliveries.map((id) => {
            const delivery = store.deliveries.find((d) => d.id === id);
            if (!delivery) return null;
            return (
              <div key={delivery?.id}>
                {delivery?.documentId}
                <div>
                  {delivery?.products.map((product, index) => {
                    return (
                      <div key={`${index}`}>
                        {product.quantity} * {product?.product?.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <MyButton
            onClick={() => {
              exportDocument({ payload: invoice, type: 'Invoice' });
            }}
            label="Export PDF"
          />
        </div>
      ))}
    </ScreenLayout>
  );
}
