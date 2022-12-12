import { proxy } from 'valtio';
import { Customer } from '../entity/customer';
import { Delivery } from '../entity/delivery';
import { Product } from '../entity/product';
import { Invoice } from '../entity/invoice';
import { Farm } from '../entity/farm';

interface Store {
  products: Product[];
  product: Product | null;
  customers: Customer[];
  deliveries: Delivery[];
  delivery: Delivery | null;
  invoices: Invoice[];
  invoice: Invoice | null;
  farm: Farm | null;
}

export const store = proxy<Store>({
  products: [],
  product: null,
  customers: [],
  deliveries: [],
  delivery: null,
  invoices: [],
  invoice: null,
  farm: null,
});
