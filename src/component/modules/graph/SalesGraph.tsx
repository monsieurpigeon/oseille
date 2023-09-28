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
    if (chartRef.current && customerInvoice.length > 0) {
      let formatString: string;
      if (mode === 'month') {
        formatString = 'MMM YYYY';
      } else {
        formatString = 'DD MMM';
      }

      let minMonth = moment(customerInvoice[0].createdAt);
      let maxMonth = moment(customerInvoice[0].createdAt);

      customerInvoice.forEach((invoice) => {
        const date = moment(invoice.createdAt);
        if (date.isBefore(minMonth)) minMonth = date;
        if (date.isAfter(maxMonth)) maxMonth = date;
      });

      const labels: string[] = [];
      let aggregatedData: { [key: string]: number } = {};

      let currentMonth = minMonth.startOf('month');
      while (currentMonth.isBefore(maxMonth) || currentMonth.isSame(maxMonth, 'month')) {
        const label = currentMonth.format(formatString);
        labels.push(label);
        aggregatedData[label] = 0;
        currentMonth.add(1, 'month');
      }

      aggregatedData = customerInvoice.reduce((acc, invoice) => {
        const period = moment(invoice.createdAt).format(formatString);
        acc[period] = (acc[period] || 0) + getInvoicePrice(invoice);
        return acc;
      }, aggregatedData);

      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels.map((label) => {
            if (mode === 'month') {
              const month = label.split(' ')[0];
              const year = label.split(' ')[1];
              return translate_month(month) + ' ' + year;
            }

            return translate_month(label);
          }),
          datasets: [
            {
              label: 'Graphique de vos factures',
              data: labels.map((label) => aggregatedData[label]),
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

  function translate_month(month: string) {
    const months: { [key: string]: string } = {
      Jan: 'Janv',
      Feb: 'Févr',
      Mar: 'Mars',
      Apr: 'Avr',
      May: 'Mai',
      Jun: 'Juin',
      Jul: 'Juil',
      Aug: 'Août',
      Sep: 'Sept',
      Oct: 'Oct',
      Nov: 'Nov',
      Dec: 'Déc',
    };
    return months[month] || month;
  }

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
