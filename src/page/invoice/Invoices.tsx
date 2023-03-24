import { useSnapshot } from 'valtio';
import { exportDocument, store } from '../../backend';
import { MyButton } from '../../component/form/button/MyButton';
import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { MyH1 } from '../../component/typography/MyFont';

export function Invoices() {
  const { invoices } = useSnapshot(store);

  return (
    <ScreenLayout>
      <MyH1>Factures</MyH1>
      {invoices.map((invoice: any) => {
        return (
          <div key={invoice._id}>
            <div>
              {invoice.customer.name} - {invoice.documentId}
            </div>
            {invoice.products.map((el: any) => {
              return (
                <div key={el.product._id}>
                  {el.quantity} * {el.product.name} #{el.productId} - {el.product.price}
                </div>
              );
            })}
            <MyButton
              onClick={() => {
                exportDocument({ payload: invoice });
              }}
              label="Export PDF"
            />
          </div>
        );
      })}
    </ScreenLayout>
  );
}
