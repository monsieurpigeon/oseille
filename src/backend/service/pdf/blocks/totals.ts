import { computeTaxes, getCountry, getDeliveryTotal, getIsTVA } from '../../../../utils/aggregations';
import { DEFAULT_INVOICE_DELAY, DEFAULT_THREAT } from '../../../../utils/defaults';
import { dateFormatterDelay, priceFormatter } from '../../../../utils/formatter';
import { Farm } from '../../../entity/farm';
import { DocumentType } from '../pdf';

export const totals = async (payload: any, type: DocumentType, farm: Farm | null) => {
  const isTVA = type === DocumentType.delivery ? payload.isTVA : await getIsTVA(payload);
  const country = getCountry(farm?.country);
  const totals =
    type === DocumentType.invoice
      ? await computeTaxes(payload, country.value)
      : { total: { ht: getDeliveryTotal(payload), tax: 0, ttc: 0 } };
  return {
    layout: 'noBorders',
    style: 'tableExample',
    table: {
      widths: ['*', 10, 150],
      body: [
        [
          type === DocumentType.invoice
            ? [
                {
                  columns: [
                    { text: 'Échéance', bold: true, width: 150 },
                    { text: dateFormatterDelay(payload.createdAt, farm?.invoiceDelay ?? DEFAULT_INVOICE_DELAY) },
                  ],
                },
                {
                  text: 'Escompte pour paiement anticipé : néant',
                },
                {
                  text: farm?.threat ?? DEFAULT_THREAT,
                },
                ...(farm?.rib
                  ? [
                      {
                        text: `RIB : ${farm.rib}`,
                        bold: true,
                      },
                    ]
                  : []),
                ...(farm?.iban
                  ? [
                      {
                        text: `IBAN ${farm.iban} BIC ${farm.bic ?? ''}`,
                        bold: true,
                      },
                    ]
                  : []),
                ...(farm?.siret ? [{ text: `Siret : ${farm.siret} - code naf : ${farm.naf ?? ''}` }] : []),
              ]
            : [],
          {},
          {
            layout: 'noBorders',
            table: {
              alignment: 'right',
              widths: [65, 'auto', '*'],
              body: [
                [
                  `Total${isTVA ? ' HT' : ''}`,
                  ':',
                  { text: priceFormatter(totals?.total.ht || 0, country.currency), alignment: 'right' },
                ],
                ...(isTVA && type === DocumentType.invoice
                  ? [
                      [
                        'Total TVA',
                        ':',
                        { text: priceFormatter(totals?.total.tax || 0, country.currency), alignment: 'right' },
                      ],
                      [
                        'Net à payer',
                        ':',
                        {
                          text: priceFormatter(totals?.total.ttc || 0, country.currency),
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
