import { useCallback, useEffect, useState } from 'react';
import { usePouch } from '../../../contexts/pouchDb';
import { Customer } from '../useCustomers';

export function useCustomerDetail({ id }: { id: string }) {
  const { db } = usePouch();
  const [customer, setCustomer] = useState<Customer>();

  const loadCustomer = useCallback(() => {
    db.get(id).then((result: Customer) => {
      setCustomer(result);
    });
  }, [id]);

  useEffect(() => {
    loadCustomer();
  }, [loadCustomer, id]);

  return { customer };
}
