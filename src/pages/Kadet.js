import * as React from 'react';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import { verifikasi } from '../function/Verifikasi';
import { Heading, TimeInterval } from '../component/Minor';
import { getKadet } from '../function/Get';

export const Kadet = () => {
    const keterangan_color = {
        'Hadir': 'primary',
        'Sakit': 'success',
        'Izin': 'warning',
        'Tanpa Keterangan': 'danger'
    }

    const status_color = {
        'Aktif': 'secondary',
        'Tidak Aktif': 'black'
    }

    const jk = {
        'L': 'Laki-laki',
        'P': 'Perempuan'
    }

    const [limit, setLimit] = React.useState({
        riwayatApel: 5
    })

    const [kadet, setKadet] = React.useState({
        riwayatApel: [{
            apel_men_date: ''
        }],
        rangkuman: {
            sakit: [],
            izin: [],
            tanpa_keterangan: []
        },
        listLapGiat:[]
    })

    React.useEffect(() => {
        verifikasi()
        getKadet(limit.riwayatApel).then(x => {
            setKadet(x)
            console.log(x.riwayatApel)
            if (x) {
                document.title = `${x.kadet_nama} - Pusat Informasi Resimen Korps Kadet`
            }
        })
        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-personil').classList.add('sidebar-active')

        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-personil').classList.add('sidebar-active')
    }, [limit])

    const changeRangkuman = () => {
        document.getElementById('rangkuman-sakit').innerHTML = kadet.rangkuman.sakit[document.getElementById('rangkuman-select').value]
        document.getElementById('rangkuman-izin').innerHTML = kadet.rangkuman.izin[document.getElementById('rangkuman-select').value]
        document.getElementById('rangkuman-tanpa_keterangan').innerHTML = kadet.rangkuman.tanpa_keterangan[document.getElementById('rangkuman-select').value]
    }

    const moreApel = () => {
        setLimit({
            ...limit, riwayatApel: limit.riwayatApel + 5
        })
        document.getElementById('btn-show-less').classList.remove('d-none')
    }
    const lessApel = () => {
        setLimit({
            ...limit, riwayatApel: 5
        })
        document.getElementById('btn-show-less').classList.add('d-none')
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: '#f0f0f0' }}>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='w-100'>
                    <Heading query={'Personil/kadet'} />
                    <div className='p-2 d-flex flex-wrap font-nunito'>
                        <TimeInterval lgCol='6' />
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Penugasan
                                    <i className="fs-2 ms-auto bi bi-bank2"></i>
                                </h4>
                                <div className='card-body p-2'>
                                    <table className='w-100'>
                                        <tbody>
                                            <tr>
                                                <th>Jabatan</th>
                                                <td id='jabatan'>{kadet.jabatan_resimen_nama}{kadet.jabatan_batalyon_nama}{kadet.jabatan_kompi_nama}{kadet.jabatan_pleton_nama}</td>
                                            </tr>
                                            <tr>
                                                <th>Dinas Dalam</th>
                                                <td id='dinas-dalam'>{kadet.dd_resimen_nama}{kadet.dd_batalyon_nama}{kadet.dd_kompi_nama}{kadet.dd_pleton_nama}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 col-md-9 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Data Diri
                                    <i className="fs-2 bi bi-person-vcard-fill ms-auto"></i>
                                </h4>
                                <div className='card-body d-flex align-item-center px-4'>
                                    <div className='d-flex flex-wrap w-100'>
                                        <div className='col-12 col-lg-3'>
                                            <div className='px-5 px-md-1 py-2 py-md-1'>
                                                <img src={kadet.foto_isi} className="rounded-2 w-100" />
                                            </div>
                                        </div>
                                        <div className='col-12 col-lg-9 px-lg-3 table-responsive d-flex align-items-center'>
                                            <table className='table table-striped'>
                                                <tbody>
                                                    <tr>
                                                        <th className='align-top'>Nama</th>
                                                        <td className='ps-3'>{kadet.kadet_nama}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-top'>NIM</th>
                                                        <td className='ps-3'>{kadet.kadet_nim}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-top'>Jenis Kelamin</th>
                                                        <td className='ps-3'>{jk[kadet.jenis_kelamin]}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-top'>Tahun Masuk</th>
                                                        <td className='ps-3'>{kadet.angkatan}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-top'>Pangkat</th>
                                                        <td className='ps-3'>{kadet.pangkat_nama}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-top'>Pleton</th>
                                                        <td className='ps-3'>{kadet.pleton_nama} {kadet.kompi_nama} {kadet.batalyon_nama}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-top'>Status</th>
                                                        <td className='ps-3'>
                                                            <span className={`rounded-2 px-2 text-white p-0 bg-${status_color[kadet.status]}`}>{kadet.status}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 col-md-3 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Rangkuman
                                    <i className="fs-2 bi bi-person-vcard-fill ms-auto"></i>
                                </h4>
                                <div className='card-body align-item-center px-4'>
                                    <select className='form-select' id='rangkuman-select' onChange={changeRangkuman}>
                                        <option value='minggu_ini'>Minggu Ini</option>
                                        <option value='bulan_ini'>Bulan Ini</option>
                                        <option value='tahun_ini'>Tahun Ini</option>
                                        <option value='semua'>Semua</option>
                                    </select>
                                    <table className='table mt-2'>
                                        <tbody>
                                            <tr>
                                                <th>Sakit</th>
                                                <td id='rangkuman-sakit'>{kadet.rangkuman.sakit['minggu_ini']}</td>
                                            </tr>
                                            <tr>
                                                <th>Izin</th>
                                                <td id='rangkuman-izin'>{kadet.rangkuman.izin['minggu_ini']}</td>
                                            </tr>
                                            <tr>
                                                <th>Tanpa Keterangan</th>
                                                <td id='rangkuman-tanpa_keterangan'>{kadet.rangkuman.tanpa_keterangan['minggu_ini']}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Riwayat
                                    <i className="fs-2 ms-auto bi bi-clock-history"></i>
                                </h4>
                                <div className='card-body p-2 d-flex flex-wrap'>
                                    <div className='col-12 col-lg-6 p-3'>
                                        <strong>Apel</strong>
                                        <div className='mt-2 position-relative'>
                                            {kadet.riwayatApel.map(view => {
                                                return (
                                                    <div key={view.data_apel_id} className='border-5 border-dark p-1 ps-3 border-start position-relative'>
                                                        <a href={`/laporan/pers/apel?tingkat=resimen&nomor=${view.apel_men_id}`} className={`btn btn-${keterangan_color[view.keterangan_nama]} w-100 rounded-0 text-start`}>{view.keterangan_nama}, Laporan {view.jenis_apel_nama} {view.apel_men_date.slice(0, 10)}</a>
                                                        <span className='rounded-circle border-4 border-dark timeline-circle border position-absolute'></span>
                                                    </div>
                                                )
                                            })}
                                            <span className='border-4 border-dark border position-absolute' style={{ width: 15, left: -5 }}></span>
                                            <div className='mt-2'>
                                                <button onClick={lessApel} className='btn text-decoration-underline p-1 d-none' id='btn-show-less'><small>Show less</small></button>
                                                <button onClick={moreApel} className='btn text-decoration-underline p-1'><small>Show more</small></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-lg-6 p-3'>
                                        <strong>Kegiatan</strong>
                                        <div className='mt-2 position-relative'>
                                            {/*kadet.listLapGiat.map(view => {
                                                return (
                                                    <div key={view.giat_id} className='border-5 border-dark p-1 ps-3 border-start position-relative'>
                                                        <a href={`/laporan/giat/detail?nomor=${view.giat_id}`} className='btn btn-secondary w-100 rounded-0 text-start'>{view.giat_nama}</a>
                                                        <span className='rounded-circle border-4 border-dark timeline-circle border position-absolute'></span>
                                                    </div>
                                                )
                                            })*/}
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
    )
}