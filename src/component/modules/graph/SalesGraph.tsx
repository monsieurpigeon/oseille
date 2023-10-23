import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import moment from 'moment';
import 'moment/locale/fr';
import { useEffect, useRef, useState } from 'react';
import { Invoice } from '../../../backend';
import { getInvoiceTotal } from '../../../utils/aggregations';
import { priceFormatter } from '../../../utils/formatter';

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

function translate_month(month: string) {
  return months[month] || month;
}

interface SalesGraphProps {
  invoices: Invoice[];
}

Chart.register(...registerables);

export function SalesGraph({ invoices }: SalesGraphProps) {
  const chartRef = useRef(null);

  const [total, setTotal] = useState(0);
  const [data, setData] = useState<{ [key: string]: number }>({});
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    async function calculateTotal() {
      const sum = await Promise.all(invoices.map((invoice) => getInvoiceTotal(invoice, true))).then((totals) =>
        totals.reduce((acc, total) => acc + total, 0),
      );
      setTotal(sum);
    }
    calculateTotal();
  }, [invoices]);

  useEffect(() => {
    if (chartRef.current && invoices.length > 0) {
      const formatString = 'MMM YYYY';
      invoices.sort((a, b) => moment(a.createdAt).diff(moment(b.createdAt)));

      let minMonth = moment(invoices[0].createdAt);
      let maxMonth = moment(invoices[invoices.length - 1].createdAt);

      const labels: string[] = [];
      let aggregatedData: { [key: string]: number } = {};

      let currentMonth = minMonth.startOf('month');
      while (currentMonth.isBefore(maxMonth) || currentMonth.isSame(maxMonth, 'month')) {
        const label = currentMonth.format(formatString);
        labels.push(label);
        aggregatedData[label] = 0;
        currentMonth.add(1, 'month');
      }
      setLabels(labels);

      const getData = async () => {
        return invoices.reduce(async (memo, invoice) => {
          const acc = await memo;
          const period = moment(invoice.createdAt).format(formatString);
          const result = await getInvoiceTotal(invoice, true);
          acc[period] += result;
          return Promise.resolve(acc);
        }, Promise.resolve(aggregatedData));
      };

      getData().then((data) => setData(data));
    }
  }, [invoices]);

  useEffect(() => {
    if (chartRef.current && invoices.length > 0) {
      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels.map((label) => {
            const month = label.split(' ')[0];
            const year = label.split(' ')[1];
            return translate_month(month) + ' ' + year;
          }),
          datasets: [
            {
              data: labels.map((label) => data[label]),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (value) => priceFormatter(value.raw as number),
              },
            },
          },
          scales: {
            x: {
              type: 'category',
            },
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => priceFormatter(value as number),
              },
            },
          },
        },
      });

      return () => chart.destroy();
    }
  }, [data]);

  return (
    <div>
      <div>{`${invoices.length} facture${invoices.length > 1 ? 's' : ''}, total: ${priceFormatter(total)}`}</div>
      <canvas
        ref={chartRef}
        height="300"
        width="500"
        style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}
