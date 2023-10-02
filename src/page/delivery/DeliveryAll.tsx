import { Center } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../../backend';

export function DeliveryAll() {
  const snap = useSnapshot(store);
  const length = useMemo(() => store.deliveries.filter((delivery) => !delivery.invoiceId).length, [snap]);
  return <Center>{`${length} bon${length > 1 ? 's' : ''} de livraison`}</Center>;
}
