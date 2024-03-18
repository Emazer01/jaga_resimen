import * as React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const PieChart = ({ data }) => {
    return (
        <Pie data={data} option={{ maintainAspectRatio: false }} />

    )
}

const BarChart = ({ data }) => {
    return (
        <Bar data={data} option={{ maintainAspectRatio: false }} />
    )
}

const LineChart = ({ data }) => {
    const options = {
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    maxRotation: 90,
                    padding: 0
                }
            },
            y: {
                min: 0,
                ticks: {
                    autoSkip: false
                },
                weight: 5
            },
            stackWeight: 10
        },
        responsive: true,
        maintainAspectRatio: false
    }
    return (
        <Line data={data} options={options} />
    )
}

export {
    PieChart,
    BarChart,
    LineChart
};