import { Center } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { Delivery } from '../../backend';

export function DeliveryAll() {
  const { deliveries } = useRouteLoaderData('deliveries') as { deliveries: Delivery[] };
  const length = useMemo(() => deliveries.filter((delivery) => !delivery.invoice).length, [deliveries]);

  return <Center>{`${length} bon${length > 1 ? 's' : ''} de livraison à facturer`}</Center>;
}
