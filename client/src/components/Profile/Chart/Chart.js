import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = () => (
  <div>
    <Line
      data={{
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
          {
            label: 'Personal Return',
            data: [12, 19, 3, 2, 3, 4, 5, 4, 7, 15, 20],
            fill: true,
            backgroundColor: 'rgba(0, 200, 5, 0.1)',
            borderColor: 'rgb(0, 200, 5)',
            tension: 0.4,
            borderWidth: 2,
          },
          {
            label: 'SPX 500',
            data: [11, 3, 5, 6, 8, 12, 8, 4, 9, 12, 15],
            fill: false,
            borderColor: 'rgba(0, 200, 5, 0.3)',
            tension: 0.4,
            borderWidth: 2,
          },
        ],
      }}
      height={200}
      width={400}
      options={{
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }}
    />
  </div>
);

export default Chart;
