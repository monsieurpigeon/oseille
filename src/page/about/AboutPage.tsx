import { Container } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const StyledAboutPage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 0px;
  gap: 20px;
  height: 100%;
`;

const ITEMS = [
  { to: 'app', label: 'Application' },
  { to: 'team', label: 'Équipe' },
  { to: 'business', label: 'Financement' },
];

export function AboutPage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('about_page_viewed');
  }, []);

  return (
    <Container
      maxW="container.xl"
      height="100%"
    >
      <StyledAboutPage>
        <Outlet />
      </StyledAboutPage>
    </Container>
  );
}
