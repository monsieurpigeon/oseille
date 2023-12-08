import { AgChartsReact } from 'ag-charts-react';
import { compareAsc, format, startOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { Invoice } from '../../../backend';
import { getInvoiceTotal } from '../../../utils/aggregations';
import { Country } from '../../../utils/defaults';
import { priceFormatter } from '../../../utils/formatter';

interface SalesGraphProps {
  invoices: Invoice[];
}

export function SalesGraph({ invoices: invoicesClone }: SalesGraphProps) {
  const invoices = useMemo(() => _.cloneDeep(invoicesClone), [invoicesClone]);
  const { country } = useRouteLoaderData('farm') as { country: Country };
  const [total, setTotal] = useState(0);
  const [chartOptions, setChartOptions] = useState({});

  const aggregatedData: { [key: string]: { total: number; date: Date } } = {};

  useEffect(() => {
    async function calculateTotalAndData() {
      const sortedInvoices = invoices.sort((a, b) => compareAsc(new Date(a.createdAt), new Date(b.createdAt)));

      // Transforme les factures en promesses pour obtenir les totaux
      const totalsPromises = sortedInvoices.map(async (invoice) => {
        const total = await getInvoiceTotal(invoice, true, country.value);
        return { invoice, total };
      });

      // Attendre toutes les promesses
      const totals = await Promise.all(totalsPromises);

      // Maintenant, vous pouvez utiliser .reduce() sur les résultats
      const sum = totals.reduce((acc, { invoice, total }) => {
        const invoiceDate = startOfMonth(new Date(invoice.createdAt));
        const period = format(invoiceDate, 'MMM yyyy', { locale: fr });

        if (!aggregatedData[period]) {
          aggregatedData[period] = { total: 0, date: invoiceDate };
        }
        aggregatedData[period].total += total;

        return acc + total;
      }, 0);

      setTotal(sum);

      const chartData = Object.entries(aggregatedData)
        .map(([period, data]) => ({ period, total: data.total, date: data.date }))
        .sort((a, b) => compareAsc(a.date, b.date));

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
  }, [invoices, country]);

  return (
    <div>
      <div>{`${invoices.length} facture${invoices.length > 1 ? 's' : ''}, total: ${priceFormatter(
        total,
        country.currency,
      )}`}</div>
      {invoices.length > 0 && (
        <div style={{ width: '100%', height: '300px' }}>
          <AgChartsReact options={chartOptions} />
        </div>
      )}
    </div>
  );
}
