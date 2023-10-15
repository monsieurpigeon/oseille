import { useEffect, useState } from 'react';
import { Customer, getCustomers, onProductsChange } from '../backend';

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const refreshCustomers = () => getCustomers().then(setCustomers);

  useEffect(() => {
    console.log('REFRESH CUSTOMER');
    refreshCustomers();
    const observer = onProductsChange(refreshCustomers);
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
