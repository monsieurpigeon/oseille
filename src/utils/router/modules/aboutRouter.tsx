import { AboutPageGroup } from '../../../page-group/AboutPageGroup';
import { AboutPage } from '../../../page/about/AboutPage';
import { AppSection } from '../../../page/about/sections/app-section/AppSection';
import { BusinessSection } from '../../../page/about/sections/business-section/BusinessSection';
import { TeamSection } from '../../../page/about/sections/team-section/TeamSection';
import { visitDefault } from './common';

export const aboutRouter = {
  path: 'about',
  element: <AboutPageGroup />,
  children: [
    {
      path: '',
      element: <AboutPage />,
      children: [
        visitDefault('app'),
        { path: 'app', element: <AppSection /> },
        { path: 'team', element: <TeamSection /> },
        { path: 'business', element: <BusinessSection /> },
      ],
    },
  ],
};
