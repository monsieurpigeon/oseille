import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface Item {
  label: string;
  to: string;
}

const StyledNavigation = styled.div`
  display: flex;
  gap: 20px;
  font-size: 1.2rem;

  .active {
    border-bottom: 2px solid var(--chakra-colors-blue-500);
  }
`;

export function Tabs({ items }: { items: Item[] }) {
  return (
    <StyledNavigation>
      {items.map((item) => (
        <NavLink
          to={item.to}
          key={item.label}
        >
          {item.label}
        </NavLink>
      ))}
    </StyledNavigation>
  );
}
