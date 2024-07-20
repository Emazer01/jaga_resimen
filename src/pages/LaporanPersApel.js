import * as React from 'react';
import copy from 'copy-to-clipboard';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import { verifikasi } from '../function/Verifikasi';
import { Heading, Pagination, TimeInterval } from '../component/Minor';
import { getLapApel } from '../function/Get';
import { sleep } from '../function/Minor';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from '../component/ComponentToPrint';


export const LaporanPersApel = () => {
    document.title = 'Laporan Personil Apel - Pusat Informasi Resimen Korps Kadet'

    const componentRef = useRef();
    const pageStyle =
        `@page {
        size: 297mm 210mm;
        }
        @media print {
        @page {  size: a4 ;
        }
        @media all {
                        .pagebreak {
                          overflow: visible; 
                        }
                    }
                }
            }`;
    const keterangan_color = {
        'Hadir': 'bg-primary',
        'Sakit': 'bg-success',
        'Izin': 'bg-warning',
        'Tanpa Keterangan': 'bg-danger'
    }

    const [lapApel, setLapApel] = React.useState({})
    const [dataApel, setDataApel] = React.useState([])
    const [subordinates, setSubordinates] = React.useState([])

    const [currentPage, setCurrentPage] = React.useState(1)
    const [postPerPage, setPostPerPage] = React.useState(10)
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = dataApel.slice(indexOfFirstPost, indexOfLastPost)
    const changePage = (number) => {
        if (number >= 1 && number <= Math.ceil(dataApel.length / postPerPage)) {
            setCurrentPage(number)
        }
    }

    React.useEffect(() => {
        verifikasi()
        getLapApel().then(x => {
            if (x.lapApel.lap_apel.length == 0) {
                window.location.href = '/404'
            }
            setLapApel(x.lapApel.lap_apel[0])
            setDataApel(x.dataApel)
            if (x.sub.lap_apel) {
                setSubordinates(x.sub.lap_apel)
            }
        })
        document.getElementById('sidebar-collapse').classList.add('show')
        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-lap-pers').classList.add('sidebar-active')

        document.getElementById('navbar-collapse').classList.add('show')
        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-lap-pers').classList.add('sidebar-active')
    }, [])

    const clipboard = async () => {
        var tanggal = new Date(lapApel.apel_date).toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" })
        var sakit = []
        var izin = []
        var tanpa_keterangan = []
        var jab_nama = lapApel.jab_nama
        if (jab_nama == null) {
            jab_nama = ""
        }
        var dd_nama = lapApel.dd_nama
        if (dd_nama == null) {
            dd_nama = ""
        }
        var satuan_bawah = ''
        if (subordinates.length != 0) {
            satuan_bawah = '\nSatuan bawah :\n'
        }
        dataApel.map(x => {
            if (x.keterangan_nama == 'Sakit') {
                sakit.push(x)
            } else if (x.keterangan_nama == 'Izin') {
                izin.push(x)
            } else if (x.keterangan_nama == 'Tanpa Keterangan') {
                tanpa_keterangan.push(x)
            }
        })
        console.log(sakit)
        var copyText =
            `*Laporan ${lapApel.jenis_apel_nama}*
Satuan : ${lapApel.satuan}
Hari, Tanggal : ${tanggal}
Pelapor: ${lapApel.pangkat_singkat} ${lapApel.kadet_nama}
Jabatan Pelapor : ${String(jab_nama)} ${String(dd_nama)}

Jumlah : ${Number(lapApel.hadir) + Number(lapApel.sakit) + Number(lapApel.izin) + Number(lapApel.tanpa_keterangan)}
Kurang : ${Number(lapApel.sakit) + Number(lapApel.izin) + Number(lapApel.tanpa_keterangan)}
Hadir  : ${Number(lapApel.hadir)}
Keterangan :
    ${Number(lapApel.sakit)} Sakit${sakit.map(x => {
                return (`\n\t- ${x.pangkat_singkat} ${x.kadet_nama} (${x.sakit.sakit_nama}, ${x.sakit.sakit_detail})`)
            }).join('')}
    ${Number(lapApel.izin)} Izin${izin.map(x => {
                return (`\n\t- ${x.pangkat_singkat} ${x.kadet_nama} (${x.izin.izin_nama}, ${x.izin.izin_detail})`)
            }).join('')}
    ${Number(lapApel.tanpa_keterangan)} Tanpa Keterangan${tanpa_keterangan.map(x => {
                return (`\n\t- ${x.pangkat_singkat} ${x.kadet_nama}`)
            }).join('')}
            
*Generated from PI-Menkorps*`
        copy(copyText)
        document.getElementById('btn-copy-txt').innerHTML = `<i class="bi bi-check-square-fill"></i> Copied`
        await sleep(1000)
        document.getElementById('btn-copy-txt').innerHTML = `<i class="bi bi-clipboard-fill"></i> Copy to text`
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: '#f0f0f0' }}>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='w-100'>
                    <Heading query={'Laporan/pers/apel'} />
                    <div className='p-2 d-flex flex-wrap font-nunito'>
                        <TimeInterval lgCol='6' />
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 d-flex flex-wrap'>
                            <div className='card shadow w-100 col-12'>
                                <h4 className='card-header d-flex border-bottom'>Export
                                    <i className="fs-2 ms-auto bi bi-send-fill"></i>
                                </h4>
                                <div className='card-body p-2 d-flex flex-wrap'>
                                    <div className='col-6 p-1 d-flex'>
                                        <button class="btn btn-secondary col-12" onClick={clipboard} id='btn-copy-txt'>
                                            <i class="bi bi-clipboard-fill"></i> Copy to text
                                        </button>
                                    </div>
                                    <ReactToPrint
                                        trigger={() =>
                                            <div className='col-6 p-1 d-flex'>
                                                <button className='btn btn-secondary col-12'>
                                                    <i class="bi bi-filetype-pdf"></i> Export .pdf
                                                </button>
                                            </div>
                                        }
                                        content={() => componentRef.current}
                                        pageStyle={pageStyle}
                                        documentTitle={document.title}
                                        copyStyles={true}
                                    />
                                    <div className='d-none'>
                                        <ComponentToPrint ref={componentRef} props={[lapApel, dataApel, subordinates]} />
                                    </div>
                                    <small className='col-12 text-center'>Use desktop devices to get better generated pdf</small>
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 d-flex flex-wrap'>
                            <div className='card shadow w-100 col-12'>
                                <h4 className='card-header d-flex border-bottom'>Laporan Apel
                                    <i className="fs-2 ms-auto bi bi-file-earmark-person-fill"></i>
                                </h4>
                                <div className='card-body p-2 p-lg-3'>
                                    <div className='d-flex flex-wrap'>
                                        <div className='col-12 col-lg-6'>
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <th className='align-middle col-4'>Jenis Apel</th>
                                                        <td className='align-middle'>{lapApel.jenis_apel_nama}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-middle'>Hari, Tanggal</th>
                                                        <td className='align-middle'>{new Date(lapApel.apel_date).toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-middle'>Tingkat</th>
                                                        <td className='align-middle'>{lapApel.tingkat}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-middle'>Nomor Laporan</th>
                                                        <td className='align-middle'>#{lapApel.tingkat}-{lapApel.apel_id}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-middle'>{lapApel.tingkat}</th>
                                                        <td className='align-middle'>{lapApel.satuan}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-middle'>Pelapor</th>
                                                        <td className='align-middle'>{lapApel.pangkat_singkat} {lapApel.kadet_nama}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-middle'>Jabatan Pelapor</th>
                                                        <td className='align-middle'>{lapApel.jab_nama}<br/>{lapApel.dd_nama}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-middle'>Sumber</th>
                                                        <td className='align-middle p-0'>
                                                            {subordinates.map(x => {
                                                                return (
                                                                    <a href={`/laporan/pers/apel?tingkat=${x.tingkat}&nomor=${x.apel_id}`} className='btn btn-primary rounded-pill m-1 text-start p-1 px-2'>
                                                                        <small>#{x.tingkat}-{x.apel_id}</small>
                                                                    </a>
                                                                )
                                                            })}
                                                        </td>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className='col-12 col-lg-6 p-2'>
                                            <div className='d-flex'>
                                                <div className='col-4 d-flex p-1'>
                                                    <div className='btn btn-secondary w-100'>
                                                        <strong className='px-2 py-1'>Jumlah</strong>
                                                        <span className='p-2 d-flex align-items-center text-center'>
                                                            <span className='w-100 display-4 fw-bold'>{Number(lapApel.hadir) + Number(lapApel.sakit) + Number(lapApel.izin) + Number(lapApel.tanpa_keterangan)}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='col-8 d-flex flex-wrap'>
                                                    <div className='col-6 p-1 d-flex'>
                                                        <a className='btn btn-primary w-100'>
                                                            <strong className='px-2 py-1'>Hadir</strong>
                                                            <span className='p-2 d-flex align-items-center text-center'>
                                                                <span className='w-100 display-5 fw-bold'>{Number(lapApel.hadir)}</span>
                                                            </span>
                                                        </a>
                                                    </div>
                                                    <div className='col-6 p-1 d-flex'>
                                                        <a className='btn btn-success w-100' href='#sakit'>
                                                            <strong className='px-2 py-1'>Sakit</strong>
                                                            <span className='p-2 d-flex align-items-center text-center'>
                                                                <span className='w-100 display-5 fw-bold'>{Number(lapApel.sakit)}</span>
                                                            </span>
                                                        </a>
                                                    </div>
                                                    <div className='col-6 p-1 d-flex'>
                                                        <a className='btn btn-warning text-light w-100' href='#izin'>
                                                            <strong className='px-2 py-1'>Izin</strong>
                                                            <span className='p-2 d-flex align-items-center text-center'>
                                                                <span className='w-100 display-5 fw-bold'>{Number(lapApel.izin)}</span>
                                                            </span>
                                                        </a>
                                                    </div>
                                                    <div className='col-6 p-1 d-flex'>
                                                        <a className='btn btn-danger w-100' href='#tanpa-keterangan'>
                                                            <strong className='px-2 py-1'>Tanpa Keterangan</strong>
                                                            <span className='p-2 d-flex align-items-center text-center'>
                                                                <span className='w-100 display-5 fw-bold'>{Number(lapApel.tanpa_keterangan)}</span>
                                                            </span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex flex-wrap'>
                                        <div className='col-12 col-lg-12 p-2'>
                                            <div className='border border-2 rounded-2 p-3'>
                                                <h5>Daftar Personil</h5>
                                                <div className='table-responsive'>
                                                    <table className='table'>
                                                        <thead>
                                                            <tr>
                                                                <th>Nama</th>
                                                                <th className='d-none d-md-flex'>Pangkat</th>
                                                                <th>Pleton</th>
                                                                <th>Keterangan</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {currentPosts.map(x => {
                                                                return (
                                                                    <tr key={x.data_apel_id}>
                                                                        <td>{x.kadet_nama}</td>
                                                                        <td className='d-none d-md-flex' style={{ padding: '12px 0px' }}>{x.pangkat_singkat}</td>
                                                                        <td>{x.satuan}</td>
                                                                        <td>
                                                                            <div className={`rounded-2 px-2 p-1 text-light ${keterangan_color[x.keterangan_nama]}`}>{x.keterangan_nama}</div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <Pagination postPerPage={postPerPage} totalPost={dataApel.length} currentPage={currentPage} changePage={changePage} />
                                            </div>
                                        </div>
                                        <div className='col-12 p-2' id='sakit'>
                                            <div className='border border-2 rounded-2 p-3'>
                                                <h5>Sakit</h5>
                                                <div className='d-flex flex-wrap'>
                                                    {dataApel.map(x => {
                                                        if (x.keterangan_nama == 'Sakit') {
                                                            return (
                                                                <div key={x.sakit_id} class="card mb-3 col-12 col-md-6">
                                                                    <div class="row g-0">
                                                                        <div class="col-md-4">
                                                                            <img src={x.sakit.foto_isi} class="img-fluid rounded-start" alt="..." />
                                                                        </div>
                                                                        <div class="col-md-8">
                                                                            <div class="card-body">
                                                                                <h5 class="card-title">{x.pangkat_singkat} {x.kadet_nama}</h5>
                                                                                <p class="card-text">{x.sakit.sakit_nama}</p>
                                                                                <p class="card-text"><small class="text-body-secondary">{x.sakit.sakit_detail}</small></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12 p-2' id='izin'>
                                            <div className='border border-2 rounded-2 p-3'>
                                                <h5>Izin</h5>
                                                <div className='d-flex flex-wrap'>
                                                    {dataApel.map(x => {
                                                        if (x.keterangan_nama == 'Izin') {
                                                            return (
                                                                <div key={x.izin_id} class="card mb-3 col-12 col-md-6">
                                                                    <div class="row g-0">
                                                                        <div class="col-md-4">
                                                                            <img src={x.izin.foto_isi} class="img-fluid rounded-start" alt="..." />
                                                                        </div>
                                                                        <div class="col-md-8">
                                                                            <div class="card-body">
                                                                                <h5 class="card-title">{x.pangkat_singkat} {x.kadet_nama}</h5>
                                                                                <p class="card-text">{x.izin.izin_nama}</p>
                                                                                <p class="card-text"><small class="text-body-secondary">{x.izin.izin_detail}</small></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12 p-2' id='tanpa-keterangan'>
                                            <div className='border border-2 rounded-2 p-3'>
                                                <h5>Tanpa Keterangan</h5>
                                                <table className='table'>
                                                    <thead>
                                                        <tr>
                                                            <th>Nama</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {dataApel.map(x => {
                                                            if (x.keterangan_nama == 'Tanpa Keterangan') {
                                                                return (
                                                                    <tr key={x.data_apel_id}>
                                                                        <td>{x.pangkat_singkat} {x.kadet_nama}</td>
                                                                    </tr>
                                                                )
                                                            }
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
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