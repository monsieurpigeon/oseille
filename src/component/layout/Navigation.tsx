import { Box, ListItem, UnorderedList } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const navBarItems = [
  { label: 'Produits', emoji: '🍓', path: 'product' },
  { label: 'Clients', emoji: '🤴', path: 'customer' },
  { label: 'Livraisons', emoji: '🧺', path: 'delivery' },
  { label: 'Factures', emoji: '🧲', path: 'invoice' },
  { label: 'Reglages', emoji: '🔧', path: 'settings' },
  { label: 'Contact', emoji: '🖋️', path: 'contact' },
];

export function Navigation() {
  return (
    <Box
      position="sticky"
      top="100px"
    >
      <UnorderedList styleType="none">
        {navBarItems.map((item) => (
          <ListItem
            key={item.path}
            p={4}
            fontSize={20}
            fontWeight="bold"
          >
            <NavLink to={item.path}>
              {item.emoji} {item.label}
            </NavLink>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
}
