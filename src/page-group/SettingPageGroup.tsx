import { Outlet } from 'react-router-dom';
import { ToolingLayout } from '../component/layout/MainLayout';

export function SettingPageGroup() {
  return (
    <ToolingLayout>
      <Outlet />
    </ToolingLayout>
  );
}
