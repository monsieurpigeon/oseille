import { Box, ListItem, UnorderedList } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const navBarItems = [
  { label: 'Produits', emoji: '๐', path: 'product' },
  { label: 'Clients', emoji: '๐คด', path: 'customer' },
  { label: 'Livraisons', emoji: '๐งบ', path: 'delivery' },
  { label: 'Factures', emoji: '๐งฒ', path: 'invoice' },
  { label: 'Reglages', emoji: '๐ง', path: 'settings' },
  { label: 'Contact', emoji: '๐๏ธ', path: 'contact' },
];

export function MyNavigation() {
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
