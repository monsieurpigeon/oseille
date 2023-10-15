import { ReactNode, createContext, useContext } from 'react';
import { Product } from '../backend';
import { useProducts } from '../hooks/useProducts';

interface DataContextType {
  products: Product[];
  getProduct: (id: string) => Product | undefined;
}

const DataContext = createContext<DataContextType>({
  products: [],
  getProduct: () => undefined,
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { products, getProduct } = useProducts();

  return <DataContext.Provider value={{ products, getProduct }}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
