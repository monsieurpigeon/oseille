import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useSnapshot } from 'valtio';
import { addCustomer, store } from '../../backend';
import { Button } from '../../component/form/button/Button';
import { TextInput } from '../../component/form/input/TextInput';
import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { StyledH1 } from '../../component/typography/Font';

const StyledDetail = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export function Customers() {
  const [text, setText] = useState('');
  const { customers } = useSnapshot(store);

  return (
    <ScreenLayout>
      <StyledH1>Clients</StyledH1>
      <TextInput
        placeholder="Nouveau client"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
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
      <StyledDetail>
        <Outlet />
      </StyledDetail>
    </ScreenLayout>
  );
}
