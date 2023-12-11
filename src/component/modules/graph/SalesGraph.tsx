import { AgChartsReact } from 'ag-charts-react';
import { compareAsc, format, startOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { Delivery } from '../../../backend';
import { getDeliveryTotal } from '../../../utils/aggregations';
import { Country } from '../../../utils/defaults';
import { priceFormatter } from '../../../utils/formatter';

interface SalesGraphProps {
  deliveries: Delivery[];
}

export function SalesGraph({ deliveries: deliveriesClone }: SalesGraphProps) {
  const deliveries = useMemo(() => _.cloneDeep(deliveriesClone) || [], [deliveriesClone]);
  const { country } = useRouteLoaderData('farm') as { country: Country };
  const [total, setTotal] = useState(0);
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    async function calculateTotalAndData() {
      const aggregatedData: { [key: string]: { total: number; date: Date } } = {};
      const sortedDeliveries = [...deliveries].sort((a, b) =>
        compareAsc(new Date(a.deliveredAt), new Date(b.deliveredAt)),
      );

      const totalsPromises = sortedDeliveries.map(async (delivery) => {
        const total = getDeliveryTotal(delivery);
        return { delivery, total };
      });

      const totals = await Promise.all(totalsPromises);

      const sum = totals.reduce((acc, { delivery, total }) => {
        const deliveryDate = startOfMonth(new Date(delivery.deliveredAt));
        const period = format(deliveryDate, 'MMM yyyy', { locale: fr });

        if (!aggregatedData[period]) {
          aggregatedData[period] = { total: 0, date: deliveryDate };
        }
        aggregatedData[period].total += total;

        return acc + total;
      }, 0);
      setTotal(sum);

      const chartData = Object.entries(aggregatedData)
        .map(([period, data]) => ({ period, total: data.total, date: data.date }))
        .sort((a, b) => compareAsc(a.date, b.date));
      console.log('chartData', chartData);

      setChartOptions({
        autoSize: true,
        data: chartData,
        series: [
          {
            xKey: 'period',
            yKey: 'total',
            type: 'bar',
          },
        ],
      });
    }
    calculateTotalAndData();
  }, [deliveries, country]);

  return (
    <div>
      <div>{`${deliveries.length} facture${deliveries.length > 1 ? 's' : ''}, total: ${priceFormatter(
        total,
        country.currency,
      )}`}</div>
      {deliveries.length > 0 && (
        <div style={{ width: '100%', height: '300px' }}>
          <AgChartsReact options={chartOptions} />
        </div>
      )}
    </div>
  );
}
