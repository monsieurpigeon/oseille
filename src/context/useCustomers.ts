import { useState } from 'react';
import { Customer } from '../backend';

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const getCustomer = (id: string) => {
    if (!id) return;
    return customers.find((customer) => customer.id === id);
  };

  return { customers, getCustomer };
}
