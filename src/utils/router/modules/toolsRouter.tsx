import { ToolPageGroup } from '../../../page-group/ToolPageGroup';
import { ScaleToolPage } from '../../../page/tools/scale/ScaleToolPage';
import { ToolPage } from '../../../page/tools/ToolPage';

export const toolsRouter = {
  path: 'tools',
  element: <ToolPageGroup />,
  children: [
    { path: '', element: <ToolPage /> },
    { path: 'scale', element: <ScaleToolPage /> },
  ],
};
