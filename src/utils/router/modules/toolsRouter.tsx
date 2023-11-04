import { ToolPageGroup } from '../../../page-group/ToolPageGroup';
import { ToolPage } from '../../../page/tools/ToolPage';
import { ScaleToolPage } from '../../../page/tools/scale/ScaleToolPage';

export const toolsRouter = {
  path: 'tools',
  element: <ToolPageGroup />,
  children: [
    { path: '', element: <ToolPage /> },
    { path: 'scale', element: <ScaleToolPage /> },
  ],
};
