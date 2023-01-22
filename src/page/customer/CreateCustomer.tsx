import { useState } from 'react';
import { addCustomer, CustomerInput } from '../../backend';
import { MyTextInput } from '../../component/form/input/MyTextInput';
import { MyCreateModal } from '../../component/modal/MyCreateModal';

const EMPTY_CUSTOMER: CustomerInput = {
  name: '',
  address1: '',
  address2: '',
  city: '',
  zip: '',
};

export function CreateCustomer() {
  const [customer, setCustomer] = useState(EMPTY_CUSTOMER);
  return (
    <MyCreateModal
      onSubmit={() => {
        addCustomer(customer).catch(console.error);
        setCustomer(EMPTY_CUSTOMER);
      }}
      title="Nouveau client"
    >
      <MyTextInput
        placeholder="Nom du client"
        value={customer.name}
        onChange={(e) => setCustomer((customer) => ({ ...customer, name: e.target.value }))}
      />
      <MyTextInput
        placeholder="Adresse 1"
        value={customer.address1}
        onChange={(e) => setCustomer((customer) => ({ ...customer, address1: e.target.value }))}
      />
      <MyTextInput
        placeholder="Adresse 2"
        value={customer.address2}
        onChange={(e) => setCustomer((customer) => ({ ...customer, address2: e.target.value }))}
      />
      <MyTextInput
        placeholder="Code postal"
        value={customer.zip}
        onChange={(e) => setCustomer((customer) => ({ ...customer, zip: e.target.value }))}
      />
      <MyTextInput
        placeholder="Ville"
        value={customer.city}
        onChange={(e) => setCustomer((customer) => ({ ...customer, city: e.target.value }))}
      />
    </MyCreateModal>
  );
}
