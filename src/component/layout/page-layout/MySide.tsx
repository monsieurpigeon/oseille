import { ReactNode } from 'react';
import { styled } from 'styled-components';

interface MySideProps {
  children: ReactNode;
}

const MyStyledSide = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

export function MySide({ children }: MySideProps) {
  return <MyStyledSide>{children}</MyStyledSide>;
}
