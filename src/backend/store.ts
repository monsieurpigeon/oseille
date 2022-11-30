import { proxy } from 'valtio';
import { Customer } from './customer';
import { Product } from './index';

interface Store {
  products: Product[];
  customers: Customer[];
}

export const store = proxy<Store>({
  products: [],
  customers: [],
});
