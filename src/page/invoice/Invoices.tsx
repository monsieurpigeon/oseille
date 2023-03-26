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
      {invoices.map((invoice: Invoice) => {
        console.log({ invoice });
        return (
          <div key={invoice.id}>
            <div>
              {invoice.customer.name} - {invoice.documentId}
            </div>
            {invoice.deliveries.map((el: any) => {
              const delivery = store.deliveries.find((d) => d.id === el);

              return (
                <div key={delivery?.id}>
                  {delivery?.documentId}
                  <div>
                    {delivery?.products.map((product) => {
                      return (
                        <div>
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
        );
      })}
    </ScreenLayout>
  );
}
