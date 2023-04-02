import { Delivery, Invoice, Product, store } from '../backend';

export function getDeliveryPrice(delivery: Delivery): number {
  return delivery.lines.reduce(
    (acc: number, el: { product: Product; quantity: number }) => acc + el.product.price * el.quantity,
    0,
  );
}

export function getInvoicePrice(invoice: Invoice): number {
  return invoice.deliveries
    .flatMap((id: string) => {
      const delivery = store.deliveries.find((d) => d.id === id);
      if (!delivery) return null;
      return delivery.lines;
    })
    .reduce((acc: number, el) => {
      if (!el) return acc;
      return acc + el.product.price * el.quantity;
    }, 0);
}
