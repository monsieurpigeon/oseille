import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

const navBarItems = [
  { label: 'Dashboard', emoji: '👍', path: '' },
  { label: 'Produits', emoji: '🍓', path: 'product' },
  { label: 'Clients', emoji: '🤴', path: 'customer' },
  { label: 'Tarifs', emoji: '🤠', path: 'prices' },
  { label: 'Livraisons', emoji: '🧺', path: 'delivery' },
  { label: 'Factures', emoji: '🧲', path: 'invoice' },
  { label: 'Réglages', emoji: '🔧', path: 'settings' },
  { label: 'Contact', emoji: '🖋️', path: 'contact' },
  { label: 'À propos', emoji: '🙋‍♂️', path: 'about' },
];

const StyledNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StyledNavItem = styled(NavLink)`
  padding: 15px;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    background-color: lightcyan;
  }

  &.active {
    background-color: lightcyan;
    border-right: 2px solid cyan;
  }
`;

export function Navigation() {
  return (
    <StyledNav>
      {navBarItems.map((item) => (
        <StyledNavItem
          key={item.path}
          to={item.path}
          className="navigation-item"
        >
          {item.emoji} {item.label}
        </StyledNavItem>
      ))}
    </StyledNav>
  );
}
