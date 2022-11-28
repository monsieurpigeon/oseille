import { Customer } from './Customer';
import { Product } from './Product';

export interface Contract {
  _id: string;
  type: 'Contract';
  customer: Customer;
  products: Product[];
}

export interface ContractInput {
  customer: Customer;
  products: Product[];
}
