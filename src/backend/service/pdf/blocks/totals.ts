import {
  computeCanadaTaxes,
  computeTaxes,
  getCountry,
  getDeliveryTotal,
  getIsTVA,
  TaxLine,
} from '../../../../utils/aggregations';
import { DEFAULT_INVOICE_DELAY, DEFAULT_THREAT } from '../../../../utils/defaults';
import { dateFormatterDelay, priceFormatter } from '../../../../utils/formatter';
import { Delivery } from '../../../entity/delivery';
import { Farm } from '../../../entity/farm';
import { Invoice } from '../../../entity/invoice';
import { DocumentType } from '../pdf';

export const totals = async (payload: Delivery | Invoice, type: DocumentType, farm: Farm | null) => {
  const isTVA = type === DocumentType.delivery ? (payload as Delivery).isTVA : await getIsTVA(payload as Invoice);
  const isCanada = farm?.country === 'CA';
  const country = getCountry(farm?.country);

  let totals;

  if (type === DocumentType.invoice) {
    const invoice = payload as Invoice;
    if (isCanada) {
      totals = await computeCanadaTaxes(invoice);
    } else {
      totals = await computeTaxes(invoice, country.value);
    }
  } else {
    totals = { total: { ht: getDeliveryTotal(payload as Delivery), tax: 0, ttc: 0 } };
  }
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
                    {
                      text: dateFormatterDelay(
                        (payload as Invoice).createdAt,
                        farm?.invoiceDelay ?? DEFAULT_INVOICE_DELAY,
                      ),
                    },
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
                ...(isTVA && !isCanada && type === DocumentType.invoice
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
                ...(isTVA && isCanada && type === DocumentType.invoice
                  ? [
                      [
                        'T.P.S.',
                        ':',
                        {
                          text: priceFormatter(
                            (totals?.total as TaxLine & { tps: number; tvq: number }).tps || 0,
                            country.currency,
                          ),
                          alignment: 'right',
                        },
                      ],
                      [
                        'T.V.Q.',
                        ':',
                        {
                          text: priceFormatter(
                            (totals?.total as TaxLine & { tps: number; tvq: number }).tvq || 0,
                            country.currency,
                          ),
                          alignment: 'right',
                        },
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
