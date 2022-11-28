import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Contact } from '../../pages/contact/Contact';

const navBarItems = [
  { label: 'Produits', emoji: '🥬', path: 'products' },
  { label: 'Clients', emoji: '🤴', path: 'customers' },
  { label: 'Contrats', emoji: '🖋', path: 'contracts' },
  { label: 'Contact', emoji: '✉️', path: 'contact' },
];

const StyledNav = styled.nav`
  background-color: silver;
`;

const StyledUl = styled.ul`
  padding: 10px;
`;

const StyledLink = styled(NavLink)`
  &.active {
    background-color: aqua;
  }
`;

export function Navigation() {
  return (
    <StyledNav>
      <StyledUl>
        {navBarItems.map((item) => (
          <li key={item.path}>
            <StyledLink

              to={item.path}
            >
              {item.emoji} {item.label}
            </StyledLink>
          </li>

        ))}
      </StyledUl>
    </StyledNav>
  );
}
