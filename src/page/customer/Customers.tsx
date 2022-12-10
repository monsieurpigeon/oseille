import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { addCustomer, store } from '../../backend';
import { MyButton } from '../../component/form/button/MyButton';
import { MyTextInput } from '../../component/form/input/MyTextInput';
import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import { MyH1 } from '../../component/typography/MyFont';
import { Flex } from '@chakra-ui/react';

export function Customers() {
  const [text, setText] = useState('');
  const { customers } = useSnapshot(store);

  return (
    <MyScreenLayout>
      <MyH1>Clients</MyH1>
      <MyTextInput
        placeholder="Nouveau client"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <MyButton
        label="Ajouter"
        onClick={() => {
          addCustomer({ name: text });
          setText('');
        }}
      />

      {customers.map((customer: any) => (
        <div key={customer._id}>
          <Link to={customer._id}>{customer.name}</Link>
        </div>
      ))}
      <Flex>
        <Outlet />
      </Flex>
    </MyScreenLayout>
  );
}
