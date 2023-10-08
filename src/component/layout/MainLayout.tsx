import { Grid, GridItem } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { InvoicingNavigation } from './Navigation';

interface MainLayoutProps {
  children: ReactNode;
}

export function InvoicingLayout({ children }: MainLayoutProps) {
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "footer footer"`}
      gridTemplateRows="auto 1fr"
      gridTemplateColumns="auto 1fr"
      height="100vh"
    >
      <GridItem
        area="header"
        position="sticky"
        top="0"
      >
        <Header />
      </GridItem>
      <GridItem area="nav">
        <InvoicingNavigation />
      </GridItem>
      <GridItem area="main">{children}</GridItem>
      <GridItem area="footer">
        <Footer />
      </GridItem>
    </Grid>
  );
}

export function ToolingLayout({ children }: MainLayoutProps) {
  return (
    <Grid
      templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
      gridTemplateRows="auto 1fr"
      gridTemplateColumns="auto 1fr"
      height="100vh"
    >
      <GridItem
        area="header"
        position="sticky"
        top="0"
      >
        <Header />
      </GridItem>
      <GridItem area="main">{children}</GridItem>
      <GridItem area="footer">
        <Footer />
      </GridItem>
    </Grid>
  );
}
