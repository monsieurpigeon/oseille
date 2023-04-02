import { Grid, GridItem } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Navigation } from './Navigation';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "footer footer"`}
      gridTemplateRows={'auto 1fr'}
      gridTemplateColumns={'auto 1fr'}
      height="100vh"
    >
      <GridItem
        area={'header'}
        position="sticky"
        top="0"
      >
        <Header />
      </GridItem>
      <GridItem area={'nav'}>
        <Navigation />
      </GridItem>
      <GridItem area={'main'}>{children}</GridItem>
      <GridItem area={'footer'}>
        <Footer />
      </GridItem>
    </Grid>
  );
}
