import { db } from '../service/database';
import { store } from '../service/store';
import { Delivery } from './delivery';

export interface Invoice {
  _id: string;
  customerId: string;
  products: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }>;
}

export interface InvoiceInput {
  customerId: string;
  products: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }>;
}

export const loadInvoices = () => {
  db.find({
    selector: { type: 'Invoice' },
  }).then((result) => {
    store.invoices = result.docs as unknown as Invoice[];
  });
};

export const addInvoice = (deliveries: Delivery[]) => {
  deliveries.map((delivery) => {
    const { customer, products, _id } = delivery;
    db.post({
      customer,
      products,
      delivery_id: [_id],
      type: 'Invoice',
    })
      .then(loadInvoices)
      .catch(console.error);
  });
};
