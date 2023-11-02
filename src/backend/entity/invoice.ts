import { documentIdFormatter } from '../../utils/formatter';
import { relDb } from '../service/database';
import { DocumentType } from '../service/pdf/pdf';
import { Customer } from './customer';
import { Delivery, addInvoiceId, removeInvoiceId } from './delivery';
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
  deliveries: string[];
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

export const addInvoice = async (deliveries: string[], createdAt: string, notes: string) => {
  const farm = await getFarm();
  const allDeliveries = (await relDb.rel.find('delivery', deliveries)) as {
    deliveries: Delivery[];
    customers: Customer[];
  };

  const customer = allDeliveries.customers[0].id;

  const invoice: InvoiceInput = {
    documentId: documentIdFormatter(farm?.invoiceId || 0, 'Invoice'),
    customer,
    deliveryDocumentIds: allDeliveries.deliveries.map((d) => d.documentId),
    deliveries,
    createdAt,
    notes,
  };

  try {
    const result = await relDb.rel.save('invoice', invoice);
    invoice.deliveries.map((id) => addInvoiceId(result.id, id));
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
