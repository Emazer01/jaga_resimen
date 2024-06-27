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

    const [kadet, setKadet] = React.useState({})

    const listKet = [
        {
            keterangan_id: 11,
            keterangan_nama: 'Hadir',
            laporan_judul: 'Laporan Apel Pagi',
            tanggal: '18/02/2024'
        }, {
            keterangan_id: 10,
            keterangan_nama: 'Hadir',
            laporan_judul: 'Laporan Apel Malam',
            tanggal: '17/02/2024'
        }, {
            keterangan_id: 9,
            keterangan_nama: 'Hadir',
            laporan_judul: 'Laporan Apel Pagi',
            tanggal: '17/02/2024'
        }, {
            keterangan_id: 8,
            keterangan_nama: 'Sakit',
            laporan_judul: 'Laporan Apel Malam',
            tanggal: '16/02/2024'
        }, {
            keterangan_id: 7,
            keterangan_nama: 'Sakit',
            laporan_judul: 'Laporan Apel Pagi',
            tanggal: '16/02/2024'
        }, {
            keterangan_id: 6,
            keterangan_nama: 'Hadir',
            laporan_judul: 'Laporan Apel Malam',
            tanggal: '15/02/2024'
        }, {
            keterangan_id: 5,
            keterangan_nama: 'Izin',
            laporan_judul: 'Laporan Apel Pagi',
            tanggal: '15/02/2024'
        }, {
            keterangan_id: 4,
            keterangan_nama: 'Hadir',
            laporan_judul: 'Laporan Apel Malam',
            tanggal: '14/02/2024'
        }, {
            keterangan_id: 3,
            keterangan_nama: 'Hadir',
            laporan_judul: 'Laporan Apel Pagi',
            tanggal: '14/02/2024'
        }, {
            keterangan_id: 2,
            keterangan_nama: 'Hadir',
            laporan_judul: 'Laporan Apel Malam',
            tanggal: '13/02/2024'
        }, {
            keterangan_id: 1,
            keterangan_nama: 'Hadir',
            laporan_judul: 'Laporan Apel Pagi',
            tanggal: '13/02/2024'
        }
    ]
    const [sliceKet, setSliceKet] = React.useState([0, 5])
    const [viewKet, setViewKet] = React.useState([])

    React.useEffect(() => {
        setViewKet(listKet.slice(sliceKet[0], sliceKet[1]))
    }, [sliceKet])

    const listGiat = [
        {
            giat_id: 11,
            giat_nama: 'Parade Surya Senja',
            giat_tempat: 'Hambalang',
            tanggal: '18/02/2024'
        }, {
            giat_id: 10,
            giat_nama: 'Parade Surya Senja',
            giat_tempat: 'Kemhan Pusat',
            tanggal: '17/02/2024'
        }, {
            giat_id: 9,
            giat_nama: 'Parade Surya Senja',
            giat_tempat: 'Hambalang',
            tanggal: '17/02/2024'
        }, {
            giat_id: 8,
            giat_nama: 'Parade Surya Senja',
            giat_tempat: 'Kemhan Pusat',
            tanggal: '16/02/2024'
        }, {
            giat_id: 7,
            giat_nama: 'Parade Surya Senja',
            giat_tempat: 'Hambalang',
            tanggal: '16/02/2024'
        }, {
            giat_id: 6,
            giat_nama: 'Parade Surya Senja',
            giat_tempat: 'Kemhan Pusat',
            tanggal: '15/02/2024'
        }, {
            giat_id: 5,
            giat_nama: 'Parade Surya Senja',
            giat_tempat: 'Hambalang',
            tanggal: '15/02/2024'
        }, {
            giat_id: 4,
            giat_nama: 'Parade Surya Senja',
            giat_tempat: 'Kemhan Pusat',
            tanggal: '14/02/2024'
        }, {
            giat_id: 3,
            giat_nama: 'Parade Surya Senja',
            giat_tempat: 'Hambalang',
            tanggal: '14/02/2024'
        }, {
            giat_id: 2,
            giat_nama: 'Parade Surya Senja',
            giat_tempat: 'Kemhan Pusat',
            tanggal: '13/02/2024'
        }, {
            giat_id: 1,
            giat_nama: 'Parade Surya Senja',
            giat_tempat: 'Hambalang',
            tanggal: '13/02/2024'
        }
    ]
    const [sliceGiat, setSliceGiat] = React.useState([0, 5])
    const [viewGiat, setViewGiat] = React.useState([])

    React.useEffect(() => {
        setViewGiat(listGiat.slice(sliceGiat[0], sliceGiat[1]))
    }, [sliceGiat])

    React.useEffect(() => {
        verifikasi()
        getKadet().then(x => {
            setKadet(x)
            console.log(x)
            if (x) {
                document.title = `${x.kadet_nama} - Pusat Informasi Resimen Korps Kadet`
            }
        })
        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-personil').classList.add('sidebar-active')

        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-personil').classList.add('sidebar-active')
    }, [])

    const showLess = ({ slice, set }) => {
        if (slice[1] > 5) {
            return (
                <button onClick={() => { set([0, 5]) }} className='btn text-decoration-underline'>Show less</button>
            )
        }

    }
    const showMore = ({ slice, set }) => {
        if (slice[1] < listKet.length) {
            return (
                <button onClick={() => { set([0, slice[1] + 5]) }} className='btn text-decoration-underline'>Show more</button>
            )
        }

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
                                            <div className='p-1'>
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
                                                            <span className={`rounded-2 px-2 text-white p-0 bg-${status_color[kadet.status_nama]}`}>{kadet.status_nama}</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-top'>Keterangan</th>
                                                        <td className='ps-3'>
                                                            <span className={`rounded-2 px-2 text-white p-0 bg-${keterangan_color[kadet.keterangan_nama]}`}>{kadet.keterangan_nama}</span>
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
                                    <select className='form-select'>
                                        <option>Minggu Ini</option>
                                        <option>Bulan Ini</option>
                                        <option>Tahun Ini</option>
                                        <option>Semua</option>
                                    </select>
                                    <table className='table mt-2'>
                                        <tbody>
                                            <tr>
                                                <th>Sakit</th>
                                                <td>1</td>
                                            </tr>
                                            <tr>
                                                <th>Izin</th>
                                                <td>1</td>
                                            </tr>
                                            <tr>
                                                <th>Tanpa Keterangan</th>
                                                <td>1</td>
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
                                        <strong>Keterangan</strong>
                                        <div className='mt-2 position-relative'>
                                            {viewKet.map(view => {
                                                return (
                                                    <div key={view.keterangan_id} className='border-5 border-dark p-1 ps-3 border-start position-relative'>
                                                        <button className={`btn btn-${keterangan_color[view.keterangan_nama]} w-100 rounded-0 text-start`}>{view.keterangan_nama}, {view.laporan_judul} {view.tanggal}</button>
                                                        <span className='rounded-circle border-4 border-dark timeline-circle border position-absolute'></span>
                                                    </div>
                                                )
                                            })}
                                            {showLess({ slice: sliceKet, set: setSliceKet })}
                                            {showMore({ slice: sliceKet, set: setSliceKet })}
                                            <span className='border-4 border-dark border position-absolute' style={{ width: 15, left: -5 }}></span>
                                        </div>
                                    </div>
                                    <div className='col-12 col-lg-6 p-3'>
                                        <strong>Kegiatan</strong>
                                        <div className='mt-2 position-relative'>
                                            {viewGiat.map(view => {
                                                return (
                                                    <div key={view.giat_id} className='border-5 border-dark p-1 ps-3 border-start position-relative'>
                                                        <button className='btn btn-secondary w-100 rounded-0 text-start'>{view.giat_nama}, {view.giat_tempat} {view.tanggal}</button>
                                                        <span className='rounded-circle border-4 border-dark timeline-circle border position-absolute'></span>
                                                    </div>
                                                )
                                            })}
                                            {showLess({ slice: sliceGiat, set: setSliceGiat })}
                                            {showMore({ slice: sliceGiat, set: setSliceGiat })}
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