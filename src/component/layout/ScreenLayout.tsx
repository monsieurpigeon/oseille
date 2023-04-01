import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

export function ScreenLayout({ children }: { children: ReactNode }) {
  return <Box paddingRight={10}>{children}</Box>;
}
