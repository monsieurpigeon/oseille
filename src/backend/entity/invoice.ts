import { relDb } from '../service/database';
import { store } from '../service/store';
import { Customer, loadCustomer } from './customer';
import { updateDocumentId } from './farm';
import { documentIdFormatter } from '../../utils/formatter';
import { addInvoiceId, Delivery, removeInvoiceId } from './delivery';
import { DocumentType } from '../service/pdf/pdf';

export interface Invoice {
  id: string;
  customer: Customer;
  documentId: string;
  customerId: string;
  deliveryIds: string[];
  deliveries: string[];
  createdAt: string;
  notes: string;
}

export interface InvoiceInput {
  customer: Customer;
  customerId: string;
  documentId: string;
  deliveryIds: string[];
  deliveryDocumentIds: string[];
  deliveries: Delivery[];
  createdAt: string;
  notes: string;
}

export interface InvoiceInfoInput {
  createdAt: string;
  notes: string;
}

export async function loadInvoices() {
  const result = await relDb.rel.find('invoice');
  store.invoices = result.invoices.map((invoice: Invoice) => ({
    ...invoice,
    createdAt: new Date(invoice.createdAt).toISOString().split('T')[0],
  }));
}

export const addInvoice = async (deliveries: Delivery[], createdAt: string, notes: string) => {
  const customer = await loadCustomer(deliveries[0].customerId);
  const invoice: InvoiceInput = {
    documentId: documentIdFormatter(store.farm?.invoiceId || 0, 'Invoice'),
    customer: customer,
    customerId: customer.id,
    deliveryIds: deliveries.map((d) => d.id),
    deliveryDocumentIds: deliveries.map((d) => d.documentId),
    deliveries,
    createdAt,
    notes,
  };

  return relDb.rel
    .save('invoice', invoice)
    .then((result) => {
      invoice.deliveryIds.map((id) => addInvoiceId(result.id, id));
      updateDocumentId('Invoice');
    })
    .catch(console.error);
};

export const updateInvoice = (invoice: Invoice) => {
  return relDb.rel.save('invoice', invoice);
};

export const deleteInvoice = (invoice: Invoice) => {
  invoice.deliveryIds.map((id) => removeInvoiceId(id));
  updateDocumentId(DocumentType.invoice, -1);
  return relDb.rel.del('invoice', invoice);
};
