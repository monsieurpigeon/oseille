import {
  getDeliveryPrice,
  getDeliveryTaxes,
  getInvoicePrice,
  getInvoiceTaxes,
  getIsTVA,
} from '../../../../utils/aggregations';
import { DEFAULT_INVOICE_DELAY } from '../../../../utils/defaults';
import { dateFormatterDelay, priceFormatter } from '../../../../utils/formatter';
import { Farm } from '../../../entity/farm';
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

export const totals = (payload: any, type: DocumentType, farm: Farm | null) => {
  const isTVA = type === DocumentType.delivery ? payload.isTVA : getIsTVA(payload);
  const totalHT = getPrice(payload, type);
  const totalTaxes = getTaxes(payload, type);
  return {
    layout: 'noBorders',
    style: 'tableExample',
    table: {
      widths: ['*', 10, 130],
      body: [
        [
          type === DocumentType.invoice
            ? [
                {
                  columns: [
                    { text: 'Échéance', bold: true, width: 150 },
                    { text: dateFormatterDelay(payload.createdAt, DEFAULT_INVOICE_DELAY) },
                  ],
                  margin: [0, 4],
                },
                {
                  text: 'Escompte pour paiement anticipé : néant',
                  margin: [0, 4],
                },
                {
                  text: 'En cas de retard de paiement, montant forfaitaire de 40€ pour frais de recouvrement',
                },
                ...(farm?.rib
                  ? [
                      {
                        text: `RIB : ${farm.rib}`,
                        bold: true,
                        margin: [0, 4],
                      },
                    ]
                  : []),
                ...(farm?.iban
                  ? [
                      {
                        text: `IBAN ${farm.iban} BIC ${farm.bic ?? ''}`,
                        bold: true,
                        margin: [0, 4],
                      },
                    ]
                  : []),
                ...(farm?.siret
                  ? [{ text: `Siret : ${farm.siret} - code naf : ${farm.naf ?? ''}`, margin: [0, 4] }]
                  : []),
              ]
            : [],
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
