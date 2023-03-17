import { db } from '../service/database';
import { store } from '../service/store';
import { Product } from './product';
import { Customer } from './customer';
import { updateDocumentId } from './farm';
import { documentIdFormatter } from '../../utils/formatter';
import { addInvoiceId, Delivery } from './delivery';

export interface Invoice {
  id: string;
  documentId: string;
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
  id: string;
  customer: Customer;
  products: Array<{
    product: Product;
    quantity: number;
    totalPrice: number;
  }>;
}

export const loadInvoices = () => {
  db.find({
    selector: {
      type: 'Invoice',
    },
  }).then((result) => {
    store.invoices = result.docs as unknown as Invoice[];
  });
};

export const addInvoice = (deliveries: Delivery[]) => {
  deliveries.map((delivery) => {
    const { customer, products, id, documentId } = delivery;
    db.post({
      documentId: documentIdFormatter(store.farm?.invoiceId || 0, 'Invoice'),
      customer,
      products,
      deliveryIds: [id],
      deliveryDocumentIds: [documentId],
      type: 'Invoice',
    })
      .then((result) => {
        addInvoiceId(result.id, delivery.id);
        updateDocumentId('Invoice');
      })
      .catch(console.error);
  });
};
