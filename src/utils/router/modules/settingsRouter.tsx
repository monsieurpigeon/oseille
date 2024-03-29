import { FarmAddressModal } from '../../../component/modal/FarmAddressModal';
import { FarmBankModal } from '../../../component/modal/FarmBankModal';
import { FarmCompanyModal } from '../../../component/modal/FarmCompanyModal';
import { FarmCountryModal } from '../../../component/modal/FarmCountryModal';
import { FarmDocumentIdModal } from '../../../component/modal/FarmDocumentIdModal';
import { FarmInvoicingModal } from '../../../component/modal/FarmInvoicingModal';
import { FarmLogoModal } from '../../../component/modal/FarmLogoModal';
import { FarmPracticeModal } from '../../../component/modal/FarmPracticeModal';
import { SettingPageGroup } from '../../../page-group/SettingPageGroup';
import { AdvancedSection } from '../../../page/settings/sections/advanced-section/AdvancedSection';
import { FarmSection } from '../../../page/settings/sections/farm-section/FarmSection';
import { InvoiceSection } from '../../../page/settings/sections/invoice-section/InvoiceSection';
import { SettingPage } from '../../../page/settings/SettingPage';
import { visitDefault } from './common';

export const settingsRouter = {
  path: 'settings',
  element: <SettingPageGroup />,
  children: [
    visitDefault('farm'),
    {
      path: '',
      element: <SettingPage />,
      children: [
        {
          path: 'farm',
          element: <FarmSection />,
          children: [
            { path: 'country', element: <FarmCountryModal /> },
            { path: 'address', element: <FarmAddressModal /> },
            { path: 'logo', element: <FarmLogoModal /> },
            { path: 'practices', element: <FarmPracticeModal /> },
          ],
        },
        {
          path: 'invoices',
          element: <InvoiceSection />,
          children: [
            { path: 'bank', element: <FarmBankModal /> },
            { path: 'company', element: <FarmCompanyModal /> },
            { path: 'invoices', element: <FarmInvoicingModal /> },
          ],
        },
        {
          path: 'advanced',
          element: <AdvancedSection />,
          children: [{ path: 'documents', element: <FarmDocumentIdModal /> }],
        },
      ],
    },
  ],
};
