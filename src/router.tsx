import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { About } from './page/about/About';
import { AppSection } from './page/about/sections/app-section/AppSection';
import { BusinessSection } from './page/about/sections/business-section/BusinessSection';
import { TeamSection } from './page/about/sections/team-section/TeamSection';
import { BackOffice } from './page/back-office/BackOffice';
import { CustomerAll } from './page/customer/CustomerAll';
import { Customers } from './page/customer/Customers';
import { CustomerDetail } from './page/customer/detail/CustomerDetail';
import { CustomerCreateModal } from './page/customer/modal/CustomerCreateModal';
import { CustomerEditModal } from './page/customer/modal/CustomerEditModal';
import { Dashboard } from './page/dashboard/Dashboard';
import { Deliveries } from './page/delivery/Deliveries';
import { Invoices } from './page/invoice/Invoices';
import { Prices } from './page/prices/Prices';
import { ProductAll } from './page/product/ProductAll';
import { ProductDetail } from './page/product/ProductDetail';
import { Products } from './page/product/Products';
import { ProductCreateModal } from './page/product/modal/ProductCreateModal';
import { ProductEditModal } from './page/product/modal/ProductEditModal';
import { Settings } from './page/settings/Settings';
import { AdvancedSection } from './page/settings/sections/advanced-section/AdvancedSection';
import { FarmSection } from './page/settings/sections/farm-section/FarmSection';
import { InvoiceSection } from './page/settings/sections/invoice-section/InvoiceSection';

const visitDefault = (route: string) => {
  return {
    index: true,
    element: (
      <Navigate
        to={route}
        replace
      />
    ),
  };
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Dashboard /> },
      {
        path: 'product',
        element: <Products />,
        children: [
          { index: true, element: <ProductAll /> },
          { path: 'create', element: <ProductCreateModal /> },
          { path: ':id', element: <ProductDetail />, children: [{ path: 'edit', element: <ProductEditModal /> }] },
        ],
      },
      {
        path: 'customer',
        element: <Customers />,
        children: [
          { index: true, element: <CustomerAll /> },
          { path: 'create', element: <CustomerCreateModal /> },
          { path: ':id', element: <CustomerDetail />, children: [{ path: 'edit', element: <CustomerEditModal /> }] },
        ],
      },
      { path: 'prices', element: <Prices /> },
      { path: 'delivery', element: <Deliveries /> },
      { path: 'invoice', element: <Invoices /> },
      {
        path: 'settings',
        element: <Settings />,
        children: [
          visitDefault('farm'),
          { path: 'farm', element: <FarmSection /> },
          { path: 'invoices', element: <InvoiceSection /> },
          { path: 'advanced', element: <AdvancedSection /> },
        ],
      },
      {
        path: 'about',
        element: <About />,
        children: [
          visitDefault('app'),
          { path: 'app', element: <AppSection /> },
          { path: 'team', element: <TeamSection /> },
          { path: 'business', element: <BusinessSection /> },
        ],
      },
      { path: 'admin', element: <BackOffice /> },
    ],
  },
]);
