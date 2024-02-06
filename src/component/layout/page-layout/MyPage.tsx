import { Grid } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface MyPageProps {
  children: ReactNode;
}

export function MyPage({ children }: MyPageProps) {
  return (
    <Grid
      gridTemplateColumns="40% 60%"
      height="100%"
      width="100%"
      userSelect="none"
    >
      {children}
    </Grid>
  );
}
