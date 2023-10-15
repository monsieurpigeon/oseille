import { ReactNode, createContext, useContext } from 'react';
import { Customer, Product } from '../backend';
import { useCustomers } from '../hooks/useCustomers';
import { useProducts } from '../hooks/useProducts';

interface DataContextType {
  products: Product[];
  getProduct: (id: string) => Product | undefined;
  customers: Customer[];
  getCustomer: (id: string) => Customer | undefined;
}

const DataContext = createContext<DataContextType>({
  products: [],
  getProduct: () => undefined,
  customers: [],
  getCustomer: () => undefined,
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { products, getProduct } = useProducts();
  const { customers, getCustomer } = useCustomers();

  return (
    <DataContext.Provider value={{ products, getProduct, customers, getCustomer }}>{children}</DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
