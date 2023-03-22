import * as pdfMake from 'pdfmake/build/pdfmake';
import { priceFormatter } from '../../utils/formatter';
import { Product } from '../entity/product';
import { store } from './store';
import { DEFAULT_FARM } from '../../utils/defaults';

const fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
  },
};

export type DocumentKey = 'Delivery' | 'Invoice';

export const exportDocument = ({ payload }: any) => {
  console.log({ payload }, payload.title);
  const docDefinition: any = {
    defaultStyle: {
      font: 'Roboto',
    },
    footer: { text: store.farm?.footer, alignment: 'center' },
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

      {
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
            ...payload.products.map((el: { product: Product; quantity: number }) => {
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
      },
      {
        text: `Total       ${priceFormatter(
          payload.products.reduce(
            (acc: number, el: { product: Product; quantity: number }) => acc + el.product.price * el.quantity,
            0,
          ),
        )}`,
        alignment: 'right',
      },
      { qr: payload.id, fit: '80' },
      ...(payload.type === 'Invoice' ? [{ text: 'Livraisons liees', alignment: 'right' }] : []),
      ...(payload.deliveryDocumentIds
        ? payload.deliveryDocumentIds?.map((text: string) => ({
            text,
            alignment: 'right',
          }))
        : []),
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

  pdfMake.createPdf(docDefinition, undefined, fonts).open();
};
