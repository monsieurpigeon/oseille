import {
  getDeliveryPrice,
  getDeliveryTaxes,
  getInvoicePrice,
  getInvoiceTaxes,
  getIsTVA,
} from '../../../../utils/aggregations';
import { priceFormatter } from '../../../../utils/formatter';
import { DocumentType } from '../pdf';

const getPrice = (payload: any, type: DocumentType) => {
  if (type === DocumentType.delivery) {
    return getDeliveryPrice(payload);
  }

  if (type === DocumentType.invoice) {
    return getInvoicePrice(payload);
  }

  return -1;
};

const getTaxes = (payload: any, type: DocumentType) => {
  if (type === DocumentType.delivery) {
    return getDeliveryTaxes(payload);
  }

  if (type === DocumentType.invoice) {
    return getInvoiceTaxes(payload);
  }

  return -1;
};

export const totals = (payload: any, type: DocumentType) => {
  const isTVA = type === DocumentType.delivery ? payload.isTVA : getIsTVA(payload);
  const totalHT = getPrice(payload, type);
  const totalTaxes = getTaxes(payload, type);
  return {
    layout: 'noBorders',
    style: 'tableExample',
    table: {
      widths: ['auto', 10, 130],
      body: [
        [
          [
            { columns: [{ text: 'Échéance', bold: true, width: 150 }, { text: '01/05/2022' }], margin: [0, 4] },
            {
              text: 'Escompte pour paiement anticipé : néant',
              margin: [0, 4],
            },
            {
              text: 'En cas de retard de paiement, montant forfaitaire de 40€ pour frais de recouvrement',
            },
            {
              text: 'RIB : 15589 24587 07495204343 95 CCM Montpon Menesterol',
              bold: true,
              margin: [0, 4],
            },
            {
              text: 'IBAN FR76 1558 9245 8707 4952 0434 395 BIC CMBRFR2BARK',
              bold: true,
              margin: [0, 4],
            },
            { text: 'Siret : 539690024 00028 - code naf : 0113Z', margin: [0, 4] },
          ],
          {},
          {
            layout: 'noBorders',
            table: {
              alignment: 'right',
              widths: ['auto', 'auto', '*'],
              body: [
                [`Total${isTVA ? ' HT' : ''}`, ':', { text: priceFormatter(totalHT), alignment: 'right' }],
                ...(isTVA
                  ? [
                      ['Total TVA', ':', { text: priceFormatter(totalTaxes), alignment: 'right' }],
                      [
                        'Net à payer',
                        ':',
                        {
                          text: priceFormatter(totalHT + totalTaxes),
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
  };
};
