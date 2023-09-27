import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import moment from 'moment';
import 'moment/locale/fr';
import { useEffect, useRef } from 'react';
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
  const snap = useSnapshot(store);
  const chartRef = useRef(null);

  const customerInvoice = store.invoices.filter((invoice) => invoice.customerId === customer.id);

  const total = customerInvoice.reduce((acc, invoice) => acc + getInvoicePrice(invoice), 0);

  useEffect(() => {
    if (chartRef.current && customerInvoice.length > 0) {
      const aggregatedData = customerInvoice.reduce<{ [key: string]: number }>((acc, invoice) => {
        const month = moment(invoice.createdAt).locale('fr').format('MMM YYYY');
        acc[month] = (acc[month] || 0) + getInvoicePrice(invoice);
        return acc;
      }, {});

      const labels = Object.keys(aggregatedData);
      const data = Object.values(aggregatedData);

      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Montant de la Facture par Mois',
              data,
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
  }, [customerInvoice]);

  return (
    <div>
      <div>
        {`${customerInvoice.length} facture${customerInvoice.length > 1 ? 's' : ''}, total: ${priceFormatter(total)}`}
      </div>
      <canvas
        ref={chartRef}
        height="400"
        width="600"
      ></canvas>
    </div>
  );
}
