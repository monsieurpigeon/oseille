import { relDb } from '../service/database';
import { store } from '../service/store';
import { Customer } from './customer';
import { updateDocumentId } from './farm';
import { documentIdFormatter } from '../../utils/formatter';
import { addInvoiceId, Delivery } from './delivery';

export interface Invoice {
  id: string;
  customer: Customer;
  documentId: string;
  customerId: string;
  deliveryIds: string[];
  deliveries: string[];
  createdAt: string;
}

export interface InvoiceInput {
  customer: Customer;
  customerId: string;
  documentId: string;
  deliveryIds: string[];
  deliveryDocumentIds: string[];
  deliveries: Delivery[];
  createdAt: string;
}

export async function loadInvoices() {
  const result = await relDb.rel.find('invoice');
  store.invoices = result.invoices;
}

export const addInvoice = (deliveries: Delivery[]) => {
  const createdAt = new Date().toUTCString();
  const invoice: InvoiceInput = {
    documentId: documentIdFormatter(store.farm?.invoiceId || 0, 'Invoice'),
    customer: deliveries[0].customer,
    customerId: deliveries[0].customerId,
    deliveryIds: deliveries.map((d) => d.id),
    deliveryDocumentIds: deliveries.map((d) => d.documentId),
    deliveries,
    createdAt,
  };

  return relDb.rel
    .save('invoice', invoice)
    .then((result) => {
      invoice.deliveryIds.map((id) => addInvoiceId(result.id, id));
      updateDocumentId('Invoice');
    })
    .catch(console.error);
};
