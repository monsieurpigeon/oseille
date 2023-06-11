import { ReactNode } from 'react';
import { styled } from 'styled-components';

interface MyHeaderProps {
  children: ReactNode;
}

const MyStyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export function MyHeader({ children }: MyHeaderProps) {
  return <MyStyledHeader>{children}</MyStyledHeader>;
}
