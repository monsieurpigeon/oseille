import { proxy } from 'valtio';
import { Customer } from '../entity/customer';
import { Delivery } from '../entity/delivery';
import { Product } from '../entity/product';
import {Invoice} from "../entity/invoice";

interface Store {
  products: Product[];
  product: Product | null;
  customers: Customer[];
  customer: Customer | null;
  deliveries: Delivery[];
  delivery: Delivery | null;
  invoices: Invoice[];
  invoice:Invoice|null
}

export const store = proxy<Store>({
  products: [],
  product: null,
  customers: [],
  customer: null,
  deliveries: [],
  delivery: null,
  invoices:[],
  invoice:null
});
