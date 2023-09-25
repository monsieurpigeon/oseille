import { useRef, useEffect } from 'react'
import { Chart } from "chart.js"

export function SalesChart() {
    const canvasRef = useRef(null);
    const sales = [
        { date: '2023-09-25', quantity: 10 },
        { date: '2023-10-02', quantity: 20 },
        { date: '2023-10-09', quantity: 30 },
        { date: '2023-10-16', quantity: 10 },
        { date: '2023-10-23', quantity: 50 },
        { date: '2023-10-30', quantity: 40 },
        { date: '2023-11-06', quantity: 20 },
        { date: '2023-11-13', quantity: 30 },
        { date: '2023-11-20', quantity: 10 },
        { date: '2023-11-27', quantity: 40 }
      ];
      useEffect(() => {
        const labels = sales.map(sale => sale.date);
        const data = sales.map(sale => sale.quantity);
      })
      
    
      return (
        <div>
          <canvas ref={canvasRef}></canvas>
        </div>
      );
    }


