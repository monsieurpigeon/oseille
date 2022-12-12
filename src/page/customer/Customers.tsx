import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useSnapshot } from 'valtio';
import { addCustomer, Customer, getCustomer, store } from '../../backend';
import { MyTextInput } from '../../component/form/input/MyTextInput';
import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import { MyCreateModal } from '../../component/modal/MyCreateModal';
import { MyH1 } from '../../component/typography/MyFont';

export function Customers() {
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const btnRef = useRef<any>();

  const [text, setText] = useState('');
  const { customers } = useSnapshot(store);
  const [customer, setCustomer] = useState<Customer>();

  return (
    <MyScreenLayout>
      <Flex
        gap={4}
        alignItems="center"
      >
        <MyH1>Clients</MyH1>
        <MyCreateModal
          onSubmit={() => {
            addCustomer({ name: text });
            setText('');
          }}
          title="Nouveau client"
        >
          <MyTextInput
            placeholder="Nom du client"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </MyCreateModal>
      </Flex>

      {customers.map((customer: any) => (
        <div key={customer._id}>
          <Box
            ref={btnRef}
            cursor="pointer"
            onClick={() => {
              onDrawerOpen();
              getCustomer(customer._id).then((customer) => setCustomer(customer as unknown as Customer));
            }}
          >
            {customer.name}
          </Box>
        </div>
      ))}
      {!!customer && (
        <Drawer
          isOpen={isDrawerOpen}
          placement="right"
          onClose={onDrawerClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Focus client</DrawerHeader>
            <DrawerBody>
              <div>{customer.name}</div>
            </DrawerBody>

            <DrawerFooter>
              <Button
                variant="outline"
                mr={3}
                onClick={onDrawerClose}
              >
                Retour
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </MyScreenLayout>
  );
}
