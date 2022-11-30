import { proxy } from 'valtio';
import { Customer } from '../entity/customer';
import { Product } from '../entity/product';

interface Store {
  products: Product[];
  product: Product | null;
  customers: Customer[];
  customer: Customer | null;
}

export const store = proxy<Store>({
  products: [],
  product: null,
  customers: [],
  customer: null,
});
