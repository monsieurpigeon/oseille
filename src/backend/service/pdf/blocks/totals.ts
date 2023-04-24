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
      widths: ['*', 'auto'],
      body: [
        [
          '',
          {
            layout: 'noBorders',
            table: {
              alignment: 'right',
              widths: ['auto', 'auto', 'auto'],
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
