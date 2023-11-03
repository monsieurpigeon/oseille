import { InvoicingPageGroup } from '../../../page-group/InvoicingPageGroup';
import { BackOfficePage } from '../../../page/back-office/BackOfficePage';
import { visitDefault } from './common';
import { customerRouter } from './invoice/customerRouter';
import { dashboardRouter } from './invoice/dashboardRouter';
import { deliveryRouter } from './invoice/deliveryRouter';
import { invoiceRouter } from './invoice/invoiceRouter';
import { orderRouter } from './invoice/orderRouter';
import { priceRouter } from './invoice/priceRouter';
import { productRouter } from './invoice/productRouter';

export const invoicingRouter = {
  path: 'invoicing',
  element: <InvoicingPageGroup />,

  children: [
    visitDefault('dashboard'),
    dashboardRouter,
    productRouter,
    customerRouter,
    priceRouter,
    orderRouter,
    deliveryRouter,
    invoiceRouter,
    { path: 'admin', element: <BackOfficePage /> },
  ],
};
