import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { ConfirmContextProvider } from './component/modal/confirm-modal/ConfirmContext';
import { SideKickContextProvider } from './component/modules/sidekick/SideKickContext';
import { DataProvider } from './context/DataContext';
import { router } from './router';

export function App() {
  return (
    <ChakraProvider>
      <ConfirmContextProvider>
        <SideKickContextProvider>
          <DataProvider>
            <RouterProvider router={router} />
          </DataProvider>
        </SideKickContextProvider>
      </ConfirmContextProvider>
    </ChakraProvider>
  );
}
