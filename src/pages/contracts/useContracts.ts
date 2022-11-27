import { useCallback, useEffect, useState } from 'react';
import { usePouch } from '../../contexts/pouchDb';

export interface Contract {
  id: string;
  customerId: string;
  products: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }>;
}

export interface ContractInput {
  customerId: string;
  products: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }>;
}

export function useContracts() {
  const { db } = usePouch();
  const [contracts, setContracts] = useState<Contract[]>([]);

  const loadContracts = useCallback(() => {
    db.find({
      selector: { type: 'Contract' },
    }).then((result: { docs: Contract[] }) => {
      setContracts(result.docs);
    });
  }, []);

  const addContract = (contract: ContractInput) => {
    db.post({
      ...contract,
      type: 'Contract',
    }).then(console.log);
  };

  useEffect(() => {
    loadContracts();
  }, [loadContracts]);

  return { contracts, addContract };
}
