import React, { useState, useEffect } from "react";
// import {
//     PieChart, Pie, Legend, Tooltip,
// } from 'recharts';
import { Pie } from 'react-chartjs-2';

const OwnershipChart = (props) => {
    let { chartColor } = props.chartSpec;

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
        // <PieChart width={400} height={400}>
        //   <Pie dataKey="value" data={props.chartData} cx={200} cy={200} outerRadius={80} fill={chartColor} label />
        //   {/* <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
        //   <Tooltip />
        // </PieChart>
        <Pie data={data} options={options}/>
    );
}

export default OwnershipChart;