import { ReactNode } from 'react';
import { styled } from 'styled-components';

interface MyScrollListProps {
  children: ReactNode;
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

export function MyScrollList({ children }: MyScrollListProps) {
  return <MyStyledScrollList>{children}</MyStyledScrollList>;
}
