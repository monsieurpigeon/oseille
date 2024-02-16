import { getCountry, getIsTVA } from '../../../../utils/aggregations';
import { Country, TVA_RATES_MAP } from '../../../../utils/defaults';
import { dateFormatter, priceFormatter } from '../../../../utils/formatter';
import { Delivery, DeliveryLine } from '../../../entity/delivery';
import { Farm } from '../../../entity/farm';
import { Invoice } from '../../../entity/invoice';
import { ProductWithPrice } from '../../../entity/product';
import { relDb } from '../../database';
import { DocumentType } from '../pdf';

export const lines = async (payload: Delivery | Invoice, type: DocumentType, farm: Farm) => {
  const country = getCountry(farm?.country);

  if (type === DocumentType.delivery) {
    const delivery = payload as Delivery;
    const isTVA = delivery.isTVA;
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
          ...delivery.lines
            .sort(
              (
                a: { product: ProductWithPrice; quantity: number },
                b: { product: ProductWithPrice; quantity: number },
              ) => a.product.name.localeCompare(b.product.name),
            )
            .map((el: DeliveryLine) => productLine(el, false, country)),
        ],
      },
    };
  }

  if (type === 'Invoice') {
    const invoice = payload as Invoice;
    const isTVA = await getIsTVA(invoice);
    const isCanada = country.value === 'CA';
    const result = await relDb.rel
      .find('Idelivery', invoice.deliveries)
      .then((doc) => ({ ...doc, deliveries: doc.Ideliveries }));
    const invoiceDeliveries = result.deliveries.sort((a: Delivery, b: Delivery) =>
      a.documentId.localeCompare(b.documentId),
    );
    return {
      layout: 'lightHorizontalLines',
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: ['*', 'auto', 'auto', 'auto', 'auto', ...(isTVA && !isCanada ? ['auto'] : [])],
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
            ...(isTVA && !isCanada
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
                ...(isTVA && !isCanada ? [''] : []),
              ],
              ...delivery.lines
                .sort((a, b) => a.product.name.localeCompare(b.product.name))
                .map((el) => productLine(el, isTVA, country)),
            ];
          }),
        ],
      },
    };
  }
};

const productLine = (el: DeliveryLine, isTVA: boolean, country: Country) => {
  const { currency } = country;
  const isCanada = country.value === 'CA';
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
    ...(isTVA && !isCanada
      ? [
          {
            text: TVA_RATES_MAP[country.value].find((rate) => rate.value === el.product.tva)?.code || '1',
            alignment: 'right',
          },
        ]
      : []),
  ];
};
