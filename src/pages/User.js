import * as React from 'react';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import { Heading } from '../component/Minor';
import { verifikasi } from '../function/Verifikasi';
import { getAttribut, myKadet } from '../function/Get';
import { handleChangeFoto } from '../function/Change';
import { handleChangePassword, handleEditKadet } from '../function/Put';
import { ModalFormEditKadet, ModalFormPassword } from '../component/Modal';

export const User = () => {
    document.title = 'Profile - Pusat Informasi Resimen Korps Kadet'

    const keterangan_color = {
        'Hadir': 'primary',
        'Sakit': 'success',
        'Izin': 'warning',
        'Tanpa Keterangan': 'danger'
    }

    const status_color = {
        'Aktif': '#888888',
        'Tidak Aktif': '#000000'
    }

    const jk = {
        'L': 'Laki-laki',
        'P': 'Perempuan'
    }

    const [kadet, setKadet] = React.useState({
        kadet_nim: "",
        kadet_nama: "",
        keterangan_nama: "",
        pleton_nama: "",
        kompi_nama: "",
        batalyon_nama: "",
        status_nama: "",
        pangkat_nama: "",
        jenis_kelamin: "",
        pangkat_id: "",
        pleton_id: "",
        foto_isi: `data:image/jpeg;base64,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`,
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

    const [akun, setAkun] = React.useState({
        username: '',
        role_id: ''
    })

    const [atribut, setAtribut] = React.useState({
        pangkat: {}, pleton: {}
    })

    const [foto, setFoto] = React.useState({
        url: `data:image/jpeg;base64,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`
    })

    const [pleton, setPleton] = React.useState([])
    const [pangkat, setPangkat] = React.useState([])

    const [limit, setLimit] = React.useState({
        riwayatApel: 5
    })

    React.useEffect(() => {
        verifikasi().then(x => {
            console.log(x.role)
            setAkun(x)
            if (x.role != 'Kadet') {
                document.getElementById('data-diri').classList.add('d-none')
            }
        })
        getAttribut().then(x => {
            setAtribut(x)
            if (x) {
                var stringPleton = []
                for (let index = 0; index < x.pleton.length; index++) {
                    stringPleton.push({
                        pleton_id: x.pleton[index].pleton_id,
                        pleton_nama: `${x.pleton[index].pleton_nama} ${x.pleton[index].kompi_nama} ${x.pleton[index].batalyon_nama}`

                    })
                }
                setPleton(stringPleton)
                var stringPangkat = []
                for (let index = 0; index < x.pangkat.length; index++) {
                    stringPangkat.push({
                        pangkat_id: x.pangkat[index].pangkat_id,
                        pangkat_nama: x.pangkat[index].pangkat_nama
                    })
                }
                setPangkat(stringPangkat)
            }
        })
        myKadet(limit.riwayatApel).then(x => {
            if (x) {
                setKadet(x)
                setFoto({ url: x.foto_isi })
            }
        })
        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('sidebar-username').classList.remove('btn-dark')
        document.getElementById('sidebar-username').classList.add('btn-secondary')

        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('navbar-username').classList.remove('btn-dark')
        document.getElementById('navbar-username').classList.add('btn-secondary')

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
                    <Heading query={'Profile'} />
                    <div className='p-2 d-flex flex-wrap font-nunito'>
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 rounded-3 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Akun
                                    <i class="fs-2 ms-auto bi bi-person-circle"></i>
                                </h4>
                                <div className='card-body p-2 p-lg-3'>
                                    <div className='d-flex my-2'>
                                        <strong className='col'>Username</strong>
                                        <span className='col fw-bold' id='username'>{akun.username}</span>
                                    </div>
                                    <div className='d-flex mb-2'>
                                        <strong className='col'>Role</strong>
                                        <span className='col fw-bold' id='role'>{akun.role}</span>
                                    </div>
                                    <div className='d-flex mb-2'>
                                        <strong className='col'>Password</strong>
                                        <span className='col'>******** <button className='p-1 px-2 btn btn-secondary' data-bs-toggle="modal" data-bs-target="#staticBackdropPassword"><small>Change Password</small></button></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 rounded-3 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>...
                                    <i class="fs-2 ms-auto bi bi-person-fill-add"></i>
                                </h4>
                                <div className='card-body p-2'>

                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 col-md-9 d-flex flex-wrap' id='data-diri'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Data Diri
                                    <i class="fs-2 bi bi-person-vcard-fill ms-auto"></i>
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
                                                            <span className="rounded-2 px-2 text-white p-0" style={{ backgroundColor: status_color[kadet.status] }}>{kadet.status}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <button className='card-footer btn rounded-bottom-4 border-none border-top text-end p-1' data-bs-toggle="modal" data-bs-target="#staticBackdropKadet"><small>Edit Data Diri<i class="ms-2 bi bi-box-arrow-up-right"></i></small></button>
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
                                                        <button className={`btn btn-${keterangan_color[view.keterangan_nama]} w-100 rounded-0 text-start`}>{view.keterangan_nama}, Laporan {view.jenis_apel_nama} {view.apel_men_date.slice(0, 10)}</button>
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
            <ModalFormPassword />
            <ModalFormEditKadet pleton={pleton} pangkat={pangkat} kadet={kadet} foto={foto} setFoto={setFoto} />
        </div>
    )
}