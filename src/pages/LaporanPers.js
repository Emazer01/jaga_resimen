import * as React from 'react';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import { verifikasi } from '../function/Verifikasi';
import { Heading, TimeInterval } from '../component/Minor';
import { getListLapApel, getWewenang } from '../function/Get';
import { ModalFormForwardApel, ModalFormLapApel } from '../component/Modal';

export const LaporanPers = () => {
    document.title = 'Laporan Personil - Pusat Informasi Resimen Korps Kadet'

    const [jabatan, setJabatan] = React.useState({})
    const [kadets, setKadets] = React.useState([])
    const [pleton, setPleton] = React.useState({})

    const [lapApel, setLapApel] = React.useState([])
    const [subordinates, setSubordinates] = React.useState([])

    const lapMasuk = {
        '-': 'd-none',
        'pleton': 'd-none',
        'kompi': '',
        'batalyon': '',
        'resimen': ''
    }

    const lap = {
        '-': 'd-none',
        'pleton': '',
        'kompi': '',
        'batalyon': '',
        'resimen': ''
    }

    const tulisLap = {
        'pleton': '',
        '-': 'd-none',
        'kompi': 'd-none',
        'batalyon': 'd-none',
        'resimen': 'd-none'
    }

    React.useEffect(() => {
        verifikasi().then(x => {
            if (x.role != 'Kadet') {
                window.location.href = '/forbidden'
            }
        })

        getWewenang().then(x => {
            setJabatan(x.jabatan)
            setKadets(x.kadets)
            setPleton({
                pleton_id: x.pleton_id,
                pleton_nama: x.pleton_nama
            })
        })

        getListLapApel().then(x => {
            if (x.lap_apel) {
                setLapApel(x.lap_apel)
            }
            if (x.subordinates!=undefined) {
                setSubordinates(x.subordinates)
            }
        })

        document.getElementById('sidebar-collapse').classList.add('show')
        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-lap-pers').classList.add('sidebar-active')

        document.getElementById('navbar-collapse').classList.add('show')
        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-lap-pers').classList.add('sidebar-active')
    }, [])

    return (
        <div style={{ minHeight: "100vh", backgroundColor: '#f0f0f0' }}>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='w-100'>
                    <Heading query={'Laporan/personil'} />
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
                                    <div className={`col-6 p-2 d-flex ${tulisLap[jabatan.tingkat]}`} id='button-apel-pleton'>
                                        <button className='btn btn-primary p-lg-2 w-100' data-bs-toggle="modal" data-bs-target="#staticBackdropLapApel">Laporan Apel</button>
                                    </div>
                                    <div className={`col-6 p-2 d-flex ${tulisLap[jabatan.tingkat]}`} id='button-insidental-pleton'>
                                        <button className='btn btn-primary p-lg-2 w-100' data-bs-toggle="modal" data-bs-target="#staticBackdropLapApel">Laporan Insidental</button>
                                    </div>
                                    <div className={`col-6 p-2 d-flex ${lapMasuk[jabatan.tingkat]}`} id='button-apel-any'>
                                        <button className='btn btn-primary p-lg-2 w-100' data-bs-toggle="modal" data-bs-target="#staticBackdropForwardApel">Laporan Apel</button>
                                    </div>
                                    <div className={`col-6 p-2 d-flex ${lapMasuk[jabatan.tingkat]}`} id='button-apel-any'>
                                        <button className='btn btn-primary p-lg-2 w-100' data-bs-toggle="modal" data-bs-target="#staticBackdropLapApel">Laporan Insidental</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`p-1 p-lg-2 pb-3 col-12 d-flex flex-wrap ${lapMasuk[jabatan.tingkat]}`}>
                            <div className='card shadow w-100 col-12'>
                                <h4 className='card-header d-flex border-bottom'>Laporan Masuk
                                    <i className="fs-2 ms-auto bi bi-file-earmark-person-fill"></i>
                                </h4>
                                <div className='card-body p-2 d-flex flex-wrap'>
                                    <div className='p-2 col-12 col-lg-6'>
                                        <h5>Apel</h5>
                                        <div className="accordion" id="accordionPanelsStayOpenExample">
                                            {subordinates.map(eachSubordinates => {
                                                return (
                                                    <div key={eachSubordinates.subordinates_id} className="accordion-item">
                                                        <h2 className="accordion-header">
                                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#panel-${eachSubordinates.subordinates_id}`} aria-expanded="false" aria-controls={`#panel-${eachSubordinates.subordinates_id}`}>
                                                                {eachSubordinates.subordinates_nama}
                                                            </button>
                                                        </h2>
                                                        <div id={`panel-${eachSubordinates.subordinates_id}`} className="accordion-collapse collapse">
                                                            <div className="accordion-body">
                                                                {eachSubordinates.lap_apel.map(lap_apel => {
                                                                    var tanggal = new Date(lap_apel.apel_date).toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" })
                                                                    if (lap_apel.editable == 1) {
                                                                        return (
                                                                            <div key={lap_apel.apel_id} className='border-5 border-dark p-1 ps-3 border-start position-relative'>
                                                                                <button className={`btn btn-primary rounded-0 w-100 text-start`} data-bs-toggle="collapse" data-bs-target={`#detail-${lap_apel.apel_id}`} aria-expanded="true">
                                                                                    <strong>{lap_apel.jenis_apel_nama}</strong>&nbsp;&nbsp;&nbsp;&nbsp;<span>{tanggal}</span><br />
                                                                                    <span>- {lap_apel.kadet_nama}</span>
                                                                                </button>
                                                                                <table className='table collapse border' id={`detail-${lap_apel.apel_id}`}>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <th>Jumlah</th>
                                                                                            <td>{Number(lap_apel.hadir) + Number(lap_apel.sakit) + Number(lap_apel.izin) + Number(lap_apel.tanpa_keterangan)}</td>
                                                                                            <th>Sakit</th>
                                                                                            <td>{Number(lap_apel.sakit)}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th>Kurang</th>
                                                                                            <td>{Number(lap_apel.sakit) + Number(lap_apel.izin) + Number(lap_apel.tanpa_keterangan)}</td>
                                                                                            <th>Izin</th>
                                                                                            <td>{Number(lap_apel.izin)}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th>Hadir</th>
                                                                                            <td>{Number(lap_apel.hadir)}</td>
                                                                                            <th>Tanpa Keterangan</th>
                                                                                            <td>{Number(lap_apel.tanpa_keterangan)}</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td colSpan='4' className='p-0'><a href={`/laporan/pers/apel?tingkat=${lap_apel.tingkat}&nomor=${lap_apel.apel_id}`} className='btn w-100 text-end rounded-0'>Selengkapnya</a></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                                <span className='rounded-circle border-4 border-dark timeline-circle border position-absolute'></span>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className='p-2 col-12 col-lg-6'></div>
                                </div>
                            </div>
                        </div>
                        <div className={`p-1 p-lg-2 pb-3 col-12 d-flex flex-wrap ${lap[jabatan.tingkat]}`}>
                            <div className='card shadow w-100 col-12'>
                                <h4 className='card-header d-flex border-bottom'>Riwayat
                                    <i className="fs-2 ms-auto bi bi-file-earmark-person-fill"></i>
                                </h4>
                                <div className='card-body p-2'>
                                    <div className='d-flex flex-wrap'>
                                        <div className='p-2 col-12 col-lg-6'>
                                            <h5>Laporan Apel</h5>
                                            <div className='mt-2 position-relative'>
                                                {lapApel.map(lapApel => {
                                                    var tanggal = new Date(lapApel.apel_date).toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" })
                                                    console.log(tanggal)
                                                    return (
                                                        <div key={lapApel.apel_id} className='border-5 border-dark p-1 ps-3 border-start position-relative'>
                                                            <button className={`btn btn-primary rounded-0 w-100 text-start d-flex`} data-bs-toggle="collapse" data-bs-target={`#detail-${lapApel.apel_id}`} aria-expanded="true">
                                                                <strong>{lapApel.jenis_apel_nama}</strong>&nbsp;&nbsp;&nbsp;&nbsp;<span>{tanggal}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className='ms-auto'>Nomor : #{lapApel.apel_id}</span>
                                                            </button>
                                                            <table className='table collapse border' id={`detail-${lapApel.apel_id}`}>
                                                                <tbody>
                                                                    <tr>
                                                                        <th>Jumlah</th>
                                                                        <td>{Number(lapApel.hadir) + Number(lapApel.sakit) + Number(lapApel.izin) + Number(lapApel.tanpa_keterangan)}</td>
                                                                        <th>Sakit</th>
                                                                        <td>{Number(lapApel.sakit)}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Kurang</th>
                                                                        <td>{Number(lapApel.sakit) + Number(lapApel.izin) + Number(lapApel.tanpa_keterangan)}</td>
                                                                        <th>Izin</th>
                                                                        <td>{Number(lapApel.izin)}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Hadir</th>
                                                                        <td>{Number(lapApel.hadir)}</td>
                                                                        <th>Tanpa Keterangan</th>
                                                                        <td>{Number(lapApel.tanpa_keterangan)}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan='4' className='p-0'><a href={`/laporan/pers/apel?tingkat=${lapApel.tingkat}&nomor=${lapApel.apel_id}`} className='btn w-100 text-end rounded-0'>Selengkapnya</a></td>
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
            </div>
            <ModalFormLapApel kadets={kadets} pleton={pleton} />
            <ModalFormForwardApel subordinates={subordinates} tingkat={jabatan.tingkat} />
        </div>
    )
}