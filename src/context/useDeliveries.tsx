import { useEffect, useState } from 'react';
import { Delivery, getDeliveries, onDeliveriesChange } from '../backend';

export function useDeliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const refreshDeliveries = () => {
    console.log('REFRESH DELIVERY');
    getDeliveries().then(setDeliveries);
  };

  useEffect(() => {
    refreshDeliveries();
    const observer = onDeliveriesChange(refreshDeliveries);
    return () => {
      observer.cancel();
    };
  }, []);

  const getDelivery = (id: string) => {
    if (!id) return;
    return deliveries.find((delivery) => delivery.id === id);
  };

  const getClientDeliveries = (customerId: string) => {
    return deliveries
      .filter((delivery) => delivery.customerId === customerId)
      .sort((a, b) => b.documentId.localeCompare(a.documentId));
  };

  const getDeliveriesByIds = (ids: string[]) => {
    return ids.map((id) => deliveries.find((d) => d.id === id)).filter(Boolean) as Delivery[];
  };

  return { deliveries, getDelivery, getClientDeliveries, getDeliveriesByIds };
}
