import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Customer, Product, relDb } from './backend';
import { AboutPageGroup } from './page-group/AboutPageGroup';
import { InvoicingPageGroup } from './page-group/InvoicingPageGroup';
import { SettingPageGroup } from './page-group/SettingPageGroup';
import { ToolPageGroup } from './page-group/ToolPageGroup';
import { AboutPage } from './page/about/AboutPage';
import { AppSection } from './page/about/sections/app-section/AppSection';
import { BusinessSection } from './page/about/sections/business-section/BusinessSection';
import { TeamSection } from './page/about/sections/team-section/TeamSection';
import { BackOfficePage } from './page/back-office/BackOfficePage';
import { CustomerAll } from './page/customer/CustomerAll';
import { CustomerPage } from './page/customer/CustomerPage';
import { CustomerDetail } from './page/customer/detail/CustomerDetail';
import { CustomerCreateModal } from './page/customer/modal/CustomerCreateModal';
import { CustomerEditModal } from './page/customer/modal/CustomerEditModal';
import { DashboardPage } from './page/dashboard/DashboardPage';
import { DeliveryAll } from './page/delivery/DeliveryAll';
import { DeliveryDetail } from './page/delivery/DeliveryDetail';
import { DeliveryPage } from './page/delivery/DeliveryPage';
import { OrderAll } from './page/delivery/OrderAll';
import { OrderPage } from './page/delivery/OrderPage';
import { DeliveryCreateModal } from './page/delivery/modal/DeliveryCreateModal';
import { DeliveryEditModal } from './page/delivery/modal/DeliveryEditModal';
import { InvoiceAll } from './page/invoice/InvoiceAll';
import { InvoiceDetail } from './page/invoice/InvoiceDetail';
import { InvoicePage } from './page/invoice/InvoicePage';
import { InvoiceEditModal } from './page/invoice/modal/InvoiceEditModal';
import { PaymentModal } from './page/invoice/modal/PaymentModal';
import { PricePage } from './page/prices/PricePage';
import { ProductAll } from './page/product/ProductAll';
import { ProductDetail } from './page/product/ProductDetail';
import { ProductPage } from './page/product/ProductPage';
import { ProductCreateModal } from './page/product/modal/ProductCreateModal';
import { ProductEditModal } from './page/product/modal/ProductEditModal';
import { SettingPage } from './page/settings/SettingPage';
import { AdvancedSection } from './page/settings/sections/advanced-section/AdvancedSection';
import { FarmSection } from './page/settings/sections/farm-section/FarmSection';
import { InvoiceSection } from './page/settings/sections/invoice-section/InvoiceSection';
import { ToolPage } from './page/tools/ToolPage';
import { ScaleToolPage } from './page/tools/scale/ScaleToolPage';

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
    element: (
      <Navigate
        to="/invoicing"
        replace
      />
    ),
  },
  {
    path: '/invoicing',
    element: <InvoicingPageGroup />,
    children: [
      visitDefault('dashboard'),
      { path: 'dashboard', element: <DashboardPage /> },
      {
        path: 'product',
        id: 'products',
        element: <ProductPage />,
        loader: async () => {
          return relDb.rel
            .find('product')
            .then((doc) => doc.products.sort((a: Product, b: Product) => a.name.localeCompare(b.name)));
        },
        children: [
          {
            index: true,
            element: <ProductAll />,
          },
          { path: 'create', element: <ProductCreateModal /> },
          {
            path: ':id',
            element: <ProductDetail />,
            id: 'product',
            loader: async ({ params }) => relDb.rel.find('product', params.id).then((doc) => doc.products[0]),
            children: [
              {
                path: 'edit',
                element: <ProductEditModal />,
              },
            ],
          },
        ],
      },
      {
        path: 'customer',
        element: <CustomerPage />,
        id: 'customers',
        loader: async () =>
          relDb.rel
            .find('customer')
            .then((doc) => doc.customers.sort((a: Customer, b: Customer) => a.name.localeCompare(b.name))),
        children: [
          { index: true, element: <CustomerAll /> },
          { path: 'create', element: <CustomerCreateModal /> },
          {
            path: ':id',
            element: <CustomerDetail />,
            loader: async ({ params }) =>
              relDb.rel.find('customerDetail', params.id).then((doc) => {
                console.log(doc);
                return doc;
                // .customers.sort((a: Customer, b: Customer) => a.name.localeCompare(b.name));
              }),
            children: [{ path: 'edit', element: <CustomerEditModal /> }],
          },
        ],
      },
      { path: 'prices', element: <PricePage /> },
      {
        path: 'order',
        element: <OrderPage />,
        children: [
          { index: true, element: <OrderAll /> },
          { path: 'create', element: <DeliveryCreateModal /> },
          { path: ':id', element: <DeliveryDetail />, children: [{ path: 'edit', element: <DeliveryEditModal /> }] },
        ],
      },
      {
        path: 'delivery',
        element: <DeliveryPage />,
        children: [
          { index: true, element: <DeliveryAll /> },
          { path: 'create', element: <DeliveryCreateModal /> },
          { path: ':id', element: <DeliveryDetail />, children: [{ path: 'edit', element: <DeliveryEditModal /> }] },
        ],
      },
      {
        path: 'invoice',
        element: <InvoicePage />,
        children: [
          { index: true, element: <InvoiceAll /> },
          {
            path: ':id',
            element: <InvoiceDetail />,
            children: [
              { path: 'pay', element: <PaymentModal /> },
              { path: 'edit', element: <InvoiceEditModal /> },
            ],
          },
        ],
      },
      { path: 'admin', element: <BackOfficePage /> },
    ],
  },
  {
    path: 'tools',
    element: <ToolPageGroup />,
    children: [
      { path: '', element: <ToolPage /> },
      { path: 'scale', element: <ScaleToolPage /> },
    ],
  },
  {
    path: 'settings',
    element: <SettingPageGroup />,
    children: [
      {
        path: '',
        element: <SettingPage />,
        children: [
          visitDefault('farm'),
          { path: 'farm', element: <FarmSection /> },
          { path: 'invoices', element: <InvoiceSection /> },
          { path: 'advanced', element: <AdvancedSection /> },
        ],
      },
    ],
  },
  {
    path: 'about',
    element: <AboutPageGroup />,
    children: [
      {
        path: '',
        element: <AboutPage />,
        children: [
          visitDefault('app'),
          { path: 'app', element: <AppSection /> },
          { path: 'team', element: <TeamSection /> },
          { path: 'business', element: <BusinessSection /> },
        ],
      },
    ],
  },
]);
