import { ReactNode } from 'react';
import styled from 'styled-components';
import { MyFooter } from './footer/MyFooter';
import { MyHeader } from './header/MyHeader';
import { MyNavigation } from './navigation/MyNavigation';

const StyledContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledContent = styled.div`
  display: flex;
  flex-grow: 20;
  background-color: silver;
`;

const StyledScreen = styled.main`
  flex-grow: 1;
  background-color: white;
  border-radius: 20px 0 0 20px;
  box-shadow: -6px -6px 10px 0 rgba(0, 0, 0, 0.2);
`;

export function MyMainLayout({ children }: { children: ReactNode }) {
  return (
    <StyledContainer>
      <StyledPage>
        <MyHeader />
        <StyledContent>
          <MyNavigation />
          <StyledScreen>{children}</StyledScreen>
        </StyledContent>
        <MyFooter />
      </StyledPage>
    </StyledContainer>
  );
}
