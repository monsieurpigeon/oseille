import { Customer } from '../../backend';

export function CustomerDisplay({ customer }: { customer: Customer }) {
  return (
    <div>
      <div>{customer.name}</div>
      <div>{customer.address1}</div>
      <div>{customer.address2}</div>
      <div>
        {customer.zip} {customer.city}
      </div>
      <div>{customer.phone}</div>
      <div>{customer.notes}</div>
    </div>
  );
}
