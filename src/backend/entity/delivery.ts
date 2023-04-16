import { documentIdFormatter } from '../../utils/formatter';
import { relDb } from '../service/database';
import { store } from '../service/store';
import { Customer, loadCustomer } from './customer';
import { updateDocumentId } from './farm';
import { getPrice } from './price';
import { ProductWithPrice, loadProduct } from './product';

export interface Delivery {
  id: string;
  deliveredAt: string;
  customer: Customer;
  customerId: string;
  documentId: string;
  invoiceId?: string;
  lines: Array<{
    product: ProductWithPrice;
    quantity: number;
    totalPrice: number;
  }>;
}

export interface DeliveryInput {
  customerId: string;
  deliveredAt: string;
  lines: Array<{
    productId: string;
    quantity: number;
    totalPrice?: number;
  }>;
}

export async function loadDeliveries() {
  const result = await relDb.rel.find('delivery');
  store.deliveries = result.deliveries.sort((a: Delivery, b: Delivery) => {
    return a.documentId.localeCompare(b.documentId);
  });
}

export const addDelivery = async (delivery: DeliveryInput) => {
  const customer = await loadCustomer(delivery.customerId);
  const promise = async () => {
    const lines = await Promise.all(
      delivery.lines
        .filter((p) => p.productId !== '...')
        .map(async (el) => {
          const product = await loadProduct(el.productId);
          const price = await getPrice({ product: el.productId, customer: delivery.customerId });
          return { ...el, product: { ...product, price: price?.value || 0 } };
        }),
    );
    return { ...delivery, customer, lines: lines.filter((p) => !!p).map((l) => ({ ...l, quantity: +l.quantity })) };
  };

  promise().then((deliveryFull) => {
    relDb.rel
      .save('delivery', { ...deliveryFull, documentId: documentIdFormatter(store.farm?.deliveryId || 0, 'Delivery') })
      .then(() => updateDocumentId('Delivery'))
      .catch(console.error);
  });
};

export const addInvoiceId = (invoiceId: string, deliveryId: string) => {
  relDb.rel
    .find('delivery', deliveryId)
    .then((result) => {
      const delivery = result.deliveries[0];
      relDb.rel.save('delivery', { ...delivery, invoiceId }).catch(console.error);
    })
    .catch(console.error);
};
