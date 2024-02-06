import { Container, Flex } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

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
      <Flex
        direction="column"
        p="20px"
        paddingTop="0px"
        gap="20px"
        height="100%"
      >
        <Outlet />
      </Flex>
    </Container>
  );
}
