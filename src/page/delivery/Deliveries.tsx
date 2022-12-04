import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { addInvoice, exportDocument, store } from '../../backend';
import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import React from 'react';
import { StyledH1 } from '../../component/typography/MyFont';
import { MyButton } from '../../component/form/button/MyButton';

export function Deliveries() {
  const { deliveries } = useSnapshot(store);

  return (
    <MyScreenLayout>
      <Link to="create">Nouveau</Link>
      <StyledH1>Livraisons</StyledH1>
      {deliveries.map((delivery: any) => {
        return (
          <div key={delivery._id}>
            <div>
              {delivery.customer.name} - {delivery.documentId}
            </div>
            <MyButton
              onClick={() => {
                addInvoice([delivery]);
              }}
              label="Facturer"
            />
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
