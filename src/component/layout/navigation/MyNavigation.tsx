import { NavLink } from 'react-router-dom';
import { Box, ListItem, UnorderedList } from '@chakra-ui/react';

const navBarItems = [
  { label: 'Produits', emoji: '🍓', path: 'product' },
  { label: 'Clients', emoji: '🤴', path: 'customer' },
  { label: 'Livraisons', emoji: '🧺', path: 'delivery' },
  { label: 'Factures', emoji: '🧲', path: 'invoice' },
  { label: 'Reglages', emoji: '🔧', path: 'settings' },
  { label: 'Contact', emoji: '🖋️', path: 'contact' },
];

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
