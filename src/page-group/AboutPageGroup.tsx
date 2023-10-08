import { Outlet } from 'react-router-dom';
import { InvoicingLayout } from '../component/layout/MainLayout';

const items = [
  { label: 'Application', emoji: '💡', path: 'app' },
  { label: 'Équipe', emoji: '🤓', path: 'team' },
  { label: 'Financement', emoji: '💸', path: 'business' },
];

export function AboutPageGroup() {
  return (
    <InvoicingLayout navItems={items}>
      <Outlet />
    </InvoicingLayout>
  );
}
