import { proxy } from 'valtio';
import { Customer } from '../entity/customer';
import { Deal } from '../entity/deal';
import { Product } from '../entity/product';

interface Store {
  products: Product[];
  product: Product | null;
  customers: Customer[];
  customer: Customer | null;
  deals: Deal[];
  deal: Deal | null;
}

export const store = proxy<Store>({
  products: [],
  product: null,
  customers: [],
  customer: null,
  deals: [],
  deal: null,
});
