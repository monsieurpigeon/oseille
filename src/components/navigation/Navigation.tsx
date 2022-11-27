import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import styled from 'styled-components';
import { Contact } from '../../pages/contact/Contact';
import { Contracts } from '../../pages/contracts/Contracts';
import { Customers } from '../../pages/customers/Customers';
import { Home } from '../../pages/home/Home';
import { Products } from '../../pages/products/Products';
import { Profile } from '../../pages/profile/Profile';

const navBarItems = [
  { label: 'Produits', emoji: '🥬', path: '/products', component: Products },
  { label: 'Clients', emoji: '🤴', path: '/customers', component: Customers },
  { label: 'Contrats', emoji: '🖋', path: '/contracts', component: Contracts },
  { label: 'Contact', emoji: '✉️', path: '/contact', component: Contact },
];

export const navItems = [
  ...navBarItems,
  { label: 'Accueil', emoji: '😌', path: '/', component: Home },
  { label: 'Profil', emoji: '👩🏼‍🌾', path: '/profile', component: Profile },
];

const StyledNav = styled.nav`
  background-color: silver;
`;

const StyledUl = styled.ul`
  padding: 10px;
`;

export function Navigation() {
  return (
    <StyledNav>
      <StyledUl>
        {navBarItems.map((item) => (
          <CustomLink
            key={item.path}
            to={item.path}
          >
            {item.emoji} {item.label}
          </CustomLink>
        ))}
      </StyledUl>
    </StyledNav>
  );
}

const StyledLi = styled.li<{ isActive: boolean }>`
  ${({ isActive }) => (isActive ? 'background-color:aqua' : '')}
`;

function CustomLink({ to, children, ...props }: any) {
  const resolvedPath = useResolvedPath(to);
  const isActive = !!useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <StyledLi isActive={isActive}>
      <Link
        to={to}
        {...props}
      >
        {children}
      </Link>
    </StyledLi>
  );
}
