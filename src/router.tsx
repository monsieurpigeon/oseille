import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { Customer, Delivery, FARM_KEY, Invoice, Product, relDb } from './backend';
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
import { DEFAULT_INVOICE_DELAY } from './utils/defaults';

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
      <div>
        <Outlet />
      </div>
    ),
    id: 'farm',
    loader: async () =>
      relDb.rel.find('farm', FARM_KEY).then((doc) => {
        const farm = doc.farms[0];
        const isTVA = farm?.isTVA === 'oui';
        const logo = farm?._attachements?.logo?.data;
        const invoiceDelay = farm?.invoiceDelay ?? DEFAULT_INVOICE_DELAY;
        return { farm, logo, isTVA, invoiceDelay };
      }),
    children: [
      visitDefault('invoicing'),
      {
        path: 'invoicing',
        element: <InvoicingPageGroup />,

        children: [
          visitDefault('dashboard'),
          {
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
          },
          {
            path: 'product',
            id: 'products',
            element: <ProductPage />,
            loader: async () =>
              relDb.rel
                .find('product')
                .then((doc) => doc.products.sort((a: Product, b: Product) => a.name.localeCompare(b.name))),
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
                .find('customerSummary')
                .then((doc) => doc.customerSummaries.sort((a: Customer, b: Customer) => a.name.localeCompare(b.name))),
            children: [
              { index: true, element: <CustomerAll /> },
              { path: 'create', element: <CustomerCreateModal /> },
              {
                path: ':id',
                element: <CustomerDetail />,
                id: 'customer',
                loader: async ({ params }) =>
                  relDb.rel.find('customer', params.id).then((doc) => ({
                    ...doc,
                    deliveries: doc.deliveries.sort((a: any, b: any) => b.documentId.localeCompare(a.documentId)),
                    invoices: doc.invoices.sort((a: any, b: any) => b.documentId.localeCompare(a.documentId)),
                  })),
                children: [{ path: 'edit', element: <CustomerEditModal /> }],
              },
            ],
          },
          {
            path: 'prices',
            element: <PricePage />,
            loader: async () => {
              const priceResult = relDb.rel.find('price');
              const productResult = relDb.rel.find('product');
              const customerResult = relDb.rel.find('customer');
              return Promise.all([priceResult, productResult, customerResult]).then((results) => {
                const prices = results[0].prices;
                const products = results[1].products.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
                const customers = results[2].customers.sort((a: Customer, b: Customer) => a.name.localeCompare(b.name));
                return { prices, products, customers };
              });
            },
          },
          {
            path: 'order',
            element: <OrderPage />,
            id: 'orders',
            loader: async () =>
              relDb.rel.find('delivery').then((doc) => ({
                ...doc,
                deliveries: doc.deliveries.sort((a: Delivery, b: Delivery) => b.documentId.localeCompare(a.documentId)), // sort and filter should stay here
                customers: doc.customerSummaries.sort((a: any, b: any) => a.name.localeCompare(b.name)),
                timestamp: new Date().getTime(), // TODO necessary ?
              })),
            children: [
              { index: true, element: <OrderAll /> },
              {
                path: 'create',
                element: <DeliveryCreateModal />,
                loader: async () => {
                  const priceResult = relDb.rel.find('price');
                  const productResult = relDb.rel.find('product');
                  const customerResult = relDb.rel.find('customer');
                  return Promise.all([priceResult, productResult, customerResult]).then((results) => {
                    const prices = results[0].prices;
                    const products = results[1].products.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
                    const customers = results[2].customers.sort((a: Customer, b: Customer) =>
                      a.name.localeCompare(b.name),
                    );
                    return { prices, products, customers };
                  });
                },
              },
              {
                path: ':id',
                element: <DeliveryDetail />,
                id: 'order',
                loader: async ({ params }) => relDb.rel.find('delivery', params.id),
                children: [
                  {
                    path: 'edit',
                    element: <DeliveryEditModal />,
                    loader: async () => {
                      const priceResult = relDb.rel.find('price');
                      const productResult = relDb.rel.find('product');
                      const customerResult = relDb.rel.find('customer');
                      return Promise.all([priceResult, productResult, customerResult]).then((results) => {
                        const prices = results[0].prices;
                        const products = results[1].products.sort((a: Product, b: Product) =>
                          a.name.localeCompare(b.name),
                        );
                        const customers = results[2].customers.sort((a: Customer, b: Customer) =>
                          a.name.localeCompare(b.name),
                        );
                        return { prices, products, customers };
                      });
                    },
                  },
                ],
              },
            ],
          },
          {
            path: 'delivery',
            element: <DeliveryPage />,
            id: 'deliveries',
            loader: async () =>
              relDb.rel.find('delivery').then((doc) => ({
                ...doc,
                deliveries: doc.deliveries.sort((a: Delivery, b: Delivery) => b.documentId.localeCompare(a.documentId)), // sort and filter should stay here
                customers: doc.customerSummaries.sort((a: any, b: any) => a.name.localeCompare(b.name)),
                timestamp: new Date().getTime(),
              })),
            children: [
              { index: true, element: <DeliveryAll /> },
              {
                path: 'create',
                element: <DeliveryCreateModal />,
                loader: async () => {
                  const priceResult = relDb.rel.find('price');
                  const productResult = relDb.rel.find('product');
                  const customerResult = relDb.rel.find('customer');
                  return Promise.all([priceResult, productResult, customerResult]).then((results) => {
                    const prices = results[0].prices;
                    const products = results[1].products.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
                    const customers = results[2].customers.sort((a: Customer, b: Customer) =>
                      a.name.localeCompare(b.name),
                    );
                    return { prices, products, customers };
                  });
                },
              },
              {
                path: ':id',
                element: <DeliveryDetail />,
                id: 'delivery',
                loader: async ({ params }) => relDb.rel.find('delivery', params.id),
                children: [
                  {
                    path: 'edit',
                    element: <DeliveryEditModal />,
                    loader: async () => {
                      const priceResult = relDb.rel.find('price');
                      const productResult = relDb.rel.find('product');
                      const customerResult = relDb.rel.find('customer');
                      return Promise.all([priceResult, productResult, customerResult]).then((results) => {
                        const prices = results[0].prices;
                        const products = results[1].products.sort((a: Product, b: Product) =>
                          a.name.localeCompare(b.name),
                        );
                        const customers = results[2].customers.sort((a: Customer, b: Customer) =>
                          a.name.localeCompare(b.name),
                        );
                        return { prices, products, customers };
                      });
                    },
                  },
                ],
              },
            ],
          },
          {
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
                invoices: doc.invoices.sort((a: Invoice, b: Invoice) => b.documentId.localeCompare(a.documentId)),
                customerSummaries: doc.customerSummaries.sort((a: Customer, b: Customer) =>
                  a.name.localeCompare(b.name),
                ),
              }));
            },
            children: [
              { index: true, element: <InvoiceAll /> },
              {
                path: ':id',
                element: <InvoiceDetail />,
                id: 'invoice',
                loader: async ({ params }) => relDb.rel.find('invoice', params.id),
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
    ],
  },
]);
