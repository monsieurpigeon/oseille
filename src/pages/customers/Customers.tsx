import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components/form/button/Button';
import { TextInput } from '../../components/form/input/TextInput';
import { useCustomers } from './useCustomers';

const StyledContainer = styled.div`
  position: relative;
`;
const StyledDetail = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export function Customers() {
  const [text, setText] = useState('');
  const { customers, addCustomer } = useCustomers();

  return (
    <StyledContainer>
      <h1>Clients</h1>
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
    </StyledContainer>
  );
}
