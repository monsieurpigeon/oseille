import { ReactNode } from 'react';
import styled from 'styled-components';

interface ListItemProps {
  children: ReactNode;
  onClick: () => void;
  isSelected: boolean;
  checkable?: boolean;
  checked?: boolean;
  onCheck?: () => void;
}

const StyledListItem = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  background-color: lightyellow;
  justify-content: space-between;
  border: 1px solid yellow;
  padding: 10px;
  border-radius: 5px;
  user-select: none;
  cursor: pointer;

  &:hover {
    border: 1px dashed black;
  }

  &.selected {
    background-color: lightcyan;
    border: 1px solid cyan;
    &:hover {
      background-color: lightcyan;
      border: 1px dashed cyan;
    }
  }
`;

const StyledBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;

  input {
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-right: 20px;
  }
`;

export function ListItem({ onClick, children, isSelected, checkable, checked, onCheck }: ListItemProps) {
  return (
    <StyledBlock>
      <StyledListItem
        className={isSelected ? 'selected' : ''}
        onClick={onClick}
      >
        {children}
      </StyledListItem>
      {checkable && (
        <input
          type="checkbox"
          // rome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
          checked={checked}
          onChange={onCheck}
        />
      )}
    </StyledBlock>
  );
}
