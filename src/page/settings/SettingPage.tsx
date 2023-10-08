import { Container } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';

const StyledSettingPages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 0px;
  gap: 20px;
`;

export function SettingPage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('setting_page_viewed');
  }, []);
  const snap = useSnapshot(store);

  return (
    <Container maxW="container.xl">
      <StyledSettingPages>
        <Outlet />
      </StyledSettingPages>
    </Container>
  );
}
