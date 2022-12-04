import * as pdfMake from 'pdfmake/build/pdfmake';
import { Product } from '../entity/product';
import {store} from "./store";

const fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
  },
};

const titles = {
  Delivery: 'Bon de livraison',
  Invoice: 'Facture',
};

type DocumentKey = 'Delivery' | 'Invoice';

export const exportDocument = ({ payload }: any) => {
  const title = titles[payload.type as DocumentKey] || '';
  const docDefinition: any = {
    defaultStyle: {
      font: 'Roboto',
    },
    footer: { text: `${title} genere gratuitement grace a Oseille`, alignment: 'center' },
    content: [
      { text: title, style: 'header' },
      {
        layout: 'noBorders',
        style: 'tableExample',
        table: {
          widths: ['*', '*'],
          body: [[store.farm?.title || 'La ferme sans nom', { text: payload.customer.name, alignment: 'right' }]],
        },
      },

      {
        layout: 'lightHorizontalLines',
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*'],
          body: [
            ['Produit', 'Prix', 'Quantite', 'Total'],
            ...payload.products.map((el: { product: Product; quantity: number }) => {
              return [el.product.name, el.product.price, el.quantity, el.product.price * el.quantity];
            }),
          ],
        },
      },
      {
        text: `Total: ${payload.products.reduce((acc: number, el: { product: Product; quantity: number }) => {
          return acc + el.product.price * el.quantity;
        }, 0)}`,
      },
      { qr: payload._id, fit: '80', alignment: 'right' },
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
