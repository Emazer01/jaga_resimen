import * as React from 'react';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import { verifikasi } from '../function/Verifikasi';
import { Heading, TimeInterval } from '../component/Minor';
import { getKadets, getListLapGiat, getWewenang } from '../function/Get';
import { ModalFormLapGiat } from '../component/Modal';

export const LaporanGiat = () => {
    document.title = 'Laporan Kegiatan - Pusat Informasi Resimen Korps Kadet'

    const lapMasuk = {
        '-': 'd-none',
        'pleton': 'd-none',
        'kompi': 'd-none',
        'batalyon': 'd-none',
        'resimen': ''
    }

    const [jabatan, setJabatan] = React.useState({})
    const [kadets, setKadets] = React.useState([])
    const [giat, setGiat] = React.useState([])

    React.useEffect(() => {
        verifikasi().then(x => {
            if (x.role != 'Kadet') {
                window.location.href = '/forbidden'
            }
        })
        getWewenang().then(x => {
            setJabatan(x.jabatan)
        })
        getKadets().then(x => {
            setKadets(x)
        })
        getListLapGiat().then(x => {
            console.log(x)
            setGiat(x)
        })
        document.getElementById('sidebar-collapse').classList.add('show')
        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-lap-giat').classList.add('sidebar-active')

        document.getElementById('navbar-collapse').classList.add('show')
        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-lap-giat').classList.add('sidebar-active')
    }, [])

    return (
        <div style={{ minHeight: "100vh", backgroundColor: '#f0f0f0' }}>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='w-100'>
                    <Heading query={'Laporan/kegiatan'} />
                    <div className='p-2 d-flex flex-wrap font-nunito'>
                        <TimeInterval lgCol='6' />
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <div className='card-body p-2 d-flex flex-wrap border'>
                                    <div className={`col-6 p-2 d-flex`} id='button-apel-pleton'>
                                        <button className='btn btn-primary p-lg-2 w-100' data-bs-toggle="modal" data-bs-target="#staticBackdropLapGiat">Tulis Laporan Kegiatan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`p-1 p-lg-2 pb-3 col-12 d-flex flex-wrap ${lapMasuk[jabatan.tingkat]}`}>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Laporan Masuk
                                    <i className="fs-2 ms-auto bi bi-file-earmark-person-fill"></i>
                                </h4>
                                <div className='card-body p-2 d-flex flex-wrap border'>
                                    asdasduiub
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Riwayat
                                    <i className="fs-2 ms-auto bi bi-file-earmark-person-fill"></i>
                                </h4>
                                <div className='card-body p-2 d-flex flex-wrap'>
                                    <div className='p-2 col-12 col-lg-6'>
                                        <div className='mt-2 position-relative'>
                                            {giat.map(x => {
                                                var tanggal = new Date(x.lap_giat_date).toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" })
                                                var giat_tanggal = new Date(x.giat_date).toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" })
                                                return (
                                                    <div key={x.giat_id} className='border-5 border-dark p-1 ps-3 border-start position-relative'>
                                                        <button className={`btn btn-primary rounded-0 w-100 text-start d-flex`} data-bs-toggle="collapse" data-bs-target={`#detail-${x.giat_id}`} aria-expanded="true">
                                                            <strong className='me-2'>Laporan Kegiatan</strong><span className='me-2'>{tanggal}</span><span className='ms-auto'>Nomor : #{x.giat_id}</span>
                                                        </button>
                                                        <table className='table collapse border' id={`detail-${x.giat_id}`}>
                                                            <tbody>
                                                                <tr>
                                                                    <th className='col-4'>Nama Kegiatan</th>
                                                                    <td>{x.giat_nama}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Detail Kegiatan</th>
                                                                    <td>{x.giat_detail}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Tanggal Kegiatan</th>
                                                                    <td>{giat_tanggal}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <span className='rounded-circle border-4 border-dark timeline-circle border position-absolute'></span>
                                                    </div>
                                                )
                                            })}
                                            <span className='border-4 border-dark border position-absolute' style={{ width: 15, left: -5 }}></span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalFormLapGiat kadets={kadets} />
        </div>
    )
}