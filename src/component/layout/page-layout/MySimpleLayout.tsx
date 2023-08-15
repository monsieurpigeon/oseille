import { ReactNode } from 'react';
import styled from 'styled-components';

interface MySimpleLayoutProps {
  children: ReactNode;
}

const StyledMySimpleLayout = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export function MySimpleLayout({ children }: MySimpleLayoutProps) {
  return <StyledMySimpleLayout>{children}</StyledMySimpleLayout>;
}
