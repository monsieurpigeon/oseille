import { useState } from 'react';
import { Delivery } from '../backend';

export function useDeliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  const getDelivery = (id: string) => {
    if (!id) return;
    return deliveries.find((delivery) => delivery.id === id);
  };

  const getClientDeliveries = (customerId: string) => {
    return deliveries
      .filter((delivery) => delivery.customer === customerId)
      .sort((a, b) => b.documentId.localeCompare(a.documentId));
  };

  const getDeliveriesByIds = (ids: string[]) => {
    return ids.map((id) => deliveries.find((d) => d.id === id)).filter(Boolean) as Delivery[];
  };

  return { deliveries, getDelivery, getClientDeliveries, getDeliveriesByIds };
}
