import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Product } from '../entity/product';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

const titles = {
  Delivery: 'Bon de livraison',
  Invoice: 'Facture',
};

type DocumentKey = 'Delivery' | 'Invoice';

export const exportDocument = ({ payload }: any) => {
  const title = titles[payload.type as DocumentKey] || '';
  const docDefinition: any = {
    footer: { text: `${title} genere gratuitement grace a Oseille`, alignment: 'center' },
    content: [
      { text: title, style: 'header' },
      {
        layout: 'noBorders',
        style: 'tableExample',
        table: {
          widths: ['*', '*'],
          body: [['Ferme A', { text: payload.customer.name, alignment: 'right' }]],
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
    defaultStyle: {
      // alignment: 'justify'
    },
  };

  (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
  pdfMake.createPdf(docDefinition).open();
};
