import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';

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
    layout: {
        padding: {
            left: 15,
            right: 20,
            top: 20,
            bottom: 20
        }
    },
    elements: {
        point:{
            radius: 0
        }
    }
}

const ChartJS = (props) => {
    console.log(props);

    const data = {
        labels: props.chartData.map(x => x.date),
        datasets: [
            {
                data: props.chartData.map(x => x.close),
                fill: false,
                backgroundColor: 'rgb(63, 81, 181)',
                borderColor: 'rgb(63, 81, 181)',
            },
        ],
    }

    console.log(data);

    return (
        <Line data={data} options={options} />
    )
}

export default ChartJS;