import { useCallback, useEffect, useState } from 'react';
import { usePouch } from '../../context/pouchDb';

export interface Document {
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

export interface DocumentInput {
  customerId: string;
  products: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }>;
}

export function useDocument() {
  const { db } = usePouch();

  const [contracts, setContracts] = useState<Document[]>([]);

  const loadDocuments = useCallback(() => {
    db.find({
      selector: { type: 'Contract' },
    })
      .then((result: { docs: Document[] }) => {
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

  const addContract = (document: DocumentInput) => {
    db.post({
      ...document,
      type: 'Document',
    }).then(console.log);
  };

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  return { contracts, addContract };
}
