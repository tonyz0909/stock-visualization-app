import React from "react";
// import {
//     PieChart, Pie, Legend, Tooltip,
// } from 'recharts';
import { Pie } from 'react-chartjs-2';

const OwnershipChart = (props) => {

    const data = {
        labels: props.chartData.map(x => x.name),
        datasets: [{
            label: 'Percent',
            data: props.chartData.map(x => x.value),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
            ],
            borderWidth: 1,
        }]
    }

    const options = {
        legend: {
            labels: {
                fontColor: 'white'
            }
        }
    }

    return (
        <Pie data={data} options={options}/>
    );
}

export default OwnershipChart;