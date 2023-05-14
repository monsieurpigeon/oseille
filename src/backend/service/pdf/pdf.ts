import * as pdfMake from 'pdfmake/build/pdfmake';
import { store } from '../store';
import { addresses } from './blocks/addresses';
import { lines } from './blocks/lines';
import { totals } from './blocks/totals';
import { FrBio01 } from '../../../utils/labels';

const fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
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
    default:
      return '';
  }
};

export const exportDocument = ({ payload, type }: any) => {
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
      addresses(payload, type, !!store.farm?._attachements?.logo, store.farm?.bioLabel !== 'non'),
      { text: `${payload.documentId}`, style: 'header' },
      lines(payload, type),
      totals(payload, type),
      { columns: [{ qr: payload.id, fit: '80' }, { text: `Notes: ${payload.notes ?? ''}` }] },
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

  pdfMake.createPdf(docDefinition, undefined, fonts).download(payload.documentId);
  //pdfMake.createPdf(docDefinition, undefined, fonts).open();
};
