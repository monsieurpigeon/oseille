import { db } from '../service/database';
import { store } from '../service/store';

export interface Deal {
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

export interface DealInput {
  customerId: string;
  products: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }>;
}

export const loadDeals = () => {
  db.find({
    selector: { type: 'Deal' },
  })
    .then((result: { docs: unknown }) => {
      return Promise.all(
        (result.docs as unknown as Deal[]).map(async (doc) => {
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
    .then((data: Deal[]) => {
      store.deals = data;
    });
};

export const addDeal = (deal: DealInput) => {
  db.post({
    ...deal,
    type: 'Deal',
  })
    .then(loadDeals)
    .catch(console.error);
};
