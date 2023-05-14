import { TVA_RATES } from '../../../../utils/defaults';
import { priceFormatter } from '../../../../utils/formatter';
import { store } from '../../store';

export function taxes(payload: any) {
  const deliveries = payload.deliveries.flatMap((id: string) => {
    const delivery = store.deliveries.find((d) => d.id === id);
    return delivery?.lines.map((line) => ({
      value: line.price * line.quantity,
      tvaRate: line.product.tva,
      tvaCode: TVA_RATES.find((rate) => rate.value === line.product.tva)?.code || 1,
    }));
  });

  const lines = TVA_RATES.map((rate) => {
    return deliveries
      .filter((delivery: any) => delivery.tvaCode === rate.code)
      .reduce(
        (acc: any, delivery: any) => {
          acc.totalTtc += delivery.value * (1 + +delivery.tvaRate / 100);
          acc.totalTva += (delivery.value * +delivery.tvaRate) / 100;
          acc.totalHt += delivery.value;
          return acc;
        },
        { tvaCode: rate.code, tva: rate.label, totalTtc: 0, totalTva: 0, totalHt: 0 },
      );
  }).filter((line) => line.totalHt > 0);

  return {
    table: {
      widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
      headerRows: 1,
      body: [
        ['Code TVA', 'Taux TVA', 'Montant TTC', 'Montant TVA', 'Montant HT'],
        ...lines.map((line) => [
          { text: line.tvaCode, alignment: 'right' },
          { text: line.tva, alignment: 'right' },
          { text: priceFormatter(line.totalTtc), alignment: 'right' },
          { text: priceFormatter(line.totalTva), alignment: 'right' },
          { text: priceFormatter(line.totalHt), alignment: 'right' },
        ]),
      ],
    },
  };
}
