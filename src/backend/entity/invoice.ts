import { documentIdFormatter } from '../../utils/formatter';
import { relDb } from '../service/database';
import { DocumentType } from '../service/pdf/pdf';
import { store } from '../service/store';
import { Customer, getCustomerById } from './customer';
import { Delivery, addInvoiceId, confirmOrder, removeInvoiceId } from './delivery';
import { updateDocumentId } from './farm';

export enum PaymentMode {
  cash = 'cash',
  cheque = 'cheque',
  virement = 'virement',
  cb = 'cb',
}
export const PAYMENT_MODES = [
  { value: PaymentMode.cheque, label: 'Chèque' },
  { value: PaymentMode.cash, label: 'Espèces' },
  { value: PaymentMode.virement, label: 'Virement' },
  { value: PaymentMode.cb, label: 'CB' },
];
export interface Payment {
  paymentMode: PaymentMode;
  paidAt: string;
  amount: number;
  reference: string;
  notes: string;
}

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
  payments?: Payment[];
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

export interface InvoicePaymentInput {
  paymentMode: PaymentMode;
  amount: number;
  paidAt: string;
  reference: string;
  notes: string;
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
  const customer = await getCustomerById(deliveries[0].customerId);
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

export const isInvoicePaid = (invoice: Invoice): boolean => {
  return invoice.isPaid || (invoice?.payments && invoice.payments.length > 0) || false;
};
