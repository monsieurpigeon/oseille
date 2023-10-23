import { documentIdFormatter } from '../../utils/formatter';
import { relDb } from '../service/database';
import { DocumentType } from '../service/pdf/pdf';
import { Customer } from './customer';
import { Delivery, addInvoiceId, confirmOrder, removeInvoiceId } from './delivery';
import { getFarm, updateDocumentId } from './farm';

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
  customer: string;
  documentId: string;
  deliveries: string[];
  createdAt: string;
  notes: string;
  isPaid?: boolean;
  payments?: Payment[];
}

export interface InvoiceInput {
  customer: string;
  deliveries: Delivery[];
  documentId: string;
  deliveryDocumentIds: string[];
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

export const addInvoice = async (deliveries: Delivery[], createdAt: string, notes: string) => {
  const farm = await getFarm();
  const invoice: InvoiceInput = {
    documentId: documentIdFormatter(farm?.invoiceId || 0, 'Invoice'),
    customer: deliveries[0].customerId,
    deliveryDocumentIds: deliveries.map((d) => d.documentId),
    deliveries,
    createdAt,
    notes,
  };

  try {
    const result = await relDb.rel.save('invoice', invoice);
    deliveries.forEach(confirmOrder);

    invoice.deliveries.map((delivery) => addInvoiceId(result.id, delivery.id));
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
  invoice.deliveries.map((id) => removeInvoiceId(id));
  updateDocumentId(DocumentType.invoice, -1);
  return relDb.rel.del('invoice', invoice);
};

export const isInvoicePaid = (invoice: Invoice): boolean => {
  return invoice.isPaid || (invoice?.payments && invoice.payments.length > 0) || false;
};

export const getInvoices = async (ids?: string[]) => {
  const doc = await relDb.rel.find('invoice', ids);

  const prom = doc.invoices.map(async (invoice: Invoice) => {
    const customer = doc.customers.find((customer: Customer) => customer.id === invoice.customer);
    const deliveries = doc.deliveries.filter((delivery: Delivery) => delivery.invoiceId === invoice.id);
    return {
      ...invoice,
      deliveries,
      customer,
      createdAt: new Date(invoice.createdAt).toISOString().split('T')[0],
    };
  });
  // TODO sort invoices
  //.sort((a: Invoice, b: Invoice) => a.documentId.localeCompare(b.documentId));

  return await Promise.all(prom);
};

// TODO useless function
export const getInvoiceById = (id: string) => relDb.rel.find('invoice', id).then((doc) => doc.invoices[0]);

export const onInvoicesChange = (listener: (value: PouchDB.Core.ChangesResponseChange<{}>) => any) =>
  relDb.changes({ since: 'now', live: true }).on('change', (e) => {
    if (e.id.split('_')[0] === 'invoice') {
      listener(e);
    }
  });
