import { useRef } from 'react';

import { Bar, Line, Pie, getElementsAtEvent } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    LogarithmicScale,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js/auto';

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

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
    const chartRef = useRef();
    const onClick = (event) => {
        if (getElementsAtEvent(chartRef.current, event).length > 0) {
            console.log(getElementsAtEvent(chartRef.current, event)[0].index)
            window.open(`/laporan/pers/apel?tingkat=resimen&nomor=${data.links[getElementsAtEvent(chartRef.current, event)[0].index]}`)
        }
        
    }
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
            stackWeight: 0
        },
        responsive: true,
        maintainAspectRatio: false
    }
    return (
        <Line data={data} options={options} onClick={onClick} ref={chartRef}/>
    )
}

export {
    PieChart,
    BarChart,
    LineChart
};