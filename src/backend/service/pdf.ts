import * as pdfMake from 'pdfmake/build/pdfmake';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { ProductWithPrice } from '../entity/product';
import { store } from './store';
import { DEFAULT_FARM } from '../../utils/defaults';
import { Delivery } from '../entity/delivery';
import {
  getDeliveryPrice,
  getDeliveryTaxes,
  getInvoicePrice,
  getInvoiceTaxes,
  getIsTVA,
} from '../../utils/aggregations';

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
    const isTVA = payload.isTVA;
    return {
      layout: 'lightHorizontalLines',
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: ['*', 'auto', 'auto', 'auto', 'auto', ...(isTVA ? ['auto', 'auto'] : [])],
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
                    text: `Total TVA`,
                    alignment: 'right',
                  },
                  {
                    text: `Total TTC`,
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
            .map((el: { product: ProductWithPrice; quantity: number }) => {
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
                ...(isTVA
                  ? [
                      {
                        text: priceFormatter((el.product.price * el.quantity * +el.product.tva) / 100),
                        alignment: 'right',
                      },
                      {
                        text: priceFormatter(el.product.price * el.quantity * (1 + +el.product.tva / 100)),
                        alignment: 'right',
                      },
                    ]
                  : []),
              ];
            }),
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
        widths: ['*', 'auto', 'auto', 'auto', 'auto', ...(isTVA ? ['auto', 'auto'] : [])],
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
                    text: `Total TVA`,
                    alignment: 'right',
                  },
                  {
                    text: `Total TTC`,
                    alignment: 'right',
                  },
                ]
              : []),
          ],
          ...deliveries.flatMap((delivery: Delivery) => {
            return [
              [
                { text: `${delivery?.documentId} - ${dateFormatter(delivery?.deliveredAt || '')}` },
                '',
                '',
                '',
                '',
                ...(isTVA ? ['', ''] : []),
              ],
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
                    ...(isTVA
                      ? [
                          {
                            text: priceFormatter((el.product.price * el.quantity * +el.product.tva) / 100),
                            alignment: 'right',
                          },
                          {
                            text: priceFormatter(el.product.price * el.quantity * (1 + +el.product.tva / 100)),
                            alignment: 'right',
                          },
                        ]
                      : []),
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

const getTaxes = (payload: any, type: DocumentKey) => {
  if (type === 'Delivery') {
    return getDeliveryTaxes(payload);
  }

  if (type === 'Invoice') {
    return getInvoiceTaxes(payload);
  }

  return -1;
};

export const exportDocument = ({ payload, type }: any) => {
  const isTVA = type === 'Delivery' ? payload.isTVA : getIsTVA(payload);

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
        layout: 'noBorders',
        style: 'tableExample',
        table: {
          widths: ['*', 'auto'],
          body: [
            [
              '',
              {
                layout: 'noBorders',
                table: {
                  alignment: 'right',
                  widths: ['auto', 'auto', 'auto'],
                  body: [
                    [
                      `Total${isTVA ? ' HT' : ''}`,
                      ':',
                      { text: priceFormatter(getPrice(payload, type)), alignment: 'right' },
                    ],
                    ...(isTVA
                      ? [
                          ['Total TVA', ':', { text: priceFormatter(getTaxes(payload, type)), alignment: 'right' }],
                          [
                            'Net à payer',
                            ':',
                            {
                              text: priceFormatter(getPrice(payload, type) + getTaxes(payload, type)),
                              alignment: 'right',
                              bold: true,
                            },
                          ],
                        ]
                      : []),
                  ],
                },
              },
            ],
          ],
        },
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

  //pdfMake.createPdf(docDefinition, undefined, fonts).download(payload.documentId);
  pdfMake.createPdf(docDefinition, undefined, fonts).open();
};
