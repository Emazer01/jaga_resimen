import * as React from 'react';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import { verifikasi } from '../function/Verifikasi';
import { Heading, TimeInterval } from '../component/Minor';
import { getWewenang } from '../function/Get';

export const LaporanGiat = () => {
    document.title = 'Laporan Kegiatan - Pusat Informasi Resimen Korps Kadet'

    const [jabatan, setJabatan] = React.useState({})

    React.useEffect(() => {
        verifikasi().then(x => {
            if (x.role != 'Kadet') {
                window.location.href = '/forbidden'
            }
        })
        getWewenang().then(x => {
            setJabatan(x.jabatan)
        })
        document.getElementById('sidebar-collapse').classList.add('show')
        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-lap-giat').classList.add('sidebar-active')
        
        document.getElementById('navbar-collapse').classList.add('show')
        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-lap-giat').classList.add('sidebar-active')
    },[])

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
                            <div className='card shadow w-100 col-12'>
                                <h4 className='card-header d-flex border-bottom'>Jabatan/Dinas
                                    <i className="fs-2 ms-auto bi bi-bank2"></i>
                                </h4>
                                <div className='card-body p-2'>
                                    <h5 className='fw-bold'>{jabatan.jabatan_nama}</h5>
                                    <span>Tingkat : {jabatan.tingkat}</span>
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <div className='card-body p-2 d-flex flex-wrap border'>
                                    asdasduiub
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}