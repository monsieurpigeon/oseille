import { Children, ReactNode } from 'react';
import { styled } from 'styled-components';

interface MyScrollListProps {
  children: ReactNode;
  empty?: { title: string; onClick: () => void };
}

const MyStyledScrollList = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 0;
  overflow-y: auto;
  margin-top: 20px;
`;

const StyledEmpty = styled.div`
  padding: 10px;
  font-size: 1.2rem;
  text-align: center;
  border: 2px solid var(--chakra-colors-blue-200);
  border-radius: 10px;
  margin-top: 30px;
  cursor: pointer;
  background-color: var(--chakra-colors-blue-50);
  &:hover {
    transition: 0.2s all ease-in-out;
    border: 2px solid var(--chakra-colors-blue-400);
  }
`;

export function MyScrollList({ children, empty }: MyScrollListProps) {
  const isEmpty = Children.count(children) === 0;

  return isEmpty && empty != null ? (
    <StyledEmpty onClick={empty.onClick}>{empty.title}</StyledEmpty>
  ) : (
    <MyStyledScrollList>{children}</MyStyledScrollList>
  );
}

MyScrollList.Empty = StyledEmpty;
