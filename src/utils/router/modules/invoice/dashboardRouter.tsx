import { relDb } from '../../../../backend';
import { DashboardPage } from '../../../../page/dashboard/DashboardPage';

export const dashboardRouter = {
  path: 'dashboard',
  element: <DashboardPage />,
  id: 'dashboard',
  loader: async () => {
    const invoicesResult = relDb.rel.find('Iinvoice');
    const productsResult = relDb.rel.find('products');
    const customersResult = relDb.rel.find('Icustomers');
    const result = await Promise.all([invoicesResult, productsResult, customersResult]);
    return {
      invoices: result[0].Iinvoices,
      products: result[1].products,
      customers: result[2].Icustomers,
    };
  },
};
