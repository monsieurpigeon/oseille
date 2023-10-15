import { proxy } from 'valtio';
import { Delivery } from '../entity/delivery';
import { Farm } from '../entity/farm';
import { Invoice } from '../entity/invoice';
import { Price } from '../entity/price';

interface Store {
  deliveries: Delivery[];
  delivery: Delivery | null;
  invoices: Invoice[];
  invoice: Invoice | null;
  farm: Farm | null;
  prices: Price[];
}

export const store = proxy<Store>({
  deliveries: [],
  delivery: null,
  invoices: [],
  invoice: null,
  farm: null,
  prices: [],
});
