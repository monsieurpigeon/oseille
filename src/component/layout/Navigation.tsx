import { NavLink } from 'react-router-dom';

const navBarItems = [
  { label: 'Produits', emoji: '🍓', path: 'product' },
  { label: 'Clients', emoji: '🤴', path: 'customer' },
  { label: 'Tarifs', emoji: '🤠', path: 'prices' },
  { label: 'Livraisons', emoji: '🧺', path: 'delivery' },
  { label: 'Factures', emoji: '🧲', path: 'invoice' },
  { label: 'Réglages', emoji: '🔧', path: 'settings' },
  { label: 'Contact', emoji: '🖋️', path: 'contact' },
];

export function Navigation() {
  return (
    <div className="navigation-list">
      {navBarItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className="navigation-item"
        >
          {item.emoji} {item.label}
        </NavLink>
      ))}
    </div>
  );
}
