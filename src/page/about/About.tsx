import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs } from '../../component/Tabs';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyH1 } from '../../component/typography/MyFont';
import { AppSection } from './sections/app-section/AppSection';
import { BusinessSection } from './sections/business-section/BusinessSection';
import { TeamSection } from './sections/team-section/TeamSection';

const StyledAboutPage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 0px;
  gap: 20px;
  height: 100%;
`;

const ITEMS = [
  { to: 'app', label: 'Application', component: <AppSection /> },
  { to: 'team', label: 'Équipe', component: <TeamSection /> },
  { to: 'business', label: 'Finances', component: <BusinessSection /> },
];

export function About() {
  return (
    <StyledAboutPage>
      <MyHeader>
        <MyH1>À propos</MyH1>
      </MyHeader>
      <Tabs items={ITEMS} />
      <Routes>
        {ITEMS.map((item) => (
          <Route
            path={item.to}
            element={item.component}
            key={item.label}
          />
        ))}
        <Route
          path="*"
          element={
            <Navigate
              to={ITEMS[0].to}
              replace
            />
          }
        />
      </Routes>
    </StyledAboutPage>
  );
}
