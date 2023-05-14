import { getIsTVA } from '../../../../utils/aggregations';
import { computeTaxes } from '../../../../utils/compute';
import { dateFormatter, priceFormatter } from '../../../../utils/formatter';
import { ProductWithPrice } from '../../../entity/product';
import { DocumentType } from '../pdf';
import { store } from '../../store';
import { Delivery, DeliveryLine } from '../../../entity/delivery';
import { TVA_RATES } from '../../../../utils/defaults';

export const lines = (payload: any, type: DocumentType) => {
  if (type === DocumentType.delivery) {
    const isTVA = payload.isTVA;
    return {
      layout: 'lightHorizontalLines',
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: ['*', 'auto', 'auto', 'auto', 'auto', ...(isTVA ? ['auto'] : [])],
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
            ...(isTVA
              ? [
                  {
                    text: `Code TVA`,
                    alignment: 'right',
                  },
                ]
              : []),
          ],
          ...payload.lines
            .sort(
              (
                a: { product: ProductWithPrice; quantity: number },
                b: { product: ProductWithPrice; quantity: number },
              ) => a.product.name.localeCompare(b.product.name),
            )
            .map((el: DeliveryLine) => productLine(el, isTVA)),
        ],
      },
    };
  }

  if (type === 'Invoice') {
    const isTVA = getIsTVA(payload);
    const deliveries = payload.deliveries
      .map((id: string) => {
        return store.deliveries.find((d) => d.id === id);
      })
      .sort((a: Delivery, b: Delivery) => a.documentId.localeCompare(b.documentId));
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
          ...deliveries.flatMap((delivery: Delivery) => {
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
                .map((el) => productLine(el, isTVA)),
            ];
          }),
        ],
      },
    };
  }
};

const productLine = (el: DeliveryLine, isTVA: boolean) => {
  return [
    `|   ${el.product.name}`,

    {
      text: el.quantity,
      alignment: 'right',
    },
    {
      text: el.product.unit,
      alignment: 'left',
    },
    { text: priceFormatter(el.product.price), alignment: 'right' },
    { text: priceFormatter(el.product.price * el.quantity), alignment: 'right' },
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
