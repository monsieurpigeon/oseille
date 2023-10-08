import { Outlet } from 'react-router-dom';
import { InvoicingLayout } from '../component/layout/MainLayout';

const items = [
  { label: 'Ferme', emoji: '🏰', path: 'farm' },
  { label: 'Facturation', emoji: '📑', path: 'invoices' },
  { label: 'Avancé', emoji: '🔬', path: 'advanced' },
];

export function SettingPageGroup() {
  return (
    <InvoicingLayout navItems={items}>
      <Outlet />
    </InvoicingLayout>
  );
}
