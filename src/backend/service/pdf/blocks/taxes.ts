import { computeTaxes, getCountry } from '../../../../utils/aggregations';
import { priceFormatter } from '../../../../utils/formatter';
import { Farm } from '../../../entity/farm';
import { Invoice } from '../../../entity/invoice';

export async function taxes(invoice: Invoice, farm: Farm) {
  const country = getCountry(farm?.country);
  const taxes = await computeTaxes(invoice, country.value);

  return {
    margin: [0, 0, 0, 10],
    table: {
      widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
      headerRows: 1,
      body: [
        ['Code TVA', 'Taux TVA', 'Montant TTC', 'Montant TVA', 'Montant HT'],
        ...taxes.detail.map((line) => [
          { text: line.taxValue?.code, alignment: 'right' },
          { text: line.taxValue?.label, alignment: 'right' },
          { text: priceFormatter(line.ttc, country.currency), alignment: 'right' },
          { text: priceFormatter(line.tax, country.currency), alignment: 'right' },
          { text: priceFormatter(line.ht, country.currency), alignment: 'right' },
        ]),
      ],
    },
  };
}
