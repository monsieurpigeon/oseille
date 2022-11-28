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
    })
      .then((result: { docs: Contract[] }) => {
        return Promise.all(
          result.docs.map(async (doc) => {
            const customer = await db.get(doc.customerId);
            const products = await Promise.all(
              doc.products.map(async (el) => {
                const product = await db.get(el.productId);
                return { ...el, product };
              }),
            );
            return { ...doc, customer, products };
          }),
        );
      })
      .then((data: any) => {
        setContracts(data);
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
