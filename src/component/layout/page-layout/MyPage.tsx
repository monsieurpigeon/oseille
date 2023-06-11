import { ReactNode } from 'react';
import { styled } from 'styled-components';

interface MyPageProps {
  children: ReactNode;
}

const MyStyledPage = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  height: 100%;
  width: 100%;
  user-select: none;
`;

export function MyPage({ children }: MyPageProps) {
  return <MyStyledPage>{children}</MyStyledPage>;
}
