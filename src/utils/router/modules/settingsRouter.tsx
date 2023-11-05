import { SettingPageGroup } from '../../../page-group/SettingPageGroup';
import { SettingPage } from '../../../page/settings/SettingPage';
import { AdvancedSection } from '../../../page/settings/sections/advanced-section/AdvancedSection';
import { FarmSection } from '../../../page/settings/sections/farm-section/FarmSection';
import { InvoiceSection } from '../../../page/settings/sections/invoice-section/InvoiceSection';
import { visitDefault } from './common';

export const settingsRouter = {
  path: 'settings',
  element: <SettingPageGroup />,
  children: [
    {
      path: '',
      element: <SettingPage />,
      children: [
        visitDefault('farm'),
        { path: 'farm', element: <FarmSection /> },
        { path: 'invoices', element: <InvoiceSection /> },
        { path: 'advanced', element: <AdvancedSection /> },
      ],
    },
  ],
};
