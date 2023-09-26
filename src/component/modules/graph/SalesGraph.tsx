import { useSnapshot } from 'valtio';
import { Customer, store } from '../../../backend';
import { getInvoicePrice } from '../../../utils/aggregations';
import { priceFormatter } from '../../../utils/formatter';

interface SalesGraphProps {
  customer: Customer;
}

export function SalesGraph({ customer }: SalesGraphProps) {
  const snap = useSnapshot(store);

  const customerInvoice = store.invoices.filter((invoice) => invoice.customerId === customer.id);

  const total = customerInvoice.reduce((acc, invoice) => acc + getInvoicePrice(invoice), 0);

  return (
    <div>
      <div>
        {`${customerInvoice.length} facture${customerInvoice.length > 1 ? 's' : ''}, total: ${priceFormatter(total)}`}
      </div>
    </div>
  );
}
