import { useEffect } from 'react';
import { Outlet, useRevalidator } from 'react-router-dom';
import { relDb } from '../backend';
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
  const revalidator = useRevalidator();

  useEffect(() => {
    const observer = relDb.changes({ since: 'now', live: true }).on('change', (e) => {
      console.log('change', e);
      revalidator.revalidate();
    });
    return () => observer.cancel();
  }, []);

  return (
    <InvoicingLayout navItems={items}>
      <Outlet />
    </InvoicingLayout>
  );
}
