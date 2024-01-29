import * as React from 'react';
import axios from 'axios';
import { Await, useNavigate } from 'react-router-dom';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';

export const Kadet = () => {
    const navigate = useNavigate()

    const keterangan_color = {
        'Hadir': '#0b0bbb',
        'Sakit': '#0bbb0b',
        'Izin': '#bbbb0b',
        'Tanpa Keterangan': '#bb0b0b'
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
        foto_isi: `data:image/jpeg;base64,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`
    })

    React.useEffect(() => {
        function verifikasi() {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/verify`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            )
                .then(function (response) {
                    if (response.status == 200) {
                        setInterval(() => {
                            const tanggal = new Date().toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" });
                            document.getElementById("tanggal").innerHTML = tanggal
                            //document.getElementById("tanggal2").innerHTML = tanggal
                            const waktu = new Date().toLocaleString('id-id', { hour: "2-digit", minute: "2-digit", second: "2-digit" });
                            document.getElementById("waktu").innerHTML = "Pukul " + waktu
                            //document.getElementById("waktu2").innerHTML = "Pukul " + waktu
                        }, 1000)
                        if (response.data.role_id != 1) {
                            document.getElementById("btn-kelolaAkun").classList.add('d-none')

                            document.getElementById("nav-btn-kelolaAkun").classList.add('d-none')
                        }
                        document.getElementById('isi-navbar-username').innerHTML = response.data.username
                        document.getElementById('isi-sidebar-username').innerHTML = response.data.username
                    } else {
                        navigate('/forbidden')
                    }
                })
                .catch(function (error) {
                    navigate('/forbidden')
                });
        }
        function getKadet() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const kadet_nim = urlParams.get('nim')
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/kadet?nim=${kadet_nim}`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            )
                .then(function (response) {
                    console.log(response.headers);
                    if (response.status == 200) {
                        setKadet(response.data)
                        document.title = `${response.data.kadet_nama} - Pusat Informasi Resimen Korps Kadet`
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
        verifikasi()
        getKadet()
        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-jabatan').classList.remove('sidebar-active')
        document.getElementById('btn-kelolaAkun').classList.remove('sidebar-active')
        document.getElementById('btn-dataKadet').classList.add('sidebar-active')
        document.getElementById('sidebar-username').classList.add('btn-dark')
        document.getElementById('sidebar-username').classList.remove('btn-secondary')

        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-jabatan').classList.remove('sidebar-active')
        document.getElementById('nav-btn-kelolaAkun').classList.remove('sidebar-active')
        document.getElementById('nav-btn-dataKadet').classList.add('sidebar-active')
        document.getElementById('navbar-username').classList.add('btn-dark')
        document.getElementById('navbar-username').classList.remove('btn-secondary')

    }, [])

    return (
        <div className='bg-dark bg-gradient' style={{ minHeight: "100vh" }}>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='w-100'>
                    <div className='fs-1 fw-medium text-light font-poppins p-1 pt-md-3 ps-3'>
                        <span>Data Kadet</span>
                    </div>
                    <div className='p-2 p-md-3 d-flex flex-wrap font-nunito'>
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 rounded-3 d-flex flex-wrap'>
                            <div className='card rounded-4 bg-dark shadow-lg text-light w-100 col-12'>
                                <h2 className='p-3'>
                                    <span id='tanggal'></span><br />
                                    <span id='waktu'></span>
                                </h2>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 rounded-3 d-flex flex-wrap'>
                            <div className='card rounded-4 bg-dark shadow-lg text-light w-100 col-12'>
                                <h4 className='card-header d-flex border-bottom'>Penugasan
                                    <i class="fs-2 ms-auto bi bi-bank2"></i>
                                </h4>
                                <div className='card-body p-2'>
                                    <table className='w-100'>
                                        <tr>
                                            <th>Jabatan</th>
                                            <td id='jabatan'>asdasdasd</td>
                                        </tr>
                                        <tr>
                                            <th>Dinas Dalam</th>
                                            <td id='dinas-dalam'>asdasdasd</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 d-flex flex-wrap'>
                            <div className='card rounded-4 bg-dark shadow-lg w-100 text-light'>
                                <h4 className='card-header d-flex border-bottom'>Data Diri
                                    <i class="fs-2 bi bi-person-vcard-fill ms-auto"></i>
                                </h4>
                                <div className='card-body row align-item-center px-4'>
                                    <div className='row'>
                                        <div className='col-12 col-lg-3'>
                                            <div className='p-1 '>
                                                <img src={kadet.foto_isi} className="rounded-4 w-100" />
                                            </div>
                                        </div>
                                        <div className='col-12 col-lg-9 px-1 px-lg-3'>
                                            <table className='fs-4 w-100 table table-dark'>
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
                                                            <span className="rounded-2 px-2 text-white p-0" style={{ backgroundColor: status_color[kadet.status_nama] }}>{kadet.status_nama}</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-top'>Keterangan</th>
                                                        <td className='ps-3'>
                                                            <span className='rounded-2 px-2 text-white p-0' style={{ backgroundColor: keterangan_color[kadet.keterangan_nama] }}>{kadet.keterangan_nama}</span>
                                                        </td>
                                                    </tr>
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