import { documentIdFormatter } from '../../utils/formatter';
import { relDb } from '../service/database';
import { DocumentType } from '../service/pdf/pdf';
import { store } from '../service/store';
import { Customer, getCustomer } from './customer';
import { Delivery, addInvoiceId, confirmOrder, removeInvoiceId } from './delivery';
import { updateDocumentId } from './farm';

export interface Invoice {
  id: string;
  customer: Customer;
  documentId: string;
  customerId: string;
  deliveryIds: string[];
  deliveries: string[];
  createdAt: string;
  notes: string;
  isPaid?: boolean;
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
  isPaid: boolean;
}

export async function loadInvoices() {
  const result = await relDb.rel.find('invoice');
  store.invoices = result.invoices
    .map((invoice: Invoice) => ({
      ...invoice,
      createdAt: new Date(invoice.createdAt).toISOString().split('T')[0],
    }))
    .sort((a: Invoice, b: Invoice) => {
      return b.documentId.localeCompare(a.documentId);
    });
}

export const addInvoice = async (deliveries: Delivery[], createdAt: string, notes: string) => {
  const customer = await getCustomer(deliveries[0].customerId);
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

  try {
    const result = await relDb.rel.save('invoice', invoice);
    deliveries.forEach(confirmOrder);

    invoice.deliveryIds.map((id) => addInvoiceId(result.id, id));
    updateDocumentId('Invoice');
    return result;
  } catch (message) {
    console.error(message);
    return undefined;
  }
};

export const updateInvoice = (invoice: Invoice) => {
  return relDb.rel.save('invoice', invoice);
};

export const deleteInvoice = (invoice: Invoice) => {
  invoice.deliveryIds.map((id) => removeInvoiceId(id));
  updateDocumentId(DocumentType.invoice, -1);
  return relDb.rel.del('invoice', invoice);
};
