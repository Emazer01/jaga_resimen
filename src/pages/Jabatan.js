import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';

export const Jabatan = () => {
    document.title = 'Jabatan Kadet - Pusat Informasi Resimen Korps Kadet'
    const navigate = useNavigate()

    const [atribut, setAtribut] = React.useState({
        pangkat: {}, pleton: {}
    })

    const [kadets, setKadets] = React.useState({})

    const [jabatans, setJabatans] = React.useState({})

    const [satuan, setSatuan] = React.useState({
        batalyon: [],
        kompi: [],
        pleton: [],
        resimen: []
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
        function getAttribut() {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/atribut`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            )
                .then(function (response) {
                    if (response.status == 200) {
                        setAtribut(response.data)
                        var batalyon = []
                        var batalyonData = []
                        var kompi = []
                        var kompiData = []
                        var pleton = []
                        var pletonData = []
                        for (let index = 0; index < response.data.pleton.length; index++) {
                            if (batalyon.includes(response.data.pleton[index].batalyon_id)) {
                            } else {
                                batalyon.push(response.data.pleton[index].batalyon_id)
                                batalyonData.push({
                                    batalyon_id: response.data.pleton[index].batalyon_id,
                                    batalyon_nama: response.data.pleton[index].batalyon_nama
                                })
                            }
                            if (kompi.includes(response.data.pleton[index].kompi_id)) {
                            } else {
                                kompi.push(response.data.pleton[index].kompi_id)
                                kompiData.push({
                                    kompi_id: response.data.pleton[index].kompi_id,
                                    kompi_nama: `${response.data.pleton[index].kompi_nama} ${response.data.pleton[index].batalyon_nama}`
                                })
                            }
                            if (pleton.includes(response.data.pleton[index].pleton_id)) {
                            } else {
                                pleton.push(response.data.pleton[index].pleton_id)
                                pletonData.push({
                                    pleton_id: response.data.pleton[index].pleton_id,
                                    pleton_nama: `${response.data.pleton[index].pleton_nama} ${response.data.pleton[index].kompi_nama} ${response.data.pleton[index].batalyon_nama}`
                                })
                            }
                        }
                        setSatuan({
                            batalyon: batalyonData,
                            kompi: kompiData,
                            pleton: pletonData,
                            resimen: [{ resimen_id: 1, resimen_nama: 'Resimen Korps Kadet Mahasiswa S1 Unhan RI' }]
                        })
                    } else {

                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
        function getJabatans() {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/jabatans`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            )
                .then(function (response) {
                    if (response.status == 200) {
                        setJabatans(response.data)
                        var stringJabatans = ``
                        var listJabatans = ``
                        for (let index = 0; index < response.data.length; index++) {
                            if (response.data[index].kadet_nama == null) {
                                if (response.data[index].tingkat == 'resimen') {
                                    listJabatans += `<option value=${response.data[index].jabatan_id}>${response.data[index].jabatan_nama}</option>`
                                }
                                response.data[index].kadet_nama = ""
                                stringJabatans += `<tr>
                                                    <td name='jabatan_nama'>${response.data[index].jabatan_nama}</td>
                                                    <td class='p-0'></td>
                                                </tr>`
                            } else {
                                stringJabatans += `<tr>
                                                        <td name='jabatan_nama'>${response.data[index].jabatan_nama}</td>
                                                        <td class='p-0'><a href='/dataKadet/kadet?nim=${response.data[index].kadet_nim}' class='btn btn-dark'>${response.data[index].kadet_nama}</a></td>
                                                    </tr>`
                            }
                        }
                        document.getElementById('input-assign-jabatan').innerHTML = listJabatans
                        document.getElementById('jabatans').innerHTML = stringJabatans
                    } else {
                        document.getElementById('jabatans').innerHTML = 'Tidak ada data'
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
        function getKadets() {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/kadets`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            )
                .then(function (response) {
                    if (response.status == 200) {
                        console.log(response.headers)
                        setKadets(response.data)
                        var stringKadets = ``
                        for (let index = 0; index < response.data.length; index++) {
                            if (response.data[index].jabatan_resimen_nama == null && response.data[index].jabatan_batalyon_nama == null && response.data[index].jabatan_kompi_nama == null && response.data[index].jabatan_pleton_nama == null) {
                                stringKadets += `<option value=${response.data[index].kadet_id}>${response.data[index].kadet_nama}</option>`
                            }

                        }
                        document.getElementById('input-assign-pejabat').innerHTML = stringKadets
                    } else {
                        document.getElementById('input-assign-pejabat').innerHTML = 'Tidak ada data'
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
        verifikasi()
        getAttribut()
        getJabatans()
        getKadets()
        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-jabatan').classList.add('sidebar-active')
        document.getElementById('btn-kelolaAkun').classList.remove('sidebar-active')
        document.getElementById('btn-dataKadet').classList.remove('sidebar-active')
        document.getElementById('sidebar-username').classList.add('btn-dark')
        document.getElementById('sidebar-username').classList.remove('btn-secondary')

        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-jabatan').classList.add('sidebar-active')
        document.getElementById('nav-btn-kelolaAkun').classList.remove('sidebar-active')
        document.getElementById('nav-btn-dataKadet').classList.remove('sidebar-active')
        document.getElementById('navbar-username').classList.add('btn-dark')
        document.getElementById('navbar-username').classList.remove('btn-secondary')

    }, [])

    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    const handleTambahJabatan = async (event) => {
        event.preventDefault();
        document.getElementById("tambah-jabatan-loading").classList.remove('d-none')
        const data = new FormData(event.currentTarget);
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tambahJabatan`,
            {
                jenis_jabatan: data.get('input-jenis-jabatan'),
                tingkat: data.get('input-tingkat-jabatan'),
                yurisdiksi: data.get('input-yurisdiksi-jabatan'),
                nama_jabatan: data.get('input-nama-jabatan')
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            }
        )
            .then(async function (response) {
                if (response.status == 200) {
                    document.getElementById("tambah-jabatan-loading").classList.add('d-none')
                    document.getElementById("tambah-jabatan-success").classList.remove('d-none')
                    await sleep(1500)
                    document.getElementById("tambah-jabatan-success").classList.add('d-none')
                    window.location.reload()
                } else {
                    console.log("udah kirim")
                    document.getElementById("tambah-jabatan-loading").classList.add('d-none')
                    document.getElementById("tambah-jabatan-danger").classList.remove('d-none')
                    await sleep(1500)
                    document.getElementById("tambah-jabatan-danger").classList.add('d-none')
                }
            })
            .catch(async function (error) {
                console.log("error kirim")
                document.getElementById("tambah-jabatan-loading").classList.add('d-none')
                document.getElementById("tambah-jabatan-danger").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("tambah-jabatan-danger").classList.add('d-none')
            });
    }

    const handleAssignJabatan = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('input-assign-tingkat'), data.get('input-assign-jabatan'), data.get('input-assign-pejabat'))
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/assignJabatan`,
            {
                tingkat: data.get('input-assign-tingkat'),
                jabatan_id: data.get('input-assign-jabatan'),
                kadet_id: data.get('input-assign-pejabat')
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            }
        )
            .then(async function (response) {
                if (response.status == 200) {
                    document.getElementById("assign-jabatan-loading").classList.add('d-none')
                    document.getElementById("assign-jabatan-success").classList.remove('d-none')
                    await sleep(1500)
                    document.getElementById("assign-jabatan-success").classList.add('d-none')
                    window.location.reload()
                } else {
                    console.log("udah kirim")
                    document.getElementById("assign-jabatan-loading").classList.add('d-none')
                    document.getElementById("assign-jabatan-danger").classList.remove('d-none')
                    await sleep(1500)
                    document.getElementById("assign-jabatan-danger").classList.add('d-none')
                }
            })
            .catch(async function (error) {
                console.log("error kirim")
                document.getElementById("assign-jabatan-loading").classList.add('d-none')
                document.getElementById("assign-jabatan-danger").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("assign-jabatan-danger").classList.add('d-none')
            });
    }

    const changeTingkat = () => {
        var tingkat = document.getElementById('input-tingkat-jabatan').value
        var stringRecent = ""
        for (let index = 0; index < satuan[tingkat].length; index++) {
            stringRecent += `<option value=${satuan[tingkat][index][`${tingkat}_id`]}>${satuan[tingkat][index][`${tingkat}_nama`]}</option>`
        }
        document.getElementById('input-yurisdiksi-jabatan').innerHTML = stringRecent
    }

    const changeAssignTingkat = () => {
        var tingkat = document.getElementById('input-assign-tingkat').value
        var stringRecent = ""
        for (let index = 0; index < jabatans.length; index++) {
            if (jabatans[index].tingkat == tingkat) {
                stringRecent += `<option value=${jabatans[index].jabatan_id}>${jabatans[index].jabatan_nama}</option>`
            }
        }
        document.getElementById('input-assign-jabatan').innerHTML = stringRecent
    }

    return (
        <div className='bg-dark bg-gradient' style={{ minHeight: "100vh" }}>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='w-100'>
                    <div className='fs-1 fw-medium text-light font-poppins p-1 pt-md-3 ps-3'>
                        <span>Jabatan</span>
                    </div>
                    <div className='p-2 p-md-3 font-nunito'>
                        <div className='d-flex flex-wrap'>
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
                                    <h4 className='card-header d-flex border-bottom'>Tambah/Assign Jabatan
                                        <i class="fs-2 ms-auto bi bi-diagram-3-fill"></i>
                                    </h4>
                                    <div className='card-body p-2'>
                                        <table className='table-dark w-100 text-center'>
                                            <tbody>
                                                <tr>
                                                    <td className='p-1 p-lg-2 col-6'>
                                                        <button className='btn btn-secondary w-100' data-bs-toggle="modal" data-bs-target="#staticBackdropMenkorps">Menkorps</button>
                                                    </td>
                                                    <td className='p-1 p-lg-2 col-6'>
                                                        <button className='btn btn-secondary w-100'>Dinas Dalam</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-wrap'>
                            <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6'>
                                <div className='card rounded-4 bg-dark shadow-lg w-100 text-light'>
                                    <h4 className='card-header d-flex border-bottom'>Menkorps
                                        <i class="fs-2 bi bi-diagram-3-fill ms-auto"></i>
                                    </h4>
                                    <div className='card-body row align-item-center px-4'>
                                        <div class="input-group p-0 pb-3">
                                            <span class="input-group-text bg-dark text-white">Cari jabatan</span>
                                            <input type="text" id='findAccount' class="form-control bg-putihdikit" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                        </div>
                                        <table class="table table-dark">
                                            <thead>
                                                <tr className='border-bottom'>
                                                    <th scope="col">Jabatan</th>
                                                    <th scope="col">Pejabat</th>
                                                </tr>
                                            </thead>
                                            <tbody id='jabatans'>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6'>
                                <div className='card rounded-4 bg-dark shadow-lg w-100 text-light'>
                                    <h4 className='card-header d-flex border-bottom'>Dinas Dalam
                                        <i class="fs-2 bi bi-bank2 ms-auto"></i>
                                    </h4>
                                    <div className='card-body row align-item-center px-4'>
                                        <div class="input-group p-0 pb-3">
                                            <span class="input-group-text bg-dark text-white">Cari dinas dalam</span>
                                            <input type="text" id='findAccount' class="form-control bg-putihdikit" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                        </div>
                                        <table class="table-dark">
                                            <thead>
                                                <tr className='border-bottom'>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Username</th>
                                                    <th scope="col">Role</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody id='accounts'>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="modal fade" id="staticBackdropMenkorps" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content bg-dark text-white">
                        <form onSubmit={handleTambahJabatan}>
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Tambah Jabatan Menkorps</h1>
                                <button type='reset' class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body px-lg-4">
                                <div className='py-1'>
                                    <div class="mb-2 row">
                                        <div className='col-12 col-lg-6 mb-2'>
                                            <label for="exampleFormControlInput1" class="form-label">Jenis<span className="text-danger">*</span></label>
                                            <select class="form-select" required aria-label="Default select example" id="input-jenis-jabatan" name='input-jenis-jabatan'>
                                                <option value="1">Komando</option>
                                                <option value="2">Staf</option>
                                                <option value="3">Perwakilan</option>
                                                <option value="4">Penegak Disiplin</option>
                                            </select>
                                        </div>
                                        <div className='col-12 col-lg-6 mb-2'>
                                            <label for="exampleFormControlInput1" class="form-label">Tingkat<span className="text-danger">*</span></label>
                                            <select class="form-select" required onChange={changeTingkat} aria-label="Default select example" id="input-tingkat-jabatan" name='input-tingkat-jabatan'>
                                                <option value="resimen">Resimen</option>
                                                <option value="batalyon">Batalyon</option>
                                                <option value="kompi">Kompi</option>
                                                <option value="pleton">Pleton</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label">Yurisdiksi<span className="text-danger">*</span></label>
                                        <select class="form-select" required aria-label="Default select example" id="input-yurisdiksi-jabatan" name='input-yurisdiksi-jabatan'>
                                            <option value="1">Resimen Korps Kadet Mahasiswa S1 Unhan RI</option>
                                        </select>
                                    </div>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label">Nama Jabatan<span className="text-danger">*</span></label>
                                        <input type="text" class="form-control" required id="input-nama-jabatan" name='input-nama-jabatan' placeholder="nama jabatan" />
                                    </div>
                                    <div className='text-center d-none' id='tambah-jabatan-loading'>
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    <div class="alert p-2 bg-danger d-none" id='tambah-jabatan-danger' role="alert">
                                        <strong>Gagal menyimpan!</strong>
                                        <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                    </div>
                                    <div class="alert p-2 bg-success d-none" id='tambah-jabatan-success' role="alert">
                                        <strong>Berhasil menyimpan!</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type='reset' class='btn btn-secondary me-auto' data-bs-toggle="modal" data-bs-target="#staticBackdropAssignMenkorps">Assign Jabatan</button>
                                <button type='reset' class="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                                <button type="submit" class="btn btn-primary px-4">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="staticBackdropAssignMenkorps" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content bg-dark text-white">
                        <form onSubmit={handleAssignJabatan}>
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Assign Jabatan Menkorps</h1>
                                <button type='reset' class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body px-lg-4">
                                <div className='py-1'>
                                    <div class="mb-2 row">
                                        <div className='col-12 col-lg-6 mb-2'>
                                            <label for="exampleFormControlInput1" class="form-label">Tingkat<span className="text-danger">*</span></label>
                                            <select class="form-select" required onChange={changeAssignTingkat} aria-label="Default select example" id="input-assign-tingkat" name='input-assign-tingkat'>
                                                <option value="resimen">Resimen</option>
                                                <option value="batalyon">Batalyon</option>
                                                <option value="kompi">Kompi</option>
                                                <option value="pleton">Pleton</option>
                                            </select>
                                        </div>
                                        <div className='col-12 col-lg-6 mb-2'>
                                            <label for="exampleFormControlInput1" class="form-label">Jabatan<span className="text-danger">*</span></label>
                                            <select class="form-select" required aria-label="Default select example" id="input-assign-jabatan" name='input-assign-jabatan'>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label">Pejabat<span className="text-danger">*</span></label>
                                        <select class="form-select" required aria-label="Default select example" id="input-assign-pejabat" name='input-assign-pejabat'>
                                        </select>
                                    </div>
                                    <div className='text-center d-none' id='assign-jabatan-loading'>
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    <div class="alert p-2 bg-danger d-none" id='assign-jabatan-danger' role="alert">
                                        <strong>Gagal menyimpan!</strong>
                                        <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                    </div>
                                    <div class="alert p-2 bg-success d-none" id='assign-jabatan-success' role="alert">
                                        <strong>Berhasil menyimpan!</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type='reset' class='btn btn-secondary me-auto' data-bs-toggle="modal" data-bs-target="#staticBackdropMenkorps">Tambah Jabatan</button>
                                <button type='reset' class="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                                <button type="submit" class="btn btn-primary px-4">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}