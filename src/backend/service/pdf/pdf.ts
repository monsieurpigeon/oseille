import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getIsTVA } from '../../../utils/aggregations';
import { CountryCode } from '../../../utils/defaults';
import { dateFormatter } from '../../../utils/formatter';
import { FrBio01, FrBio09, FrBio10, FrBio15, FrBio16 } from '../../../utils/labels';
import { getCustomerById } from '../../entity/customer';
import { Delivery } from '../../entity/delivery';
import { getFarm } from '../../entity/farm';
import { Invoice, paymentModesMap } from '../../entity/invoice';
import { Product } from '../../entity/product';
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
    case 'fr-bio-09':
      return FrBio09;
    case 'fr-bio-10':
      return FrBio10;
    case 'fr-bio-15':
      return FrBio15;
    case 'fr-bio-16':
      return FrBio16;
    default:
      return '';
  }
};

export const exportDocument = async ({
  payload,
  type,
  open = false,
}: {
  payload: Delivery | Invoice;
  type: DocumentType;
  open?: boolean;
}) => {
  const isTVA = type === DocumentType.delivery ? (payload as Delivery).isTVA : await getIsTVA(payload as Invoice);
  const currentCustomer = await getCustomerById(payload.customer as string);
  const farm = await getFarm();
  const docDefinition: unknown = {
    defaultStyle: {
      font: 'Roboto',
    },
    info: {
      title: payload.documentId,
    },
    footer: [
      {
        text: farm?.footer,
        alignment: 'center',
      },
      // {
      //   text: 'Généré gratuitement grâce à Oseille - www.oseille.app',
      //   alignment: 'center',
      //   color: 'grey',
      //   characterSpacing: 1,
      //   fontSize: 10,
      // },
    ],
    content: [
      addresses(
        { ...payload, customer: currentCustomer },
        type,
        !!farm?._attachements?.logo,
        !!farm?.bioLabel && farm?.bioLabel !== 'non',
        farm,
      ),
      {
        columns: [
          [
            { text: `${payload.documentId}`, style: 'header' },
            {
              text: `Date: ${dateFormatter(
                type === DocumentType.invoice ? (payload as Invoice).createdAt : (payload as Delivery).deliveredAt,
              )}`,
              style: 'header',
            },
          ],
          ...[
            type === DocumentType.invoice && (payload as Invoice).payments?.length
              ? [
                  { text: 'PAYÉ', style: 'alert' },
                  {
                    text: `Par ${
                      paymentModesMap[(payload as Invoice).payments?.[0]?.paymentMode ?? 0]
                    } le ${dateFormatter((payload as Invoice).payments?.[0]?.paidAt ?? '')}`,
                  },
                  { text: (payload as Invoice).payments?.[0]?.reference, bold: true },
                ]
              : null,
          ],
        ],
      },
      await lines(payload, type, farm),
      ...(isTVA && type === DocumentType.invoice && farm.country !== CountryCode.CA
        ? [await taxes(payload as Invoice, farm)]
        : []),
      await totals(payload, type, farm),
      {
        columns: [{ qr: payload.id, fit: '50' }, { text: `Notes: ${payload.notes ?? ''}` }],
      },
    ],
    images: {
      logo: farm?._attachements?.logo?.data || '',
      bio: getBioLogo(farm?.bioLabel),
    },
    styles: {
      alert: {
        color: 'red',
        fontSize: 20,
        bold: true,
      },
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
    pdfMake.createPdf(docDefinition as TDocumentDefinitions, undefined, fonts).open();
  } else {
    pdfMake.createPdf(docDefinition as TDocumentDefinitions, undefined, fonts).download(payload.documentId);
  }
};

const getDeliveryNumber = (id: string) => {
  return Number(id.split('-')[2]);
};

export const exportOrders = async (payload: Delivery[]) => {
  const products = payload
    .flatMap((delivery) => delivery.lines.map((line) => line.product))
    .reduce((acc, product) => {
      if (!acc[product.id]) {
        acc[product.id] = product;
      }
      return acc;
    }, {} as { [key: string]: Product });

  const docDefinition: unknown = {
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
        margin: [0, 10],
        table: {
          headerRows: 1,
          width: ['auto', ...payload.map(() => 'auto')],
          body: [
            ['', 'TOTAL', 'unité', ...payload.map((delivery) => getDeliveryNumber(delivery.documentId))],
            ...Object.keys(products)
              .sort((a, b) => products[a].name.localeCompare(products[b].name))
              .map((id) => {
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
      ...(await Promise.all(
        payload.map(async (delivery) => {
          const currentCustomer = await getCustomerById(delivery.customer as string);
          return {
            text: `${dateFormatter(delivery.deliveredAt)} | ${getDeliveryNumber(delivery.documentId)} | ${
              currentCustomer.name
            }`,
            alignment: 'left',
          };
        }),
      )),
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

  pdfMake.createPdf(docDefinition as TDocumentDefinitions, undefined, fonts).open();
};
