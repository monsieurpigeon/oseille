import { Button, Flex } from '@chakra-ui/react';
import { NavLink as ReactRouterLink } from 'react-router-dom';

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
        <Button
          as={ReactRouterLink}
          key={item.path}
          to={item.path}
          _activeLink={{ backgroundColor: 'aqua' }}
        >
          {item.label}
        </Button>
      ))}
    </Flex>
  );
}

interface InvoicingNavigationProps {
  items: { label: string; emoji: string; path: string }[];
}

export function InvoicingNavigation({ items }: InvoicingNavigationProps) {
  return (
    <Flex
      direction="column"
      gap="2px"
    >
      {items.map((item) => (
        <Button
          leftIcon={item.emoji}
          as={ReactRouterLink}
          key={item.path}
          to={item.path}
          _activeLink={{ backgroundColor: 'aqua' }}
          style={{ justifyContent: 'flex-start' }}
        >
          {item.label}
        </Button>
      ))}
    </Flex>
  );
}
