import { Container } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export function SettingPage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('setting_page_viewed');
  }, []);

  return (
    <Container maxW="container.xl">
      <Outlet />
    </Container>
  );
}
