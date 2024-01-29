import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = () => {
    document.title = 'Dashboard - Pusat Informasi Resimen Korps Kadet'
    const navigate = useNavigate()
    const data = {
        labels: ['Hadir', 'Sakit', 'Izin', 'Tanpa Keterangan'],
        datasets: [
            {
                label: 'Jumlah',
                data: [1000, 50, 100, 50],
                backgroundColor: [
                    '#0b0bbb',
                    '#0bbb0b',
                    '#bbbb0b',
                    '#bb0b0b'
                ],
                borderColor: [
                    '#212529'
                ],
                borderWidth: 1
            }
        ]
    };

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
        verifikasi()

        document.getElementById('btn-dashboard').classList.add('sidebar-active')
        document.getElementById('btn-jabatan').classList.remove('sidebar-active')
        document.getElementById('btn-kelolaAkun').classList.remove('sidebar-active')
        document.getElementById('btn-dataKadet').classList.remove('sidebar-active')
        document.getElementById('sidebar-username').classList.add('btn-dark')
        document.getElementById('sidebar-username').classList.remove('btn-secondary')

        document.getElementById('nav-btn-dashboard').classList.add('sidebar-active')
        document.getElementById('nav-btn-jabatan').classList.remove('sidebar-active')
        document.getElementById('nav-btn-kelolaAkun').classList.remove('sidebar-active')
        document.getElementById('nav-btn-dataKadet').classList.remove('sidebar-active')
        document.getElementById('navbar-username').classList.add('btn-dark')
        document.getElementById('navbar-username').classList.remove('btn-secondary')

    }, [])

    return (
        <div className='bg-dark bg-gradient'>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='w-100'>
                    <div className='fs-1 fw-medium text-light font-poppins p-1 pt-md-3 ps-3'>
                        <span>Dashboard</span>
                    </div>
                    <div className='p-2 p-md-3 d-flex flex-wrap font-nunito'>
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-8 d-flex flex-wrap'>
                            <div className='w-100 pb-1 col-12 d-flex d-lg-none'>
                                <h2 className='p-3 rounded-4 w-100 bg-dark shadow-lg text-light'>
                                    <span id='tanggal'></span><br />
                                    <span id='waktu'></span>
                                </h2>
                            </div>
                            <div className='card rounded-4 bg-dark shadow-lg text-light'>
                                <h4 className='card-header d-flex border-bottom'>Kondisi Pasukan
                                    <i class="fs-2 bi bi-person-lines-fill ms-auto"></i>
                                </h4>
                                <div className='card-body row align-item-center px-4'>
                                    <div className='col-12 col-lg-7 p-0'><Pie data={data} style={{ color: '#fff' }} /></div>
                                    <div className='col-12 col-lg-5 p-0 py-2 d-flex flex-wrap'>
                                        <div className='col-12 p-1 d-flex'>
                                            <div class="card text-light w-100 bg-secondary">
                                                <div class="card-header p-1">
                                                    Jumlah
                                                </div>
                                                <div class="card-body p-1">
                                                    <span className='fs-3 fw-semibold'>1200</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-6 p-1 d-flex'>
                                            <div class="card text-light w-100" style={{ backgroundColor: data.datasets[0].backgroundColor[0] }}>
                                                <div class="card-header p-1">
                                                    Hadir
                                                </div>
                                                <div class="card-body p-1">
                                                    <span className='fs-3 fw-semibold'>1000</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-6 p-1 d-flex'>
                                            <div class="card text-light w-100" style={{ backgroundColor: data.datasets[0].backgroundColor[1] }}>
                                                <div class="card-header p-1">
                                                    Sakit
                                                </div>
                                                <div class="card-body p-1">
                                                    <span className='fs-3 fw-semibold'>50</span>
                                                </div>
                                                <a className='card-footer btn btn-success text-end p-1'><small>Selengkapnya<i class="ms-2 bi bi-box-arrow-up-right"></i></small></a>
                                            </div>
                                        </div>
                                        <div className='col-6 p-1 d-flex'>
                                            <div class="card text-light w-100" style={{ backgroundColor: data.datasets[0].backgroundColor[2] }}>
                                                <div class="card-header p-1">
                                                    Izin
                                                </div>
                                                <div class="card-body p-1">
                                                    <span className='fs-3 fw-semibold'>100</span>
                                                </div>
                                                <a className='card-footer btn btn-warning text-end p-1'><small>Selengkapnya<i class="ms-2 bi bi-box-arrow-up-right"></i></small></a>
                                            </div>
                                        </div>
                                        <div className='col-6 p-1 d-flex'>
                                            <div class="card text-light w-100" style={{ backgroundColor: data.datasets[0].backgroundColor[3] }}>
                                                <div class="card-header p-1">
                                                    Tanpa Keterangan
                                                </div>
                                                <div class="card-body p-1">
                                                    <span className='fs-3 fw-semibold'>50</span>
                                                </div>
                                                <a className='card-footer btn btn-danger text-end p-1'><small>Selengkapnya<i class="ms-2 bi bi-box-arrow-up-right"></i></small></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-4 rounded-3 d-flex flex-wrap'>
                            <div className='w-100 col-12 d-none d-lg-flex pb-2'>
                                <h2 className='p-3 rounded-4 w-100 bg-dark shadow-lg text-light'>
                                    <span id='tanggal2'></span><br />
                                    <span id='waktu2'></span>
                                </h2>
                            </div>
                            <div className='card rounded-4 bg-dark text-light w-100 col-12'>
                                <h4 className='card-header d-flex border-bottom'>Dinas Dalam
                                    <i class="fs-2 ms-auto bi bi-bank2"></i>
                                </h4>
                                <div className='card-body'>
                                    <div class="card text-light w-100 bg-dark border-secondary my-2">
                                        <div class="card-header p-1 bg-secondary">
                                            <small>Kadet Perwira Jaga Resimen</small>
                                        </div>
                                        <a class="card-body p-1 btn text-start">
                                            <span className='fw-semibold'>SMDK <span>Gary Ferdinand Wahyudi</span></span><br />
                                            <span className='fw-semibold'>SMDK <span>Gary Ferdinand Wahyudi</span></span>
                                        </a>
                                    </div>
                                    <div class="card text-light w-100 bg-dark border-secondary my-2">
                                        <div class="card-header p-1 bg-secondary">
                                            <small>Asisten Kadet Perwira Jaga Resimen</small>
                                        </div>
                                        <a class="card-body p-1 btn text-start">
                                            <span className='fw-semibold'>SK <span>Gary Ferdinand Wahyudi</span></span><br />
                                            <span className='fw-semibold'>SK <span>Gary Ferdinand Wahyudi</span></span>
                                        </a>
                                    </div>
                                </div>
                                <a className='card-footer btn btn-dark text-end p-1'><small>Selengkapnya<i class="ms-2 bi bi-box-arrow-up-right"></i></small></a>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 col-12 col-lg-6 rounded-3 d-flex'>
                            <div className='card rounded-4 bg-dark text-light w-100'>
                                <h4 className='card-header d-flex border-bottom'>Laporan Personil
                                    <i class="fs-2 ms-auto bi bi-file-post"></i>
                                </h4>
                                <div className='card-body'>
                                    <div class="card text-light w-100 bg-dark border-secondary my-2">
                                        <div class="card-header p-1 bg-secondary">
                                            <small>Apel Pagi 10 Desember 2023</small>
                                        </div>
                                        <div class="card-body p-1">
                                            <table className='w-100'>
                                                <tr>
                                                    <th className='px-2'>Hadir</th>
                                                    <td>:</td>
                                                    <td className='p-1 px-2 '><span className='p-1 rounded-1 d-flex' style={{ backgroundColor: data.datasets[0].backgroundColor[0] }}>1000</span></td>
                                                </tr>
                                                <tr>
                                                    <th className='px-2'>Sakit</th>
                                                    <td>:</td>
                                                    <td className='p-1 px-2 '><span className='p-1 rounded-1 d-flex' style={{ backgroundColor: data.datasets[0].backgroundColor[1] }}>50</span></td>
                                                </tr>
                                                <tr>
                                                    <th className='px-2'>Izin</th>
                                                    <td>:</td>
                                                    <td className='p-1 px-2 '><span className='p-1 rounded-1 d-flex' style={{ backgroundColor: data.datasets[0].backgroundColor[2] }}>100</span></td>
                                                </tr>
                                                <tr>
                                                    <th className='px-2'>Tanpa Keterangan</th>
                                                    <td>:</td>
                                                    <td className='p-1 px-2 '><span className='p-1 rounded-1 d-flex' style={{ backgroundColor: data.datasets[0].backgroundColor[3] }}>50</span></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <a class="card-footer p-1 btn btn-dark text-end">
                                            <small>Dilaporkan oleh <span>SMDK Gary Ferdinand Wahyudi</span><i class="ms-2 bi bi-box-arrow-up-right"></i></small>
                                        </a>
                                    </div>
                                    <div class="card text-light w-100 bg-dark border-secondary my-2">
                                        <div class="card-header p-1 bg-secondary">
                                            <small>Apel Malam 10 Desember 2023</small>
                                        </div>
                                        <div class="card-body p-1">
                                            <table className='w-100'>
                                                <tr>
                                                    <th className='px-2'>Hadir</th>
                                                    <td>:</td>
                                                    <td className='p-1 px-2 '><span className='p-1 rounded-1 d-flex' style={{ backgroundColor: data.datasets[0].backgroundColor[0] }}>1000</span></td>
                                                </tr>
                                                <tr>
                                                    <th className='px-2'>Sakit</th>
                                                    <td>:</td>
                                                    <td className='p-1 px-2 '><span className='p-1 rounded-1 d-flex' style={{ backgroundColor: data.datasets[0].backgroundColor[1] }}>50</span></td>
                                                </tr>
                                                <tr>
                                                    <th className='px-2'>Izin</th>
                                                    <td>:</td>
                                                    <td className='p-1 px-2 '><span className='p-1 rounded-1 d-flex' style={{ backgroundColor: data.datasets[0].backgroundColor[2] }}>100</span></td>
                                                </tr>
                                                <tr>
                                                    <th className='px-2'>Tanpa Keterangan</th>
                                                    <td>:</td>
                                                    <td className='p-1 px-2 '><span className='p-1 rounded-1 d-flex' style={{ backgroundColor: data.datasets[0].backgroundColor[3] }}>50</span></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <a class="card-footer p-1 btn btn-dark text-end">
                                            <small>Dilaporkan oleh <span>SMDK Gary Ferdinand Wahyudi</span><i class="ms-2 bi bi-box-arrow-up-right"></i></small>
                                        </a>
                                    </div>
                                    <div class="card text-light w-100 bg-dark border-secondary my-2">
                                        <div class="card-header p-1 bg-secondary-subtle text-dark">
                                            <small>Laporan <span>Sakit</span></small>
                                        </div>
                                        <div class="card-body p-1">
                                            <table className='w-100'>
                                                <tr>
                                                    <th className='px-2'>Nama</th>
                                                    <td>:</td>
                                                    <td className='p-1 px-2 '>SMSK Gary Ferdinand Wahyudi</td>
                                                </tr>
                                                <tr>
                                                    <th className='px-2'>Satuan</th>
                                                    <td>:</td>
                                                    <td className='p-1 px-2 '>Pleton 1 Kompi A Batalyon Tk IV / Wreda</td>
                                                </tr>
                                                <tr>
                                                    <th className='px-2'>Sakit</th>
                                                    <td>:</td>
                                                    <td className='p-1 px-2 '>Demam</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <a class="card-footer p-1 btn btn-dark text-end">
                                            <small>Dilaporkan oleh <span>SMDK Gary Ferdinand Wahyudi</span><i class="ms-2 bi bi-box-arrow-up-right"></i></small>
                                        </a>
                                    </div>
                                    <div class="card text-light w-100 bg-dark border-secondary my-2">
                                        <div class="card-header p-1 bg-secondary-subtle text-dark">
                                            <small>Laporan <span>Izin</span></small>
                                        </div>
                                        <div class="card-body p-1">
                                            <table className='w-100'>
                                                <tr>
                                                    <th className='px-2'>Nama</th>
                                                    <td>:</td>
                                                    <td className='p-1 px-2 '>SMSK Gary Ferdinand Wahyudi</td>
                                                </tr>
                                                <tr>
                                                    <th className='px-2'>Satuan</th>
                                                    <td>:</td>
                                                    <td className='p-1 px-2 '>Pleton 1 Kompi A Batalyon Tk IV / Wreda</td>
                                                </tr>
                                                <tr>
                                                    <th className='px-2'>Izin</th>
                                                    <td>:</td>
                                                    <td className='p-1 px-2 '>Penelitian</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <a class="card-footer p-1 btn btn-dark text-end">
                                            <small>Dilaporkan oleh <span>SMDK Gary Ferdinand Wahyudi</span><i class="ms-2 bi bi-box-arrow-up-right"></i></small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 col-12 col-lg-6 rounded-3 d-flex'>
                            <div className='card rounded-4 bg-dark text-light w-100'>
                                <h4 className='card-header d-flex border-bottom'>Laporan Kegiatan
                                    <i class="fs-2 ms-auto bi bi-file-richtext-fill"></i>
                                </h4>
                                <div className='card-body'>
                                    <div class="card text-light w-100 bg-dark border-secondary my-2">
                                        <div class="card-header p-1 bg-secondary">
                                            <small>Kadet Perwira Jaga Resimen</small>
                                        </div>
                                        <a class="card-body p-1 btn text-start">
                                            <span className='fw-semibold'>SMDK <span>Gary Ferdinand Wahyudi</span></span>
                                        </a>
                                    </div>
                                    <div class="card text-light w-100 bg-dark border-secondary my-2">
                                        <div class="card-header p-1 bg-secondary">
                                            <small>Asisten Kadet Perwira Jaga Resimen</small>
                                        </div>
                                        <a class="card-body p-1 btn text-start">
                                            <span className='fw-semibold'>SK <span>Gary Ferdinand Wahyudi</span></span>
                                        </a>
                                    </div>
                                    <div class="card text-light w-100 bg-dark border-secondary my-2">
                                        <div class="card-header p-1 bg-secondary-subtle text-dark">
                                            <small>Jaga Batalyon TK I / Remaja</small>
                                        </div>
                                        <a class="card-body p-1 btn text-start">
                                            <span className='fw-semibold'>SMDK <span>Gary Ferdinand Wahyudi</span></span>
                                        </a>
                                    </div>
                                    <div class="card text-light w-100 bg-dark border-secondary my-2">
                                        <div class="card-header p-1 bg-secondary-subtle text-dark">
                                            <small>Jaga Batalyon TK II / Dewasa</small>
                                        </div>
                                        <a class="card-body p-1 btn text-start">
                                            <span className='fw-semibold'>SMDK <span>Gary Ferdinand Wahyudi</span></span>
                                        </a>
                                    </div>
                                    <div class="card text-light w-100 bg-dark border-secondary my-2">
                                        <div class="card-header p-1 bg-secondary-subtle text-dark">
                                            <small>Jaga Batalyon TK III / Madya</small>
                                        </div>
                                        <a class="card-body p-1 btn text-start">
                                            <span className='fw-semibold'>SMDK <span>Gary Ferdinand Wahyudi</span></span>
                                        </a>
                                    </div>
                                    <div class="card text-light w-100 bg-dark border-secondary my-2">
                                        <div class="card-header p-1 bg-secondary-subtle text-dark">
                                            <small>Jaga Batalyon TK IV / Wreda</small>
                                        </div>
                                        <a class="card-body p-1 btn text-start">
                                            <span className='fw-semibold'>SMDK <span>Gary Ferdinand Wahyudi</span></span>
                                        </a>
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