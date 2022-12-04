import { Link } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { addInvoice, exportDocument, store } from '../../backend';
import { ScreenLayout } from '../../component/layout/ScreenLayout';
import React from 'react';
import {StyledH1} from "../../component/typography/Font";

export function Deliveries() {
  const { deliveries } = useSnapshot(store);

  return (
    <ScreenLayout>
      <Link to="create">Nouveau</Link>
      <StyledH1>Livraisons</StyledH1>
      {deliveries.map((delivery: any) => {
        return (
          <div key={delivery._id}>
            <div>
              {delivery.customer.name} - {delivery._id}
            </div>
            <button
              onClick={() => {
                addInvoice([delivery]);
              }}
            >
              Facturer
            </button>
            <button
              onClick={() => {
                exportDocument({ payload: delivery });
              }}
            >
              Export
            </button>
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
    </ScreenLayout>
  );
}
