import { Params } from 'react-router-dom';
import { Customer, Invoice, relDb } from '../../../../backend';
import { InvoiceAll } from '../../../../page/invoice/InvoiceAll';
import { InvoiceDetail } from '../../../../page/invoice/InvoiceDetail';
import { InvoicePage } from '../../../../page/invoice/InvoicePage';
import { InvoiceEditModal } from '../../../../page/invoice/modal/InvoiceEditModal';
import { PaymentModal } from '../../../../page/invoice/modal/PaymentModal';
import { sortAlpha } from '../../../sort';

export const invoiceRouter = {
  path: 'invoice',
  element: <InvoicePage />,
  id: 'invoices',
  loader: async () => {
    const resProd = await relDb.rel.find('product');
    return relDb.rel.find('invoice').then((doc) => ({
      ...doc,
      products: resProd.products,
      deliveries: doc.Ideliveries,
      invoices: doc.invoices.sort(sortAlpha<Invoice>('documentId')),
      customers: doc.Icustomers.sort(sortAlpha<Customer>('name', true)),
    }));
  },
  children: [
    { index: true, element: <InvoiceAll /> },
    {
      path: ':id',
      element: <InvoiceDetail />,
      id: 'invoice',
      loader: async ({ params }: { params: Params<string> }) =>
        relDb.rel
          .find('invoice', params.id)
          .then((doc) => ({ ...doc, deliveries: doc.Ideliveries, customers: doc.Icustomers })),
      children: [
        { path: 'pay', element: <PaymentModal /> },
        { path: 'edit', element: <InvoiceEditModal /> },
      ],
    },
  ],
};
