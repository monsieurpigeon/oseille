import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { z } from 'zod';
import { FarmInput, store } from '../../backend';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyH1 } from '../../component/typography/MyFont';
import { AdvancedSection } from './sections/advanced-section/AdvancedSection';
import { FarmSection } from './sections/farm-section/FarmSection';
import { InvoiceSection } from './sections/invoice-section/InvoiceSection';

export const EMPTY_FARM: FarmInput = {
  title: '',
  address1: '',
  address2: '',
  zip: '',
  city: '',
  phone: '',
  email: '',
  footer: '',
  rib: '',
  iban: '',
  bic: '',
  siret: '',
  naf: '',
  tva: '',
  isTVA: 'non',
  bioLabel: 'non',
};

export const farmSchema = z.object({
  title: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string(),
  zip: z.string().min(1),
  city: z.string().min(1),
  footer: z.string(),
  isTVA: z.string(),
  bioLabel: z.string(),
});

export const documentsSchema = z.object({
  invoiceId: z.number().gte(0),
  deliveryId: z.number().gte(0),
});

const StyledNavigation = styled.nav`
  display: flex;
  gap: 20px;
  font-size: 1.2rem;

  .active {
    border-bottom: 2px solid var(--chakra-colors-blue-500);
  }
`;

const StyledSettingPages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 0px;
  gap: 20px;
`;

export function Settings() {
  const snap = useSnapshot(store);

  return (
    <StyledSettingPages>
      <MyHeader>
        <MyH1>Réglages</MyH1>
      </MyHeader>
      <StyledNavigation>
        <NavLink to="farm">Ferme</NavLink>
        <NavLink to="invoices">Facturation</NavLink>
        <NavLink to="advanced">Avancé</NavLink>
      </StyledNavigation>
      <Routes>
        <Route
          path="farm"
          element={<FarmSection />}
        />
        <Route
          path="invoices"
          element={<InvoiceSection />}
        />
        <Route
          path="advanced"
          element={<AdvancedSection />}
        />
        <Route
          path="*"
          element={
            <Navigate
              to="farm"
              replace
            />
          }
        />
      </Routes>
    </StyledSettingPages>
  );
}
