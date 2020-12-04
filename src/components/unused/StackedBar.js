import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
}

const StackedBar = (props) => {

    const { chartData, stockData } = props;

    const data = {
        labels: ['50-day SMA', '200-day SMA', 'Current Price', 'Analyst price target'],
        datasets: [
            {
                label: 'Price (USD)',
                data: [chartData['50DayMovingAverage'], chartData['200DayMovingAverage'], chartData['currPrice'], chartData['AnalystTargetPrice']],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            }
        ]
    };

    return (
        <HorizontalBar data={data} options={options} />
    )
}

export default StackedBar