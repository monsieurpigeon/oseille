import { Delivery, Invoice, relDb } from '../backend';
import { round } from './compute';
import { DEFAULT_TAX, TVA_RATES } from './defaults';

export async function getIsTVA(invoice: Invoice): Promise<boolean> {
  const result = await relDb.rel.find('delivery', invoice.deliveries);
  const isTVAArray = (result.deliveries as Delivery[]).map((delivery) => {
    if (!delivery) return null;
    return delivery.isTVA;
  });
  return isTVAArray.some((v) => v);
}

export function getDeliveryTotal(delivery: Delivery): number {
  return delivery.lines.reduce((acc, el) => acc + el.product.price * el.quantity, 0);
}

export async function getInvoiceTotal(invoice: Invoice, ht: boolean = false): Promise<number> {
  const isTva = await getIsTVA(invoice);
  const taxes = await computeTaxes(invoice);
  return round(isTva && !ht ? taxes.total.ttc : taxes.total.ht);
}

interface TaxLine {
  ht: number;
  ttc: number;
  tax: number;
  taxValue?: { value: string; label: string; code: number };
}

export const computeTaxes = async (invoice: Invoice): Promise<{ total: TaxLine; detail: TaxLine[] }> => {
  const deliveries = await relDb.rel
    .find('Idelivery', invoice.deliveries)
    .then((doc) => ({ ...doc, deliveries: doc.Ideliveries }));
  const deliveryLines = (deliveries.deliveries as Delivery[])
    .flatMap((delivery) => {
      if (!delivery) return null;
      return delivery.lines.map((line) => ({
        value: line.price * line.quantity,
        tvaRate: line.product.tva || DEFAULT_TAX,
        tvaCode: TVA_RATES.find((rate) => rate.value === line.product.tva)?.code || 1,
      }));
    })
    .filter((line) => line != null && line.value > 0);

  const taxLines = TVA_RATES.map((rate) => {
    const lines = deliveryLines.filter((line) => line?.tvaRate === rate.value);
    const ht = round(lines.reduce((acc, el) => acc + el!.value, 0));
    const ttc = round(ht * (1 + +rate.value / 100));
    const tax = round((ht * +rate.value) / 100);
    return { taxValue: rate, ht, ttc, tax };
  }).filter((line) => line.ht > 0);

  const total = taxLines.reduce(
    (acc, line) => ({
      ht: acc.ht + line.ht,
      ttc: acc.ttc + line.ttc,
      tax: acc.tax + line.tax,
    }),
    { ht: 0, ttc: 0, tax: 0 },
  );

  return { total, detail: taxLines };
};
