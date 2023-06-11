import { Children, ReactNode } from 'react';
import { styled } from 'styled-components';

interface ListItemGroupProps {
  children: ReactNode;
  title: string;
  action?: ReactNode;
}

const StyledListItemGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledListItemGroupTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export function ListItemGroup({ children, title, action }: ListItemGroupProps) {
  const arrayChildren = Children.toArray(children);

  return (
    <StyledListItemGroup>
      <StyledListItemGroupTitle>
        <div className="bold">{title}</div>
        {action}
      </StyledListItemGroupTitle>
      {arrayChildren.length === 0 ? <div className="faded">Rien pour le moment</div> : children}
    </StyledListItemGroup>
  );
}
