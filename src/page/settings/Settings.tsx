import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { FarmInput, store } from '../../backend';
import { Tabs } from '../../component/Tabs';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyH1 } from '../../component/typography/MyFont';
import { DEFAULT_INVOICE_DELAY, DEFAULT_THREAT } from '../../utils/defaults';
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
  invoiceDelay: DEFAULT_INVOICE_DELAY,
  threat: DEFAULT_THREAT,
};

const StyledSettingPages = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 0px;
  gap: 20px;
`;

const ITEMS = [
  { to: 'farm', label: 'Ferme', component: <FarmSection /> },
  { to: 'invoices', label: 'Facturation', component: <InvoiceSection /> },
  { to: 'advanced', label: 'Avancé', component: <AdvancedSection /> },
];

export function Settings() {
  const snap = useSnapshot(store);

  return (
    <StyledSettingPages>
      <MyHeader>
        <MyH1>Réglages</MyH1>
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
    </StyledSettingPages>
  );
}
