import { Delivery, Invoice, store } from '../backend';
import { computeTaxes, round } from './compute';

export function getDeliveryPrice(delivery: Delivery): number {
  return delivery.lines.reduce((acc, el) => acc + el.product.price * el.quantity, 0);
}

export function getDeliveryTaxes(delivery: Delivery): number {
  return delivery.lines.reduce((acc, el) => acc + computeTaxes(el.product.price, el.quantity, el.product.tva), 0);
}

export function getInvoicePrice(invoice: Invoice): number {
  return invoice.deliveries
    .flatMap((id) => {
      const delivery = store.deliveries.find((d) => d.id === id);
      if (!delivery) return null;
      return delivery.lines;
    })
    .reduce((acc, el) => {
      if (!el) return acc;
      return acc + el.product.price * el.quantity;
    }, 0);
}

export function getInvoiceTaxes(invoice: Invoice): number {
  return invoice.deliveries
    .flatMap((id) => {
      const delivery = store.deliveries.find((d) => d.id === id);
      if (!delivery) return null;
      return delivery.lines;
    })
    .reduce((acc, el) => {
      if (!el) return acc;
      return acc + computeTaxes(el.product.price, el.quantity, el.product.tva);
    }, 0);
}

export function getInvoiceTotal(invoice: Invoice): number {
  const isTva = getIsTVA(invoice);

  return round(getInvoicePrice(invoice) + (isTva ? getInvoiceTaxes(invoice) : 0));
}

export function getIsTVA(invoice: Invoice): boolean {
  const isTVAArray = invoice.deliveries.map((id) => {
    const delivery = store.deliveries.find((d) => d.id === id);
    if (!delivery) return null;
    return delivery.isTVA;
  });

  return isTVAArray.some((v) => v);
}
