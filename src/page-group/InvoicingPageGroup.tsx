import { Outlet } from 'react-router-dom';
import { InvoicingLayout } from '../component/layout/MainLayout';

const items = [
  { label: 'Dashboard', emoji: '🌊', path: 'dashboard' },
  { label: 'Produits', emoji: '🥦', path: 'product' },
  { label: 'Clients', emoji: '🤴', path: 'customer' },
  { label: 'Tarifs', emoji: '💎', path: 'prices' },
  { label: 'Commandes', emoji: '🗒️', path: 'order' },
  { label: 'Livraisons', emoji: '🧺', path: 'delivery' },
  { label: 'Factures', emoji: '💌', path: 'invoice' },
];

export function InvoicingPageGroup() {
  return (
    <InvoicingLayout navItems={items}>
      <Outlet />
    </InvoicingLayout>
  );
}
