import { documentIdFormatter } from '../../utils/formatter';
import { relDb } from '../service/database';
import { Customer, getCustomerById } from './customer';
import { getFarm, updateDocumentId } from './farm';
import { ProductWithPrice, getProductById } from './product';

export interface Delivery {
  id: string;
  _rev: string;
  isOrder?: boolean;
  isTVA: boolean;
  deliveredAt: string;
  customer: Customer;
  customerId: string;
  documentId: string;
  invoiceId?: string;
  lines: Array<DeliveryLine>;
  notes: string;
}

export interface DeliveryLine {
  product: ProductWithPrice;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface DeliveryInput {
  isTVA: boolean;
  isOrder?: boolean;
  customerId: string;
  deliveredAt: string;
  lines: Array<DeliveryLineInput>;
  notes: string;
}

export interface DeliveryLineInput {
  productId: string;
  quantity: number;
  price: number;
  totalPrice?: number;
}

export const addDelivery = async (delivery: DeliveryInput) => {
  const farm = await getFarm();
  const promise = async () => {
    const lines = await Promise.all(
      delivery.lines.map(async (el) => {
        const product = await getProductById(el.productId);
        return { ...el, product: { ...product, price: +el.price || 0 } };
      }),
    );
    return {
      ...delivery,
      isTVA: farm?.isTVA === 'oui',
      lines: lines.filter((p) => !!p).map((l) => ({ ...l, quantity: +l.quantity })),
    };
  };
  try {
    const deliveryFull = await promise();

    const result = await relDb.rel.save('delivery', {
      ...deliveryFull,
      documentId: documentIdFormatter(farm?.deliveryId || 0, 'Delivery'),
    });
    updateDocumentId('Delivery');
    return result;
  } catch (message) {
    console.error(message);
    return undefined;
  }
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

export const removeInvoiceId = (deliveryId: string) => {
  relDb.rel
    .find('delivery', deliveryId)
    .then((result) => {
      const delivery = result.deliveries[0];
      relDb.rel.save('delivery', { ...delivery, invoiceId: undefined }).catch(console.error);
    })
    .catch(console.error);
};

export const updateDelivery = async (delivery: Delivery, input: DeliveryInput) => {
  const promise = async () => {
    const lines = await Promise.all(
      input.lines.map(async (el) => {
        const product = await getProductById(el.productId);
        return { ...el, product: { ...product, price: +el.price || 0 } };
      }),
    );
    return {
      ...input,
      lines: lines.filter((p) => !!p).map((l) => ({ ...l, quantity: +l.quantity })), // TODO : check if quantity is a number even on past deliveries
    };
  };

  promise()
    .then((deliveryFull) => {
      relDb.rel.save('delivery', { ...delivery, ...deliveryFull }).catch(console.error);
    })
    .catch(console.error);
};

export const deleteDelivery = (delivery: Delivery) => {
  return relDb.rel.del('delivery', delivery);
};

export const confirmOrder = (delivery: Delivery) => {
  return relDb.rel.save('delivery', { ...delivery, isOrder: false });
};

export const getDeliveries = async (ids?: string[]): Promise<Delivery[]> =>
  relDb.rel.find('delivery', ids).then((doc) =>
    doc.deliveries
      .map((delivery: Delivery) => {
        const customer = getCustomerById(delivery.customerId);
        return {
          ...delivery,
          customer,
          deliveredAt: new Date(delivery.deliveredAt).toISOString().split('T')[0],
        };
      })
      .sort((a: Delivery, b: Delivery) => a.documentId.localeCompare(b.documentId)),
  );

// TODO useless function
export const getDeliveryById = (id: string) => relDb.rel.find('delivery', id).then((doc) => doc.deliveries[0]);

export const onDeliveriesChange = (listener: (value: PouchDB.Core.ChangesResponseChange<{}>) => any) =>
  relDb.changes({ since: 'now', live: true }).on('change', (e) => {
    if (e.id.split('_')[0] === 'delivery') {
      listener(e);
    }
  });
