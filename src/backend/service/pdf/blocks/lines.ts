import { getCountry, getIsTVA } from '../../../../utils/aggregations';
import { TVA_RATES } from '../../../../utils/defaults';
import { dateFormatter, priceFormatter } from '../../../../utils/formatter';
import { Delivery, DeliveryLine } from '../../../entity/delivery';
import { Farm } from '../../../entity/farm';
import { ProductWithPrice } from '../../../entity/product';
import { relDb } from '../../database';
import { DocumentType } from '../pdf';

export const lines = async (payload: any, type: DocumentType, farm: Farm) => {
  const country = getCountry(farm?.country);

  if (type === DocumentType.delivery) {
    const isTVA = payload.isTVA;
    return {
      layout: 'lightHorizontalLines',
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: ['*', 'auto', 'auto', 'auto', 'auto'],
        body: [
          [
            'Designation',

            { text: 'Quantité', alignment: 'right' },
            { text: 'Unité' },
            { text: `P.U. ${isTVA ? 'HT' : ''}`, alignment: 'right' },
            {
              text: `Total ${isTVA ? 'HT' : ''}`,
              alignment: 'right',
            },
          ],
          ...payload.lines
            .sort(
              (
                a: { product: ProductWithPrice; quantity: number },
                b: { product: ProductWithPrice; quantity: number },
              ) => a.product.name.localeCompare(b.product.name),
            )
            .map((el: DeliveryLine) => productLine(el, false, country.currency)),
        ],
      },
    };
  }

  if (type === 'Invoice') {
    const isTVA = await getIsTVA(payload);
    const result = await relDb.rel
      .find('Idelivery', payload.deliveries)
      .then((doc) => ({ ...doc, deliveries: doc.Ideliveries }));
    const invoiceDeliveries = result.deliveries.sort((a: Delivery, b: Delivery) =>
      a.documentId.localeCompare(b.documentId),
    );
    return {
      layout: 'lightHorizontalLines',
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: ['*', 'auto', 'auto', 'auto', 'auto', ...(isTVA ? ['auto'] : [])],
        body: [
          [
            'Désignation',
            { text: 'Quantité', alignment: 'right' },
            { text: 'Unité' },
            { text: `P.U. ${isTVA ? 'HT' : ''}`, alignment: 'right' },
            {
              text: `Total ${isTVA ? 'HT' : ''}`,
              alignment: 'right',
            },
            ...(isTVA
              ? [
                  {
                    text: `Code TVA`,
                    alignment: 'right',
                  },
                ]
              : []),
          ],
          ...invoiceDeliveries.flatMap((delivery: Delivery) => {
            return [
              [
                { text: `${delivery?.documentId} - ${dateFormatter(delivery?.deliveredAt || '')}`, bold: true },
                '',
                '',
                '',
                '',
                ...(isTVA ? [''] : []),
              ],
              ...delivery.lines
                .sort((a, b) => a.product.name.localeCompare(b.product.name))
                .map((el) => productLine(el, isTVA, country.currency)),
            ];
          }),
        ],
      },
    };
  }
};

const productLine = (el: DeliveryLine, isTVA: boolean, currency: string = 'EUR') => {
  return [
    el.product.name,
    {
      text: el.quantity,
      alignment: 'right',
    },
    {
      text: el.product.unit,
      alignment: 'left',
    },
    { text: priceFormatter(el.product.price, currency), alignment: 'right' },
    { text: priceFormatter(el.product.price * el.quantity, currency), alignment: 'right' },
    ...(isTVA
      ? [
          {
            text: TVA_RATES.find((rate) => rate.value === el.product.tva)?.code || '1',
            alignment: 'right',
          },
        ]
      : []),
  ];
};
