import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { addInvoice, exportDocument, store } from '../../backend';
import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import React from 'react';
import { MyH1 } from '../../component/typography/MyFont';
import { MyButton } from '../../component/form/button/MyButton';

export function Deliveries() {
  const { deliveries } = useSnapshot(store);

  return (
    <MyScreenLayout>
      <MyH1>Livraisons</MyH1>
      <Link to="create">Nouveau</Link>
      {deliveries.map((delivery: any) => {
        return (
          <div key={delivery._id}>
            <div>
              {delivery.customer.name} - {delivery.documentId}
            </div>
            {!delivery.invoiceId ? (
              <MyButton
                onClick={() => {
                  addInvoice([delivery]);
                }}
                label="Facturer"
              />
            ) : null}
            <MyButton
              onClick={() => {
                exportDocument({ payload: delivery });
              }}
              label="Export PDF"
            />
            {delivery.products.map((el: any) => {
              return (
                <div key={el.product._id}>
                  {el.quantity} * {el.product.name} #{el.productId} - {el.product.price}
                </div>
              );
            })}
          </div>
        );
      })}
    </MyScreenLayout>
  );
}
