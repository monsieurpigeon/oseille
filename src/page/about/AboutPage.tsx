import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs } from '../../component/Tabs';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyH1 } from '../../component/typography/MyFont';

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
    <StyledAboutPage>
      <MyHeader>
        <MyH1>À propos</MyH1>
      </MyHeader>
      <Tabs items={ITEMS} />
      <Outlet />
    </StyledAboutPage>
  );
}
