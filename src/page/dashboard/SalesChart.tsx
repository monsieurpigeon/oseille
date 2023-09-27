// import { useRef, useEffect } from 'react'
// import { Chart, ChartItem, registerables } from "chart.js"
// import {store} from "../../backend/service/store"
// import 'chartjs-adapter-moment';

// Chart.register(...registerables)

// export function SalesChart() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//     const sales = [
//         { date: '2023-01-25', quantity: 10 },
//         { date: '2023-02-02', quantity: 20 },
//         { date: '2023-03-09', quantity: 30 },
//         { date: '2023-04-16', quantity: 10 },
//         { date: '2023-05-23', quantity: 50 },
//         { date: '2023-06-30', quantity: 40 },
//         { date: '2023-07-13', quantity: 30 },
//         { date: '2023-08-20', quantity: 10 },
//         { date: '2023-09-27', quantity: 40 }
//       ];

//       store.customers
//       useEffect(() => {
//         if (canvasRef.current) { // Check if canvasRef.current is not null
//             const labels = sales.map(sale => sale.date);
//             const data = sales.map(sale => sale.quantity);

//             const chart = new Chart(canvasRef.current as ChartItem, {
//               type: 'line',
//               data: {
//                   labels,
//                   datasets: [{
//                       label: 'Historique des ventes',
//                       data,
//                       borderColor: 'rgb(75, 192, 192)',
//                       tension: 0.1,
//                   }]
//               },
//               options: {
//                   scales: {
//                       x: {
//                           type: 'time', // Changed to time for a time series chart
//                           time: {
//                               unit: 'month', // Display months on the x-axis
//                               displayFormats: {
//                                   month: 'MMM YYYY' // Format of the month label
//                               }
//                           }
//                       },
//                       y: {
//                           ticks: {
//                               stepSize: 10 // To ensure that the y-axis increments by 10
//                           },
//                           beginAtZero: true
//                       }
//                   }
//               }
//           });

//             // Cleaning up the chart instance on component unmount
//             return () => chart.destroy();
//         }
//     }, [sales]);

//       return (
//         <div style={{ width: '50%' }}>
//           <canvas ref={canvasRef}></canvas>
//         </div>
//       );
//     }
