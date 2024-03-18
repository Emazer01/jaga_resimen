import * as React from 'react';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import { verifikasi } from '../function/Verifikasi'
import { Heading, TimeInterval } from '../component/Minor';
import { Data, DataTrends } from '../data/Data';
import { BarChart, LineChart, PieChart } from '../component/Chart';

export const Dashboard = () => {
    document.title = 'Dashboard - Pusat Informasi Resimen Korps Kadet'
    const [userData, setUserData] = React.useState({
        labels: Data.map((data) => data.keterangan),
        datasets: [{
            label: "Jumlah",
            data: Data.map((data) => data.jumlah),
            backgroundColor: [
                "#0d6efd",
                "#198754",
                "#ffc107",
                "#dc3545"
            ]
        }]
    })

    const [trends, setTrends] = React.useState({
        labels: DataTrends.map((data) => data.laporan),
        datasets: [{
            label: "Hadir",
            data: DataTrends.map((data) => data.hadir),
            backgroundColor: "#0d6efd",
            borderColor: '#0d6efd',
            borderWidth: 4,
            pointBorderColor: "transparent",
            pointRadius: 3,
            pointHoverBackgroundColor: '#fff',
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: '#0d6efd',
            tension: 0.5,
        },
        {
            label: "Sakit",
            data: DataTrends.map((data) => data.sakit),
            backgroundColor: "#198754",
            borderColor: '#198754',
            borderWidth: 4,
            pointBorderColor: "transparent",
            pointRadius: 3,
            pointHoverBackgroundColor: '#fff',
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: '#198754',
            tension: 0.5,
        },
        {
            label: "Izin",
            data: DataTrends.map((data) => data.izin),
            backgroundColor: "#ffc107",
            borderColor: '#ffc107',
            borderWidth: 4,
            pointBorderColor: "transparent",
            pointRadius: 3,
            pointHoverBackgroundColor: '#fff',
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: '#ffc107',
            tension: 0.5
        },
        {
            label: "Tanpa Keterangan",
            data: DataTrends.map((data) => data.tanpa_keterangan),
            backgroundColor: "#dc3545",
            borderColor: '#dc3545',
            borderWidth: 4,
            pointBorderColor: "transparent",
            pointRadius: 3,
            pointHoverBackgroundColor: '#fff',
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointHoverBorderColor: '#dc3545',
            tension: 0.5
        }]
    })

    React.useEffect(() => {
        verifikasi()
    }, [])

    return (
        <div style={{ minHeight: "100vh", backgroundColor: '#f0f0f0' }}>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='w-100'>
                    <Heading query={'Dashboard'} />
                    <div className='d-flex flex-wrap p-2 font-nunito'>
                        <TimeInterval lgCol='6' />
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 d-flex flex-wrap'>
                            <div className="card shadow w-100">
                                <div className="card-header bg-warning p-1">
                                    Pengumuman
                                </div>
                                <div className="card-body p-1">
                                    <span className='fw-semibold'>Apel pagi dilaksanakan hubungan batalyon</span>
                                </div>
                                <a className='card-footer btn text-end p-0 pe-1'><small>Lainnya<i className="ms-2 bi bi-box-arrow-up-right"></i></small></a>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-12 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Kondisi Pasukan
                                    <i className="fs-2 bi bi-person-lines-fill ms-auto"></i>
                                </h4>
                                <div className='card-body row align-item-center px-4'>
                                    <div className='col-12 col-lg-4 p-0' style={{ minHeight: 370 }}>
                                        <PieChart data={userData} />
                                    </div>
                                    <div className='col-12 col-lg-8 p-0' style={{ minHeight: 370 }}>
                                        <LineChart data={trends} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}