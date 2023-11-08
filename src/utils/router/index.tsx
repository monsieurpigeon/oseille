import { Navigate, createBrowserRouter } from 'react-router-dom';
import { FARM_KEY, relDb } from '../../backend';
import { MasterLayout } from '../../component/layout/MasterLayout';
import { DEFAULT_INVOICE_DELAY } from '../defaults';
import { aboutRouter } from './modules/aboutRouter';
import { visitDefault } from './modules/common';
import { invoicingRouter } from './modules/invoicingRouter';
import { settingsRouter } from './modules/settingsRouter';
import { toolsRouter } from './modules/toolsRouter';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MasterLayout />,
    id: 'farm',
    errorElement: (
      <Navigate
        to="/"
        replace={true}
      />
    ),
    loader: async () =>
      relDb.rel.find('farm', FARM_KEY).then((doc) => {
        const farm = doc.farms[0];
        const isTVA = farm?.isTVA === 'oui';
        const logo = farm?._attachements?.logo?.data;
        const invoiceDelay = farm?.invoiceDelay ?? DEFAULT_INVOICE_DELAY;
        return { farm, logo, isTVA, invoiceDelay };
      }),
    children: [visitDefault('invoicing'), invoicingRouter, toolsRouter, settingsRouter, aboutRouter],
  },
]);
