import { ReactNode, createContext, useContext } from 'react';
import { Customer, Delivery, Farm, Invoice, Price, Product } from '../backend';
import { useCustomers } from './useCustomers';
import { useDeliveries } from './useDeliveries';
import { useFarm } from './useFarm';
import { useInvoices } from './useInvoices';
import { usePrices } from './usePrices';
import { useProducts } from './useProducts';

interface DataContextType {
  products: Product[];
  getProduct: (id: string) => Product | undefined;
  customers: Customer[];
  getCustomer: (id: string) => Customer | undefined;
  prices: Price[];
  getPrice: (id: string) => Price | undefined;
  deliveries: Delivery[];
  getDelivery: (id: string) => Delivery | undefined;
  getClientDeliveries: (customerId: string) => Delivery[];
  getDeliveriesByIds: (ids: string[]) => Delivery[];
  invoices: Invoice[];
  getInvoice: (id: string) => Invoice | undefined;
  getClientInvoices: (customerId: string) => Invoice[];
  farm: Farm | undefined;
}

const DataContext = createContext<DataContextType>({
  products: [],
  getProduct: () => undefined,
  customers: [],
  getCustomer: () => undefined,
  prices: [],
  getPrice: () => undefined,
  deliveries: [],
  getDelivery: () => undefined,
  getClientDeliveries: () => [],
  getDeliveriesByIds: () => [],
  invoices: [],
  getInvoice: () => undefined,
  getClientInvoices: () => [],
  farm: undefined,
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const { products, getProduct } = useProducts();
  const { customers, getCustomer } = useCustomers();
  const { prices, getPrice } = usePrices();
  const { deliveries, getDelivery, getClientDeliveries, getDeliveriesByIds } = useDeliveries();
  const { invoices, getInvoice, getClientInvoices } = useInvoices();
  const { farm } = useFarm();

  return (
    <DataContext.Provider
      value={{
        products,
        getProduct,
        customers,
        getCustomer,
        prices,
        getPrice,
        deliveries,
        getDelivery,
        getClientDeliveries,
        getDeliveriesByIds,
        invoices,
        getInvoice,
        getClientInvoices,
        farm,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
