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
    const resDelivery = await relDb.rel.find('delivery');
    return relDb.rel.find('invoice').then((doc) => ({
      ...doc,
      products: resProd.products,
      deliveries: resDelivery.deliveries,
      invoices: doc.invoices.sort(sortAlpha<Invoice>('documentId')),
      customers: doc.customers.sort(sortAlpha<Customer>('name', true)),
    }));
  },
  children: [
    { index: true, element: <InvoiceAll /> },
    {
      path: ':id',
      element: <InvoiceDetail />,
      id: 'invoice',
      loader: async ({ params }: { params: Params<string> }) => relDb.rel.find('invoice', params.id),
      children: [
        { path: 'pay', element: <PaymentModal /> },
        { path: 'edit', element: <InvoiceEditModal /> },
      ],
    },
  ],
};
