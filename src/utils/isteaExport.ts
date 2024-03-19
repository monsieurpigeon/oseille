import { Customer, Invoice } from '../backend';
import { getInvoiceTotal } from './aggregations';
import { CountryCode } from './defaults';

const csvify = (data: string[][]) => {
  return data.map((row) => row.join(',')).join('\n');
};

export async function isteaSales(invoices: Invoice[], customers: Customer[]) {
  // TODO use it for other countries ?
  const result = await Promise.all(
    invoices.map(async (invoice) => {
      const customer = customers.find((c) => c.id === invoice.customer);
      const total = await getInvoiceTotal(invoice, true, CountryCode.FR);
      return [
        [
          invoice.createdAt,
          'VE',
          invoice.customer,
          `Facture ${invoice.documentId} ${customer?.name}`,
          invoice.documentId,
          total.toString(),
          'D',
          '',
        ],
        [
          invoice.createdAt,
          'VE',
          '707000',
          `Facture ${invoice.documentId} ${customer?.name}`,
          invoice.documentId,
          total.toString(),
          'C',
          '',
        ],
      ];
    }),
  );
  return csvify(result.flat());
}

export async function isteaPayments(invoices: Invoice[], customers: Customer[]) {
  // TODO use it for other countries ?
  const result = await Promise.all(
    invoices.map(async (invoice) => {
      const customer = customers.find((c) => c.id === invoice.customer);
      const payment = invoice.payments?.[0];
      const total = await getInvoiceTotal(invoice, false, CountryCode.FR);

      if (!payment) return [];

      return [
        [
          '1',
          invoice.createdAt,
          'VT',
          customer?.id || 'error',
          `${payment.paymentMode} Facture ${invoice.documentId} ${customer?.name}`,
          invoice.documentId,
          total.toString(),
          'C',
          '',
        ],
        [
          '1',
          invoice.createdAt,
          'VT',
          '512',
          `REGLEMENT ${payment.paymentMode}`,
          invoice.documentId,
          payment.amount.toString(),
          'D',
          '',
        ],
      ];
    }),
  );
  return csvify(result.flat());
}

export function isteaClients(customers: Customer[]) {
  return csvify(customers.map((c) => [c.id, c.name, '', '', '']));
}
