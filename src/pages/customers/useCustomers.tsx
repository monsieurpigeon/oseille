import { useCallback, useEffect, useState } from 'react';
import { usePouch } from '../../contexts/pouchDb';

export interface Customer {
  id: string;
  name: string;
  type: 'Customer';
}

interface CustomerInput {
  name: string;
}

export function useCustomers() {
  const { db } = usePouch();
  const [customers, setCustomers] = useState<Customer[]>([]);

  const loadCustomers = useCallback(() => {
    db.find({
      selector: { type: 'Customer' },
    }).then((result: { docs: Customer[] }) => {
      setCustomers(result.docs);
    });
  }, []);

  const addCustomer = (customer: CustomerInput) => {
    db.put({
      _id: 'customer:' + customer.name,
      name: customer.name,
      type: 'Customer',
    }).then(loadCustomers);
  };

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  return { customers, addCustomer };
}
