import { Params } from 'react-router-dom';
import { Customer, Delivery, Product, relDb } from '../../../../backend';
import { DeliveryDetail } from '../../../../page/delivery/DeliveryDetail';
import { OrderAll } from '../../../../page/delivery/OrderAll';
import { OrderPage } from '../../../../page/delivery/OrderPage';
import { DeliveryCreateModal } from '../../../../page/delivery/modal/DeliveryCreateModal';
import { DeliveryEditModal } from '../../../../page/delivery/modal/DeliveryEditModal';

export const orderRouter = {
  path: 'order',
  element: <OrderPage />,
  id: 'orders',
  loader: async () =>
    relDb.rel.find('delivery').then((doc) => ({
      ...doc,
      deliveries: doc.deliveries?.sort((a: Delivery, b: Delivery) => b.documentId.localeCompare(a.documentId)) || [], // sort and filter should stay here
      customers: doc.Icustomers?.sort((a: any, b: any) => a.name.localeCompare(b.name)) || [],
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
          const customers = results[2].customers.sort((a: Customer, b: Customer) => a.name.localeCompare(b.name));
          return { prices, products, customers };
        });
      },
    },
    {
      path: ':id',
      element: <DeliveryDetail />,
      id: 'order',
      loader: async ({ params }: { params: Params<string> }) =>
        relDb.rel
          .find('delivery', params.id)
          .then((doc) => ({ ...doc, customers: doc.Icustomers, invoices: doc.Iinvoices || [] })),
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
              const products = results[1].products.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
              const customers = results[2].customers.sort((a: Customer, b: Customer) => a.name.localeCompare(b.name));
              return { prices, products, customers };
            });
          },
        },
      ],
    },
  ],
};
