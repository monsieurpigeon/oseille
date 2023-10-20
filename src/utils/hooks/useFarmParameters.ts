import { useData } from '../../context/DataContext';
import { DEFAULT_INVOICE_DELAY } from '../defaults';

export function useFarmParameters() {
  const { farm } = useData();
  const isTVA = farm?.isTVA === 'oui';

  const logo = farm?._attachements?.logo?.data;
  const invoiceDelay = farm?.invoiceDelay ?? DEFAULT_INVOICE_DELAY;

  return { farm, logo, isTVA, invoiceDelay };
}
