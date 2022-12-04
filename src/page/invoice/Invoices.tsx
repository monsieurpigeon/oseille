import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { exportDocument, store } from '../../backend';
import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import { StyledH1 } from '../../component/typography/MyFont';
import { MyButton } from '../../component/form/button/MyButton';

export function Invoices() {
  const { invoices } = useSnapshot(store);

  return (
    <MyScreenLayout>
      <Link to="create">Nouveau</Link>
      <StyledH1>Factures</StyledH1>
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
    </MyScreenLayout>
  );
}
