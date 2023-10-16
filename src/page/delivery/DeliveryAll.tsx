import { Center } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useData } from '../../context/DataContext';

export function DeliveryAll() {
  const { deliveries } = useData();
  const length = useMemo(() => deliveries.filter((delivery) => !delivery.invoiceId).length, [deliveries]);

  return <Center>{`${length} bon${length > 1 ? 's' : ''} de livraison à facturer`}</Center>;
}
