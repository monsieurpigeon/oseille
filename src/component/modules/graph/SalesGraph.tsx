import { AgChartsReact } from 'ag-charts-react';
import { addMonths, format } from 'date-fns';
import { useState } from 'react';

export function SalesGraph() {
  const months = Array.from({ length: 12 }).map((_, index) => format(addMonths(new Date(0, index), 0), 'MMM'));
  const salesData = [162000, 0, 302000, 800000, 1254000, 950000, 200000];

  const chartData = months.map((month, index) => ({
    month: month,
    iceCreamSales: salesData[index] || 0,
  }));

  const [chartOptions, setChartOptions] = useState({
    data: chartData,
    series: [{ type: 'bar' as const, xKey: 'month', yKey: 'iceCreamSales' }],
  });

  return (
    // AgCharsReact component with options passed as prop
    <AgChartsReact options={chartOptions} />
  );
}

// export default SalesGraph;
