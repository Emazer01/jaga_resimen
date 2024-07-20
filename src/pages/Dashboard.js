import * as React from 'react';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import { verifikasi } from '../function/Verifikasi'
import { Heading, TimeInterval } from '../component/Minor';
import { Data } from '../data/Data';
import { BarChart, LineChart, PieChart } from '../component/Chart';
import { getDds, getTrends } from '../function/Get';

export const Dashboard = () => {
    const DataTrends = [
        {
            laporan: 'Apel Pagi 7/2/24',
            hadir: 1000,
            sakit: 50,
            izin: 100,
            tanpa_keterangan: 50
        },
        {
            laporan: 'Apel Malam 7/2/24',
            hadir: 850,
            sakit: 50,
            izin: 300,
            tanpa_keterangan: 0
        },
        {
            laporan: 'Apel Pagi 8/2/24',
            hadir: 1000,
            sakit: 50,
            izin: 100,
            tanpa_keterangan: 50
        },
        {
            laporan: 'Apel Malam 8/2/24',
            hadir: 950,
            sakit: 100,
            izin: 130,
            tanpa_keterangan: 20
        },
        {
            laporan: 'Apel Pagi 9/2/24',
            hadir: 1150,
            sakit: 30,
            izin: 20,
            tanpa_keterangan: 0
        },
        {
            laporan: 'Apel Malam 9/2/24',
            hadir: 1100,
            sakit: 50,
            izin: 40,
            tanpa_keterangan: 10
        },
        {
            laporan: 'Apel Pagi 10/2/24',
            hadir: 1000,
            sakit: 50,
            izin: 100,
            tanpa_keterangan: 50
        },
        {
            laporan: 'Apel Malam 10/2/24',
            hadir: 850,
            sakit: 50,
            izin: 300,
            tanpa_keterangan: 0
        },
        {
            laporan: 'Apel Pagi 11/2/24',
            hadir: 1000,
            sakit: 50,
            izin: 100,
            tanpa_keterangan: 50
        },
        {
            laporan: 'Apel Malam 11/2/24',
            hadir: 950,
            sakit: 100,
            izin: 130,
            tanpa_keterangan: 20
        },
        {
            laporan: 'Apel Pagi 12/2/24',
            hadir: 1150,
            sakit: 30,
            izin: 20,
            tanpa_keterangan: 0
        },
        {
            laporan: 'Apel Malam 12/2/24',
            hadir: 1100,
            sakit: 50,
            izin: 40,
            tanpa_keterangan: 10
        },
        {
            laporan: 'Apel Pagi 13/2/24',
            hadir: 1000,
            sakit: 50,
            izin: 100,
            tanpa_keterangan: 50
        }
    ];
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

    const [giat, setGiat] = React.useState([])

    const [dinas, setDinas] = React.useState([])

    const [aktifitas, setAktifitas] = React.useState([])

    const [trends, setTrends] = React.useState({
        labels: DataTrends.map((data) => data.laporan),
        links: [],
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
            tension: 0.5
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
            tension: 0.5
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
        getTrends().then(x => {
            setUserData({
                labels: ['Hadir', 'Sakit', 'Izin', 'Tanpa Keterangan'],
                datasets: [{
                    label: "Jumlah",
                    data: [x.trends[0].hadir, x.trends[0].sakit, x.trends[0].izin, x.trends[0].tanpa_keterangan],
                    backgroundColor: [
                        "#0d6efd",
                        "#198754",
                        "#ffc107",
                        "#dc3545"
                    ]
                }]
            })
            setTrends({
                labels: x.trends.slice(0).reverse().map((data) => {
                    var tanggal = new Date(data.apel_date).toLocaleString('id-id').slice(0, 9)
                    return (`${data.jenis_apel_nama} ${tanggal}`)
                }),
                links: x.trends.slice(0).reverse().map((data) => data.apel_id),
                datasets: [{
                    label: "Hadir",
                    data: x.trends.slice(0).reverse().map((data) => Number(data.hadir)),
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
                    hidden: true
                },
                {
                    label: "Sakit",
                    data: x.trends.slice(0).reverse().map((data) => Number(data.sakit)),
                    backgroundColor: "#198754",
                    borderColor: '#198754',
                    borderWidth: 4,
                    pointBorderColor: "transparent",
                    pointRadius: 3,
                    pointHoverBackgroundColor: '#fff',
                    pointHoverRadius: 5,
                    pointHoverBorderWidth: 2,
                    pointHoverBorderColor: '#198754',
                    tension: 0.5
                },
                {
                    label: "Izin",
                    data: x.trends.slice(0).reverse().map((data) => Number(data.izin)),
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
                    data: x.trends.slice(0).reverse().map((data) => Number(data.tanpa_keterangan)),
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
            setAktifitas(x.aktifitas)
            console.log(x.giat)
            setGiat(x.giat)
        })
        getDds().then(x => {
            setDinas(x)
        })
    }, [])

    return (
        <div style={{ minHeight: "100vh", backgroundColor: '#f0f0f0' }} >
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
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Dinas Dalam
                                    <i className="fs-2 bi bi-bank2 ms-auto"></i>
                                </h4>
                                <div className='card-body align-item-center px-2'>
                                    <table className='table table-clickable table-striped'>
                                        <tbody>
                                            {dinas.map(dinas => {
                                                return (
                                                    <tr key={dinas.dd_nama}>
                                                        <td className='p-0'><a href='/dinas/detail?tingkat?id' className='p-2 text-decoration-none text-dark'>{dinas.dd_nama}</a></td>
                                                        <td className='p-0'><a href='/dinas/detail?tingkat?id' className='p-2 text-decoration-none text-dark'>{dinas.pangkat} {dinas.kadet_nama}</a></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-3 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Kegiatan
                                    <i className="fs-2 bi bi-clock-history ms-auto"></i>
                                </h4>
                                <div className='card-body p-2'>
                                    {giat.map(x=>{
                                        return(
                                            <div key={x.giat_id} className='d-flex pb-2'>
                                                <a href={`/laporan/giat/detail?nomor=${x.giat_id}`} className='btn btn-primary text-start w-100'>{x.giat_nama}</a>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-3 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <h5 className='card-header d-flex border-bottom'>Log sistem
                                    <i className="fs-5 bi bi-clock-history ms-auto"></i>
                                </h5>
                                <div className='card-body p-0'>
                                    <div className='p-2'>
                                        {aktifitas.map(aktifitas => {
                                            return (
                                                <div key={aktifitas.aktifitas_id} className='p-1 border-bottom rounded-1'>
                                                    <small>{aktifitas.username} baru saja {aktifitas.aktifitas_isi}</small>
                                                </div>
                                            )
                                        })}
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