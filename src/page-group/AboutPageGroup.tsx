import { Outlet } from 'react-router-dom';
import { ToolingLayout } from '../component/layout/MainLayout';

export function AboutPageGroup() {
  return (
    <ToolingLayout>
      <Outlet />
    </ToolingLayout>
  );
}
