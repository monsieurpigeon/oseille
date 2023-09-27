import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { Customer, store } from '../../../backend';
import { getInvoicePrice } from '../../../utils/aggregations';
import { priceFormatter } from '../../../utils/formatter';

interface SalesGraphProps {
  customer: Customer;
}

Chart.register(...registerables);

export function SalesGraph({ customer }: SalesGraphProps) {
  const snap = useSnapshot(store);
  const chartRef = useRef(null);

  const customerInvoice = store.invoices.filter((invoice) => invoice.customerId === customer.id);

  const total = customerInvoice.reduce((acc, invoice) => acc + getInvoicePrice(invoice), 0);
  const momentDate = moment('15/08/2023', 'DD/MM/YYYY');
  useEffect(() => {
    if (chartRef.current && customerInvoice.length > 0) {
      const labels = customerInvoice.map((invoice) =>
        moment(new Date(invoice.createdAt).toLocaleDateString(), 'DD/MM/YYYY'),
      );
      const data = customerInvoice.map((invoice) => getInvoicePrice(invoice));

      const chart = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Montant de la Facture',
              data,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'month',
                displayFormats: {
                  month: 'MMM YYYY',
                },
              },
            },
            y: {
              beginAtZero: true,
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
