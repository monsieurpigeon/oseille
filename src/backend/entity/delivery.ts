import { db } from '../service/database';
import { store } from '../service/store';

export interface Delivery {
  id: string;
  customerId: string;
  products: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }>;
}

export interface DeliveryInput {
  customerId: string;
  products: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }>;
}

export const loadDeliveries = () => {
  db.find({
    selector: { type: 'Delivery' },
  })
    .then((result: { docs: unknown }) => {
      return Promise.all(
        (result.docs as unknown as Delivery[]).map(async (doc) => {
          const customer = await db.get(doc.customerId);
          const products = await Promise.all(
            doc.products.map(async (el) => {
              const product = await db.get(el.productId);
              return { ...el, product };
            }),
          );
          return { ...doc, customer, products };
        }),
      );
    })
    .then((data: Delivery[]) => {
      store.deliveries = data;
    });
};

export const addDelivery = (delivery: DeliveryInput) => {
  db.post({
    ...delivery,
    type: 'Delivery',
  })
    .then(loadDeliveries)
    .catch(console.error);
};
