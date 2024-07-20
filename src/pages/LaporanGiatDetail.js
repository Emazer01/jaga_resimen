import * as React from 'react';
import copy from 'copy-to-clipboard';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import { verifikasi } from '../function/Verifikasi';
import { Heading, TimeInterval } from '../component/Minor';
import { getKadets, getLapGiat, getListLapGiat, getListUnapprovedGiat, getWewenang } from '../function/Get';
import { ModalFormLapGiat } from '../component/Modal';
import { sleep } from '../function/Minor';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { ComponentToPrintGiat } from '../component/ComponentToPrintGiat';

export const LaporanGiatDetail = () => {
    document.title = 'Laporan Kegiatan - Pusat Informasi Resimen Korps Kadet'
    var hitung = 0

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
    const [giat, setGiat] = React.useState({})

    const [peserta, setPeserta] = React.useState([])

    const [foto, setFoto] = React.useState([
        { foto_isi: '' }
    ])

    const [link, setLink] = React.useState([
        { link_isi: '' }
    ])

    React.useEffect(() => {
        verifikasi()
        getLapGiat().then(x => {
            console.log(x)
            setGiat(x.giat)
            setPeserta(x.peserta)
            setFoto(x.foto)
            setLink(x.attachment)
        })
        document.getElementById('sidebar-collapse').classList.add('show')
        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-lap-giat').classList.add('sidebar-active')

        document.getElementById('navbar-collapse').classList.add('show')
        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-lap-giat').classList.add('sidebar-active')
    }, [])

    const clipboard = async () => {
        var count = 0
        var copyText =
            `*Laporan Kegiatan*

Nama Kegiatan : ${giat.giat_nama}
Tanggal Kegiatan : ${new Date(giat.giat_date).toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
Tanggal Laporan : ${new Date(giat.lap_giat_date).toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
Pelapor : ${giat.pelapor_nama}
Approver : ${giat.approver_nama}

Detail Kegiatan : 
${giat.giat_detail}

Peserta Kegiatan :
${peserta.map(x => {
                count += 1
                return (`${count}. ${x.kadet_nama}`)
            }).join(`
`)}

*Generated from PI-Menkorps`
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
                    <Heading query={'Laporan/kegiatan/detail'} />
                    <div className='p-2 d-flex flex-wrap font-nunito'>
                        <TimeInterval lgCol='6' />
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 d-flex flex-wrap'>
                            <div className='card shadow w-100 col-12'>
                                <h4 className='card-header d-flex border-bottom'>Export
                                    <i className="fs-2 ms-auto bi bi-send-fill"></i>
                                </h4>
                                <div className='card-body p-2 d-flex flex-wrap'>
                                    <div className='col-6 p-1 d-flex'>
                                        <button className="btn btn-secondary col-12" id='btn-copy-txt' onClick={clipboard}>
                                            <i className="bi bi-clipboard-fill"></i> Copy to text
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
                                        <ComponentToPrintGiat ref={componentRef} props={[giat, peserta, foto, link]} />
                                    </div>
                                    <small className='col-12 text-center'>Use desktop devices to get better generated pdf</small>
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Laporan Kegiatan
                                    <i className="fs-2 ms-auto bi bi-file-earmark-person-fill"></i>
                                </h4>
                                <div className='card-body p-2 p-lg-3'>
                                    <div className='d-flex flex-wrap'>
                                        <div className='col-12 p-2'>
                                            <table className='table table-striped'>
                                                <tbody>
                                                    <tr>
                                                        <th>Nama Kegiatan</th>
                                                        <td>{giat.giat_nama}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Tanggal Kegiatan</th>
                                                        <td>{new Date(giat.giat_date).toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Tanggal Laporan</th>
                                                        <td>{new Date(giat.lap_giat_date).toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Pelapor</th>
                                                        <td>{giat.pelapor_nama}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Approver</th>
                                                        <td>{giat.approver_jab_kadet_nama} {giat.approver_dd_kadet_nama}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Jabatan Approver</th>
                                                        <td>{giat.jabatan_resimen_nama} {giat.dd_resimen_nama}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className='col-12 p-2'>
                                            <strong className='fs-5'>Detail Kegiatan</strong>
                                            <p className='py-2 m-0'>{giat.giat_detail}</p>
                                        </div>
                                        <div className='col-12 p-2'>
                                            <strong className='fs-5'>Dokumentasi Kegiatan</strong>
                                            <div className='d-flex flex-wrap'>
                                                {foto.map(foto => {
                                                    return (
                                                        <div className='col-12 col-md-4 d-flex p-1'>
                                                            <img src={foto.foto_isi} className='rounded-2 w-100 object-fit-contain' />
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                        </div>
                                        <div className='col-12 p-2'>
                                            <strong className='fs-5'>Attachment</strong>
                                            <div>
                                                {link.map(link=>{
                                                    return(
                                                        <a href={link.link_isi} target='_blank' className='btn btn-secondary text-start d-flex'><span>{link.link_isi}</span> <i className="bi bi-box-arrow-up-right"></i></a>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className='col-12 p-2'>
                                            <strong className='fs-5'>Peserta</strong>
                                            <table className='table table-striped'>
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Nama</th>
                                                        <th>Pleton</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {peserta.map(x => {
                                                        hitung += 1
                                                        return (
                                                            <tr key={x.kadet_nama}>
                                                                <td>{hitung}</td>
                                                                <td>{x.kadet_nama}</td>
                                                                <td>{x.pleton}</td>
                                                            </tr>
                                                        )
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
    )
}