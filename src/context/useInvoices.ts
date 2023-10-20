import { useEffect, useState } from 'react';
import { Invoice, getInvoices, onInvoicesChange } from '../backend';

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const refreshInvoices = () => {
    console.log('REFRESH INVOICE');
    getInvoices().then(setInvoices);
  };

  useEffect(() => {
    refreshInvoices();
    const observer = onInvoicesChange(refreshInvoices);
    return () => {
      observer.cancel();
    };
  }, []);

  const getInvoice = (id: string) => {
    if (!id) return;
    return invoices.find((invoice) => invoice.id === id);
  };

  const getClientInvoices = (customerId: string) => {
    return invoices
      .filter((invoice) => invoice.customerId === customerId)
      .sort((a, b) => b.documentId.localeCompare(a.documentId));
  };

  const getInvoicesByIds = (ids: string[]) => {
    return ids.map((id) => invoices.find((d) => d.id === id)).filter(Boolean) as Invoice[];
  };

  return { invoices, getInvoice, getClientInvoices, getInvoicesByIds };
}
