import { Params } from 'react-router-dom';
import { Customer, relDb } from '../../../../backend';
import { CustomerAll } from '../../../../page/customer/CustomerAll';
import { CustomerPage } from '../../../../page/customer/CustomerPage';
import { CustomerDetail } from '../../../../page/customer/detail/CustomerDetail';
import { CustomerCreateModal } from '../../../../page/customer/modal/CustomerCreateModal';
import { CustomerEditModal } from '../../../../page/customer/modal/CustomerEditModal';

export const customerRouter = {
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
      id: 'customer',
      loader: async ({ params }: { params: Params<string> }) =>
        relDb.rel.find('customer', params.id).then((doc) => ({
          ...doc,
          customers: doc.customers,
          deliveries: doc.deliveries.sort((a: any, b: any) => b.documentId.localeCompare(a.documentId)),
          invoices: doc.invoices.sort((a: any, b: any) => b.documentId.localeCompare(a.documentId)),
        })),
      children: [{ path: 'edit', element: <CustomerEditModal /> }],
    },
  ],
};
