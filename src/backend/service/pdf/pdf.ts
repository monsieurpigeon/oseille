import * as pdfMake from 'pdfmake/build/pdfmake';
import { getIsTVA } from '../../../utils/aggregations';
import { dateFormatter } from '../../../utils/formatter';
import { FrBio01, FrBio09, FrBio15 } from '../../../utils/labels';
import { Delivery } from '../../entity/delivery';
import { store } from '../store';
import { addresses } from './blocks/addresses';
import { lines } from './blocks/lines';
import { taxes } from './blocks/taxes';
import { totals } from './blocks/totals';

const fonts = {
  Roboto: {
    normal: `${window.location.origin}/fonts/Roboto-Regular.ttf`,
    bold: `${window.location.origin}/fonts/Roboto-Medium.ttf`,
    italics: `${window.location.origin}/fonts/Roboto-Italic.ttf`,
    bolditalics: `${window.location.origin}/fonts/Roboto-MediumItalic.ttf`,
  },
};

export const DocumentType = {
  delivery: 'Delivery',
  invoice: 'Invoice',
} as const;

export type DocumentType = typeof DocumentType[keyof typeof DocumentType];

const getBioLogo = (label: string | undefined) => {
  switch (label) {
    case 'fr-bio-01':
      return FrBio01;
    case 'fr-bio-15':
      return FrBio15;
    case 'fr-bio-09':
      return FrBio09;

    default:
      return '';
  }
};

export const exportDocument = ({ payload, type, open = false }: any) => {
  const isTVA = type === DocumentType.delivery ? payload.isTVA : getIsTVA(payload);
  const currentCustomer = store.customers.find((customer) => customer.id === payload.customerId);

  const docDefinition: any = {
    defaultStyle: {
      font: 'Roboto',
    },
    info: {
      title: payload.documentId,
    },
    footer: [
      {
        text: store.farm?.footer,
        alignment: 'center',
      },
      {
        text: 'Généré gratuitement grâce à Oseille - www.oseille.app',
        alignment: 'center',
        color: 'grey',
        characterSpacing: 1,
        fontSize: 10,
      },
    ],
    content: [
      addresses(
        { ...payload, customer: currentCustomer },
        type,
        !!store.farm?._attachements?.logo,
        !!store.farm?.bioLabel && store.farm?.bioLabel !== 'non',
      ),
      { text: `${payload.documentId}`, style: 'header' },
      {
        text: `Date: ${dateFormatter(type === DocumentType.invoice ? payload.createdAt : payload.deliveredAt)}`,
        style: 'header',
      },
      lines(payload, type),
      ...(isTVA && type === DocumentType.invoice ? [taxes(payload)] : []),
      totals(payload, type, store.farm),
      { columns: [{ qr: payload.id, fit: '50' }, { text: `Notes: ${payload.notes ?? ''}` }] },
    ],
    images: {
      logo: store.farm?._attachements?.logo?.data || '',
      bio: getBioLogo(store.farm?.bioLabel),
    },
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
        margin: [0, 0, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black',
      },
    },
  };
  if (open) {
    pdfMake.createPdf(docDefinition, undefined, fonts).open();
  } else {
    pdfMake.createPdf(docDefinition, undefined, fonts).download(payload.documentId);
  }
};

const getDeliveryNumber = (id: string) => {
  return Number(id.split('-')[2]);
};

export const exportOrders = (payload: Delivery[]) => {
  const products = payload
    .flatMap((delivery) => delivery.lines.map((line) => line.product))
    .reduce((acc, product) => {
      if (!acc[product.id]) {
        acc[product.id] = product;
      }
      return acc;
    }, {});

  const docDefinition: any = {
    defaultStyle: {
      font: 'Roboto',
      alignment: 'right',
    },
    info: {
      title: 'Commandes',
    },
    content: [
      { text: `Bilan des commandes - Imprimé le ${new Date().toLocaleDateString()}`, alignment: 'left' },
      {
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 20],
        table: {
          headerRows: 1,
          width: ['auto', ...payload.map(() => 'auto')],
          body: [
            ['', 'TOTAL', 'unité', ...payload.map((delivery) => getDeliveryNumber(delivery.documentId))],
            ...Object.keys(products).map((id) => {
              const productColumns = payload.map((delivery) =>
                delivery.lines.filter((line) => line.product.id === id).reduce((acc, line) => acc + line.quantity, 0),
              );
              const total = productColumns.reduce((acc, column) => acc + column, 0);
              return [
                { text: products[id].name, alignment: 'left' },
                total,
                { text: products[id].unit, alignment: 'left' },
                ...productColumns.map((column) => {
                  return column > 0 ? column : '.';
                }),
              ];
            }),
          ],
        },
      },
      ...payload.map((delivery) => ({
        text: `${dateFormatter(delivery.deliveredAt)} | ${getDeliveryNumber(delivery.documentId)} | ${
          delivery.customer.name
        }`,
        alignment: 'left',
      })),
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
        margin: [0, 0, 0, 15],
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
