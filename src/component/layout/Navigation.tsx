import { Flex } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

const navBarItems = [
  { label: 'Dashboard', emoji: '👍', path: '' },
  { label: 'Produits', emoji: '🍓', path: 'product' },
  { label: 'Clients', emoji: '🤴', path: 'customer' },
  { label: 'Tarifs', emoji: '🤠', path: 'prices' },
  { label: 'Commandes', emoji: '🗒️', path: 'order' },
  { label: 'Livraisons', emoji: '🧺', path: 'delivery' },
  { label: 'Factures', emoji: '🧲', path: 'invoice' },
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

const StyledHeaderNavigationItem = styled(NavLink)`
  background-color: lightcyan;
  border-width: 4px 0px;
  border-color: transparent;
  border-radius: 8px;
  padding: 2px 8px;
  &.active {
    border-color: cyan;
  }
`;

const HEADER_ITEMS = [
  { label: 'Facturation', path: '/invoicing' },
  //{ label: 'Outils', path: '/tools' },
  { label: 'Réglages', path: '/settings' },
  { label: 'À propos', path: '/about' },
];

export function HeaderNavigation() {
  return (
    <Flex gap={4}>
      {HEADER_ITEMS.map((item) => (
        <StyledHeaderNavigationItem
          key={item.path}
          to={item.path}
        >
          {item.label}
        </StyledHeaderNavigationItem>
      ))}
    </Flex>
  );
}

export function InvoicingNavigation() {
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
