import { db } from '../service/database';
import { store } from '../service/store';
import { Product } from './product';
import { Customer } from './customer';

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
  _id: string;
  customer: Customer;
  products: Array<{
    product: Product;
    quantity: number;
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

export const addInvoice = (invoices: InvoiceInput[]) => {
  invoices.map((delivery) => {
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
