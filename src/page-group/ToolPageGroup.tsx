import { Outlet } from 'react-router-dom';
import { ToolingLayout } from '../component/layout/MainLayout';

export function ToolPageGroup() {
  return (
    <ToolingLayout>
      <Outlet />
    </ToolingLayout>
  );
}
