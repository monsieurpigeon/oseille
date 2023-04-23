import { useSnapshot } from 'valtio';
import { store } from '../../backend';

export function useFarmParameters() {
  const { farm } = useSnapshot(store);
  const isTVA = farm?.isTVA === 'oui';

  return { farm, isTVA };
}
