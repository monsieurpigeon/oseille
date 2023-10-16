import { useEffect, useState } from 'react';
import { Customer, getCustomers, onCustomersChange } from '../backend';

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const refreshCustomers = () => {
    console.log('REFRESH CUSTOMER');
    getCustomers().then(setCustomers);
  };

  useEffect(() => {
    refreshCustomers();
    const observer = onCustomersChange(refreshCustomers);
    return () => {
      observer.cancel();
    };
  }, []);

  const getCustomer = (id: string) => {
    if (!id) return;
    return customers.find((customer) => customer.id === id);
  };

  return { customers, getCustomer };
}
