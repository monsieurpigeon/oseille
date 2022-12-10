import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Box, ListItem, UnorderedList } from '@chakra-ui/react';

const navBarItems = [
  { label: 'Produits', emoji: '🍓', path: 'product' },
  { label: 'Clients', emoji: '🤴', path: 'customer' },
  { label: 'Livraisons', emoji: '🧺', path: 'delivery' },
  { label: 'Factures', emoji: '🧲', path: 'invoice' },
  { label: 'Reglages', emoji: '🔧', path: 'settings' },
  { label: 'Contact', emoji: '🖋️', path: 'contact' },
];

const StyledUl = styled.ul`
  margin-top: 30px;
  border-top: 2px solid lightgrey;
  border-bottom: 2px solid darkgrey;

  li {
    background: grey;
  }
`;

const StyledLink = styled(NavLink)`
  padding: 20px;
  font-size: 1em;
  display: block;
  width: 100%;
  text-shadow: rgba(0, 0, 0, 0.3) -3px 3px 5px;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  font-weight: bold;

  &:hover {
    text-shadow: white 0 0 10px;
  }

  &.active {
    background-color: darkgray;
    text-shadow: white 0 0 10px;
    color: white;
    border-top: 2px solid magenta;
    border-bottom: 2px solid aqua;
  }
`;

export function MyNavigation() {
  return (
    <Box>
      <UnorderedList styleType="none">
        {navBarItems.map((item) => (
          <ListItem key={item.path}>
            <NavLink to={item.path}>
              {item.emoji} {item.label}
            </NavLink>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}
