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
  .link {
    padding: 4px 8px;
    border-radius: 4px;
    box-shadow: 0 0 0 1px var(--chakra-colors-gray-200);
  }
  .link:hover:not(.active) {
    transition: all 0.2s ease-in-out;
    box-shadow: 0 10px 10px 1px var(--chakra-colors-gray-200);
  }

  .active {
    box-shadow: 0 10px 5px 1px var(--chakra-colors-gray-200);
    border-bottom: 2px solid var(--chakra-colors-blue-500);
    background: linear-gradient(to bottom, var(--chakra-colors-blue-500), var(--chakra-colors-blue-100) 10%, white 40%);
  }
`;

export function Tabs({ items }: { items: Item[] }) {
  return (
    <StyledNavigation>
      {items.map((item) => (
        <NavLink
          className="link"
          to={item.to}
          key={item.label}
        >
          {item.label}
        </NavLink>
      ))}
    </StyledNavigation>
  );
}
