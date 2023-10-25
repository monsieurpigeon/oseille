import { useState } from 'react';
import { Invoice } from '../backend';

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const getInvoice = (id: string) => {
    if (!id) return;
    return invoices.find((invoice) => invoice.id === id);
  };

  const getClientInvoices = (customerId: string) => {
    return invoices
      .filter((invoice) => invoice.customer === customerId)
      .sort((a, b) => b.documentId.localeCompare(a.documentId));
  };

  const getInvoicesByIds = (ids: string[]) => {
    return ids.map((id) => invoices.find((d) => d.id === id)).filter(Boolean) as Invoice[];
  };

  return { invoices, getInvoice, getClientInvoices, getInvoicesByIds };
}
