import { ReactNode } from 'react';
import { MyFooter } from './footer/MyFooter';
import { MyHeader } from './header/MyHeader';
import { MyNavigation } from './navigation/MyNavigation';
import { Box, Grid, GridItem } from '@chakra-ui/react';

export function MyMainLayout({ children }: { children: ReactNode }) {
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "footer footer"`}
      gridTemplateRows={'auto 15fr auto'}
      gridTemplateColumns={'auto 1fr'}
      gap={4}
      h="100vh"
    >
      <GridItem area={'header'}>
        <MyHeader />
      </GridItem>
      <GridItem area={'nav'}>
        <MyNavigation />
      </GridItem>
      <GridItem area={'main'}>
        <Box>{children}</Box>
      </GridItem>
      <GridItem area={'footer'}>
        <MyFooter />
      </GridItem>
    </Grid>
  );
}
