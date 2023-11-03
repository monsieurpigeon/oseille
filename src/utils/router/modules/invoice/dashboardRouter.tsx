import { relDb } from '../../../../backend';
import { DashboardPage } from '../../../../page/dashboard/DashboardPage';

export const dashboardRouter = {
  path: 'dashboard',
  element: <DashboardPage />,
  id: 'dashboard',
  loader: async () => {
    const invoicesResult = await relDb.rel.find('invoice');
    const productsResult = await relDb.rel.find('products');
    const customersResult = await relDb.rel.find('customers');
    return {
      invoices: invoicesResult.invoices,
      products: productsResult.products,
      customers: customersResult.customers,
    };
  },
};
