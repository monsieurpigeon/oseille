import { Outlet } from 'react-router-dom';
import { InvoicingLayout } from '../component/layout/MainLayout';

export function InvoicingPageGroup() {
  return (
    <InvoicingLayout>
      <Outlet />
    </InvoicingLayout>
  );
}
