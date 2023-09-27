import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import moment from 'moment';
import 'moment/locale/fr';
import { useEffect, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Customer, store } from '../../../backend';
import { getInvoicePrice } from '../../../utils/aggregations';
import { priceFormatter } from '../../../utils/formatter';
moment.locale('fr');

interface SalesGraphProps {
  customer: Customer;
}

Chart.register(...registerables);

export function SalesGraph({ customer }: SalesGraphProps) {
  const [mode, setMode] = useState('month');
  const snap = useSnapshot(store);
  const chartRef = useRef(null);

  const customerInvoice = store.invoices.filter((invoice) => invoice.customerId === customer.id);

  const total = customerInvoice.reduce((acc, invoice) => acc + getInvoicePrice(invoice), 0);

  useEffect(() => {
    let formatString: string;
    if (mode === 'month') {
      formatString = 'MMM YYYY';
    } else {
      formatString = 'DD MMM';
    }

    if (chartRef.current && customerInvoice.length > 0) {
      const aggregatedData = customerInvoice.reduce<{ [key: string]: number }>((acc, invoice) => {
        const period = moment(invoice.createdAt).locale('fr').format(formatString);
        acc[period] = (acc[period] || 0) + getInvoicePrice(invoice);
        return acc;
      }, {});

      const sortedLabels = Object.keys(aggregatedData).sort(
        (a, b) => moment(a, 'MMM YYYY').valueOf() - moment(b, 'MMM YYYY').valueOf(),
      );
      const sortedData = sortedLabels.map((label) => aggregatedData[label]);
      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: sortedLabels,
          datasets: [
            {
              label: 'Graphique de vos factures',
              data: sortedData,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
            },
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value + ' €';
                },
              },
            },
          },
        },
      });

      return () => chart.destroy();
    }
  }, [customerInvoice, mode]);

  return (
    <div>
      <div>
        {`${customerInvoice.length} facture${customerInvoice.length > 1 ? 's' : ''}, total: ${priceFormatter(total)}`}
      </div>
      <canvas
        ref={chartRef}
        height="300"
        width="500"
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      ></canvas>
      <button onClick={() => setMode(mode === 'month' ? 'week' : 'month')}>
        Switch to {mode === 'month' ? 'Week' : 'Month'}
      </button>
    </div>
  );
}
