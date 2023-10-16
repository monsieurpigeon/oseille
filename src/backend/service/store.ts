import { proxy } from 'valtio';
import { Farm } from '../entity/farm';
import { Invoice } from '../entity/invoice';

interface Store {
  invoices: Invoice[];
  invoice: Invoice | null;
  farm: Farm | null;
}

export const store = proxy<Store>({
  invoices: [],
  invoice: null,
  farm: null,
});
