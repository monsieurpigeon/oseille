import { computeTaxes } from '../../../../utils/aggregations';
import { priceFormatter } from '../../../../utils/formatter';

export function taxes(payload: any) {
  const taxes = computeTaxes(payload);

  return {
    table: {
      widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
      headerRows: 1,
      body: [
        ['Code TVA', 'Taux TVA', 'Montant TTC', 'Montant TVA', 'Montant HT'],
        ...taxes.detail.map((line) => [
          { text: line.taxValue?.code, alignment: 'right' },
          { text: line.taxValue?.label, alignment: 'right' },
          { text: priceFormatter(line.ttc), alignment: 'right' },
          { text: priceFormatter(line.tax), alignment: 'right' },
          { text: priceFormatter(line.ht), alignment: 'right' },
        ]),
      ],
    },
  };
}
