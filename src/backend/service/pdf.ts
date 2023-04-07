import * as pdfMake from 'pdfmake/build/pdfmake';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { Product } from '../entity/product';
import { store } from './store';
import { DEFAULT_FARM } from '../../utils/defaults';
import { Delivery } from '../entity/delivery';
import { getDeliveryPrice, getInvoicePrice } from '../../utils/aggregations';

const fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
  },
};

export type DocumentKey = 'Delivery' | 'Invoice';

const getLines = (payload: any, type: DocumentKey) => {
  if (type === 'Delivery') {
    return {
      layout: 'lightHorizontalLines',
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*', '*'],
        body: [
          [
            'Designation',

            { text: 'Quantite', alignment: 'right' },
            { text: '' },
            { text: 'Prix unitaire', alignment: 'right' },
            {
              text: 'Montant',
              alignment: 'right',
            },
          ],
          ...payload.lines
            .sort((a: { product: Product; quantity: number }, b: { product: Product; quantity: number }) =>
              a.product.name.localeCompare(b.product.name),
            )
            .map((el: { product: Product; quantity: number }) => {
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
                { text: priceFormatter(el.product.price), alignment: 'right' },
                { text: priceFormatter(el.product.price * el.quantity), alignment: 'right' },
              ];
            }),
        ],
      },
    };
  }

  if (type === 'Invoice') {
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
        widths: ['*', '*', '*', '*', '*'],
        body: [
          [
            'Designation',

            { text: 'Quantite', alignment: 'right' },
            { text: '' },
            { text: 'Prix unitaire', alignment: 'right' },
            {
              text: 'Montant',
              alignment: 'right',
            },
          ],
          ...deliveries.flatMap((delivery: Delivery) => {
            return [
              [delivery?.documentId, dateFormatter(delivery?.deliveredAt || ''), '', '', ''],
              ...delivery.lines
                .sort((a, b) => a.product.name.localeCompare(b.product.name))
                .map((el) => {
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
                    { text: priceFormatter(el.product.price), alignment: 'right' },
                    { text: priceFormatter(el.product.price * el.quantity), alignment: 'right' },
                  ];
                }),
            ];
          }),
        ],
      },
    };
  }
};

const getPrice = (payload: any, type: DocumentKey) => {
  if (type === 'Delivery') {
    return getDeliveryPrice(payload);
  }

  if (type === 'Invoice') {
    return getInvoicePrice(payload);
  }

  return -1;
};

export const exportDocument = ({ payload, type }: any) => {
  const docDefinition: any = {
    defaultStyle: {
      font: 'Roboto',
    },
    info: {
      title: payload.documentId,
    },
    footer: {
      text: `${store.farm?.footer}\nGénéré gratuitement grâce à Oseille - www.oseille.app`,
      alignment: 'center',
    },
    content: [
      { text: `${payload.documentId}`, style: 'header' },
      {
        layout: 'noBorders',
        style: 'tableExample',
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                columns: [
                  [
                    { text: store.farm?.title || DEFAULT_FARM.title },
                    { text: store.farm?.address1 || DEFAULT_FARM.address1 },
                    { text: store.farm?.address2 || DEFAULT_FARM.address2 },
                    { text: `${store.farm?.zip || DEFAULT_FARM.zip} ${store.farm?.city || DEFAULT_FARM.city}` },
                  ],
                ],
              },
              {
                columns: [
                  [
                    { text: payload.customer.name, alignment: 'right' },
                    { text: payload.customer.address1, alignment: 'right' },
                    { text: payload.customer.address2, alignment: 'right' },
                    { text: `${payload.customer.zip} ${payload.customer.city}`, alignment: 'right' },
                  ],
                ],
              },
            ],
          ],
        },
      },
      getLines(payload, type),

      {
        text: `Total       ${priceFormatter(getPrice(payload, type))}`,
        alignment: 'right',
      },
      { qr: payload.id, fit: '80' },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black',
      },
    },
  };

  pdfMake.createPdf(docDefinition, undefined, fonts).download(payload.documentId);
};
