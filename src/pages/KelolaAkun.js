import * as React from 'react';
import axios from 'axios';
import { Await, useNavigate } from 'react-router-dom';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import * as XLSX from 'xlsx'

export const KelolaAkun = () => {
    document.title = 'Kelola Akun - Pusat Informasi Resimen Korps Kadet'
    const navigate = useNavigate()

    const role_color = {
        'admin': 'bg-info text-black',
        'kadet': 'bg-primary',
        'pengasuh': 'bg-secondary'
    }

    const defaultAttributes = {
        foto: `data:image/jpeg;base64,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`
    }

    const [accounts, setAccounts] = React.useState({
        akun_id: 1, username: 'AdminMenkor', role_target: 'admin'
    })

    const [atribut, setAtribut] = React.useState({
        pangkat: {}, pleton: {}
    })

    const [foto, setFoto] = React.useState({
        url: `data:image/jpeg;base64,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`
    })

    const [excel, setExcel] = React.useState()

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
                            navigate('/forbidden')
                            window.location.reload()
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
        function getAccounts() {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/accounts`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            )
                .then(function (response) {
                    if (response.status == 200) {
                        console.log(response.headers);
                        setAccounts(response.data)
                        var stringAccounts = ``
                        for (let index = 0; index < response.data.length; index++) {
                            stringAccounts += `<tr>
                                                    <th class='p-1'>${response.data[index].akun_id}</th>
                                                    <td class='p-1'>${response.data[index].username}</td>
                                                    <td class='p-2'><span class='w-100 p-1 px-2 px-lg-4 rounded-3 ${role_color[response.data[index].role_target]}'>${response.data[index].role_target}</span></td>
                                                    <td class='p-1'></td>
                                               </tr>`
                        }
                        document.getElementById('accounts').innerHTML = stringAccounts
                    } else {
                        document.getElementById('accounts').innerHTML = 'Tidak ada data'
                    }
                })
                .catch(function (error) {
                    console.log(error)
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
                        console.log(response.data)
                        var stringPleton = ``
                        for (let index = 0; index < response.data.pleton.length; index++) {
                            stringPleton += `<option value=${response.data.pleton[index].pleton_id}>${response.data.pleton[index].pleton_nama} ${response.data.pleton[index].kompi_nama} ${response.data.pleton[index].batalyon_nama}</option>`
                        }
                        document.getElementById('input-pleton').innerHTML = stringPleton
                        document.getElementById('input-pleton-bulk').innerHTML = stringPleton
                        var stringPangkat = ``
                        for (let index = 0; index < response.data.pangkat.length; index++) {
                            stringPangkat += `<option value=${response.data.pangkat[index].pangkat_id}>${response.data.pangkat[index].pangkat_nama}</option>`
                        }
                        document.getElementById('input-pangkat').innerHTML = stringPangkat
                        document.getElementById('input-pangkat-bulk').innerHTML = stringPangkat
                    } else {

                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
        verifikasi()
        getAccounts()
        getAttribut()
        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-jabatan').classList.remove('sidebar-active')
        document.getElementById('btn-kelolaAkun').classList.add('sidebar-active')
        document.getElementById('btn-dataKadet').classList.remove('sidebar-active')
        document.getElementById('sidebar-username').classList.add('btn-dark')
        document.getElementById('sidebar-username').classList.remove('btn-secondary')

        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-jabatan').classList.remove('sidebar-active')
        document.getElementById('nav-btn-kelolaAkun').classList.add('sidebar-active')
        document.getElementById('nav-btn-dataKadet').classList.remove('sidebar-active')
        document.getElementById('navbar-username').classList.add('btn-dark')
        document.getElementById('navbar-username').classList.remove('btn-secondary')

    }, [])

    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    const handleTambahAdmin = async (event) => {
        event.preventDefault();
        document.getElementById("tambah-admin-loading").classList.remove('d-none')
        const data = new FormData(event.currentTarget);
        if (data.get('input-username') == "" || data.get('input-password') == "") {
            console.log("blm kirim")
            document.getElementById("tambah-admin-loading").classList.add('d-none')
            document.getElementById("tambah-admin-danger").classList.remove('d-none')
            await sleep(1500)
            document.getElementById("tambah-admin-danger").classList.add('d-none')
        } else {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tambahAkun`,
                {
                    username: data.get('input-username'),
                    password: data.get('input-password'),
                    role: 1
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            )
                .then(async function (response) {
                    console.log("asdasd")
                    if (response.status == 200) {
                        document.getElementById("tambah-admin-loading").classList.add('d-none')
                        document.getElementById("tambah-admin-success").classList.remove('d-none')
                        await sleep(1500)
                        document.getElementById("tambah-admin-success").classList.add('d-none')
                        window.location.reload()
                    } else {
                        console.log("udah kirim")
                        document.getElementById("tambah-admin-loading").classList.add('d-none')
                        document.getElementById("tambah-admin-danger").classList.remove('d-none')
                        await sleep(1500)
                        document.getElementById("tambah-admin-danger").classList.add('d-none')
                    }
                })
                .catch(async function (error) {
                    console.log("error kirim")
                    document.getElementById("tambah-admin-loading").classList.add('d-none')
                    document.getElementById("tambah-admin-danger").classList.remove('d-none')
                    await sleep(1500)
                    document.getElementById("tambah-admin-danger").classList.add('d-none')
                });
        }
    }

    const handleTambahPengasuh = async (event) => {
        event.preventDefault();
        document.getElementById("tambah-pengasuh-loading").classList.remove('d-none')
        const data = new FormData(event.currentTarget);
        if (data.get('input-username') == "" || data.get('input-password') == "") {
            console.log("blm kirim")
            document.getElementById("tambah-pengasuh-loading").classList.add('d-none')
            document.getElementById("tambah-pengasuh-danger").classList.remove('d-none')
            await sleep(1500)
            document.getElementById("tambah-pengasuh-danger").classList.add('d-none')
        } else {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tambahAkun`,
                {
                    username: data.get('input-username'),
                    password: data.get('input-password'),
                    role: 3
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            )
                .then(async function (response) {
                    console.log("asdasd")
                    if (response.status == 200) {
                        document.getElementById("tambah-pengasuh-loading").classList.add('d-none')
                        document.getElementById("tambah-pengasuh-success").classList.remove('d-none')
                        await sleep(1500)
                        document.getElementById("tambah-pengasuh-success").classList.add('d-none')
                        window.location.reload()
                    } else {
                        console.log("udah kirim")
                        document.getElementById("tambah-pengasuh-loading").classList.add('d-none')
                        document.getElementById("tambah-pengasuh-danger").classList.remove('d-none')
                        await sleep(1500)
                        document.getElementById("tambah-pengasuh-danger").classList.add('d-none')
                    }
                })
                .catch(async function (error) {
                    console.log("error kirim")
                    document.getElementById("tambah-pengasuh-loading").classList.add('d-none')
                    document.getElementById("tambah-pengasuh-danger").classList.remove('d-none')
                    await sleep(1500)
                    document.getElementById("tambah-pengasuh-danger").classList.add('d-none')
                });
        }
    }

    const handleTambahKadet = async (event) => {
        event.preventDefault();
        document.getElementById("tambah-kadet-loading").classList.remove('d-none')
        const data = new FormData(event.currentTarget);
        const fotoUrl = foto.url
        if (data.get('input-username') == "" || data.get('input-password') == "" || data.get('input-nama') == "" || data.get('input-nim') == "" || data.get('input-pangkat') == "" || data.get('input-jk') == "" || data.get('input-pleton') == "") {
            console.log("blm kirim")
            document.getElementById("tambah-kadet-loading").classList.add('d-none')
            document.getElementById("tambah-kadet-danger").classList.remove('d-none')
            await sleep(1500)
            document.getElementById("tambah-kadet-danger").classList.add('d-none')
        } else {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tambahKadet`,
                {
                    username: data.get('input-username'),
                    password: data.get('input-password'),
                    role: 2,
                    nama: data.get('input-nama'),
                    nim: data.get('input-nim'),
                    pangkat: data.get('input-pangkat'),
                    jk: data.get('input-jk'),
                    pleton: data.get('input-pleton'),
                    fotoUrl: fotoUrl,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            )
                .then(async function (response) {
                    console.log("asdasd")
                    if (response.status == 200) {
                        document.getElementById("tambah-kadet-loading").classList.add('d-none')
                        document.getElementById("tambah-kadet-success").classList.remove('d-none')
                        await sleep(1500)
                        document.getElementById("tambah-kadet-success").classList.add('d-none')
                        window.location.reload()
                    } else {
                        console.log("udah kirim")
                        document.getElementById("tambah-kadet-loading").classList.add('d-none')
                        document.getElementById("tambah-kadet-danger").classList.remove('d-none')
                        await sleep(1500)
                        document.getElementById("tambah-kadet-danger").classList.add('d-none')
                    }
                })
                .catch(async function (error) {
                    console.log("error kirim")
                    document.getElementById("tambah-kadet-loading").classList.add('d-none')
                    document.getElementById("tambah-kadet-danger").classList.remove('d-none')
                    await sleep(1500)
                    document.getElementById("tambah-kadet-danger").classList.add('d-none')
                });
        }
    }


    const changeFind = () => {
        var find = document.getElementById('findAccount').value.toLowerCase();
        console.log(find)
        var stringRecent = ""
        for (let index = 0; index < accounts.length; index++) {
            if (accounts[index].username.toLowerCase().includes(find)) {
                stringRecent +=
                    `<tr>
                            <th class='p-1'>${accounts[index].akun_id}</th>
                            <td class='p-1'>${accounts[index].username}</td>
                            <td class='p-2'><span class='w-100 p-1 px-2 px-lg-4 rounded-3 ${role_color[accounts[index].role_target]}'>${accounts[index].role_target}</span></td>
                            <td class='p-1'></td>
                    </tr>`
            }

        }
        document.getElementById('accounts').innerHTML = stringRecent

    }

    const handleChangeFoto = (e) => {
        let selectedFile = e.target.files[0]
        console.log(selectedFile.size)
        if (selectedFile) {
            if (selectedFile) {
                let reader = new FileReader()
                reader.readAsDataURL(selectedFile)
                reader.onload = (e) => {
                    setFoto({
                        url: e.target.result,
                        file: selectedFile
                    })
                }
            }
            else {
                setFoto(null)
            }
        }
        else {
            console.log("Select File")
        }
    }

    const handleTambahKadetBulk = async (event) => {
        event.preventDefault();
        document.getElementById("tambah-kadetBulk-loading").classList.remove('d-none')
        for (let index = 0; index < excel.length; index++) {
            console.log(excel[index])
            if (excel[index].username == null || excel[index].password == null || excel[index].nama == null || excel[index].nim == null || excel[index].pangkat_id == null || excel[index].pleton_id == null) {
                document.getElementById('tambah-kadetBulk-status').innerHTML += `<span class='text-danger'>${excel[index].nama}&nbsp;<i class="bi bi-x-circle-fill"></i></span><br/>`
            } else {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tambahKadet`,
                    {
                        username: excel[index].username,
                        password: excel[index].password,
                        role: 2,
                        nama: excel[index].nama,
                        nim: excel[index].nim,
                        pangkat: excel[index].pangkat_id,
                        jk: excel[index].jk,
                        pleton: excel[index].pleton_id,
                        fotoUrl: foto.url
                    },
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                        }
                    }
                )
                    .then(async function (response) {
                        if (response.status == 200) {
                            document.getElementById('tambah-kadetBulk-status').innerHTML += `<span class='text-success'>${excel[index].nama}&nbsp;<i class="bi bi-check-circle-fill"></i></span><br/>`
                        } else {
                            document.getElementById('tambah-kadetBulk-status').innerHTML += `<span class='text-danger'>${excel[index].nama}&nbsp;<i class="bi bi-x-circle-fill"></i></span><br/>`
                        }
                    })
                    .catch(async function (error) {
                        document.getElementById('tambah-kadetBulk-status').innerHTML += `<span class='text-danger'>${excel[index].nama}&nbsp;<i class="bi bi-x-circle-fill"></i></span><br/>`
                    });

            }

        }
        document.getElementById("tambah-kadetBulk-loading").classList.add('d-none')
        window.location.reload();
    }

    const handleChangeExcel = (e) => {
        document.getElementById('excel-danger').classList.add('d-none')
        document.getElementById('bulk-insert-list').innerHTML = ''
        let selectedFile = e.target.files[0]
        if (selectedFile) {
            try {
                let reader = new FileReader()
                reader.readAsArrayBuffer(selectedFile)
                reader.onload = (e) => {
                    const workbook = XLSX.read(e.target.result, { type: 'buffer' })
                    const worksheetName = workbook.SheetNames[0]
                    const worksheet = workbook.Sheets[worksheetName]
                    const data = XLSX.utils.sheet_to_json(worksheet)
                    if (data[0].username && data[0].password && data[0].nama && data[0].nim && data[0].jk && data[0].pangkat_id && data[0].pleton_id) {
                        for (let index = 0; index < data.length; index++) {
                            for (let indexPangkat = 0; indexPangkat < atribut.pangkat.length; indexPangkat++) {
                                if (atribut.pangkat[indexPangkat].pangkat_id == data[index].pangkat_id) {
                                    var pangkat = indexPangkat
                                    break;
                                }

                            }
                            for (let indexPleton = 0; indexPleton < atribut.pleton.length; indexPleton++) {
                                if (atribut.pleton[indexPleton].pleton_id == data[index].pleton_id) {
                                    var pleton = indexPleton
                                    break;
                                }

                            }
                            document.getElementById('bulk-insert-list').innerHTML +=
                                `<tr>
                                <td>${data[index].username}</td>
                                <td>${data[index].password}</td>
                                <td>${data[index].nama}</td>
                                <td>${data[index].nim}</td>
                                <td>${data[index].jk}</td>
                                <td>${atribut.pangkat[pangkat].pangkat_nama}</td>
                                <td>${atribut.pleton[pleton].pleton_nama + ' ' + atribut.pleton[pleton].kompi_nama + ' ' + atribut.pleton[pleton].batalyon_nama}</td>
                            </tr>`

                        }
                        document.getElementById('bulk-insert-list').innerHTML += `<tr class='border-bottom'></tr>`
                        setExcel(data)
                        document.getElementById('submit-bulk').classList.remove('disabled')
                    } else {
                        setExcel(null)
                        document.getElementById('excel-danger').classList.remove('d-none')
                        document.getElementById('submit-bulk').classList.add('disabled')
                    }

                }
            } catch (error) {
                console.error(error)
                setExcel(null)
                document.getElementById('excel-danger').classList.remove('d-none')
                document.getElementById('submit-bulk').classList.add('disabled')
            }
        }
        else {
            setExcel(null)
            console.log("Select File")
        }
    }

    const handleChangePangkat = () => {
        const pangkat_id = document.getElementById('input-pangkat-bulk').value
        document.getElementById('pangkat_id').innerHTML = pangkat_id
    }

    const handleChangePleton = () => {
        const pleton_id = document.getElementById('input-pleton-bulk').value
        document.getElementById('pleton_id').innerHTML = pleton_id
    }

    return (
        <div className='bg-dark bg-gradient' style={{ minHeight: "100vh" }}>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='w-100'>
                    <div className='fs-1 fw-medium text-light font-poppins p-1 pt-md-3 ps-3'>
                        <span>Kelola Akun</span>
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
                                <h4 className='card-header d-flex border-bottom'>Tambah Akun
                                    <i class="fs-2 ms-auto bi bi-person-fill-add"></i>
                                </h4>
                                <div className='card-body p-2'>
                                    <table className='table-dark w-100 text-center'>
                                        <tbody>
                                            <tr>
                                                <td className='p-1 p-lg-2 col-4'>
                                                    <button className='btn btn-info w-100' data-bs-toggle="modal" data-bs-target="#staticBackdropAdmin">Admin</button>
                                                </td>
                                                <td className='p-1 p-lg-2 col-4'>
                                                    <button className='btn btn-primary w-100' data-bs-toggle="modal" data-bs-target="#staticBackdropKadet">Kadet</button>
                                                </td>
                                                <td className='p-1 p-lg-2 col-4'>
                                                    <button className='btn btn-secondary w-100' data-bs-toggle="modal" data-bs-target="#staticBackdropPengasuh">Pengasuh</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 d-flex flex-wrap'>
                            <div className='card rounded-4 bg-dark shadow-lg w-100 text-light'>
                                <h4 className='card-header d-flex border-bottom'>Akun Aktif
                                    <div className='ms-auto'>
                                        <span>{accounts.length}</span>&nbsp;
                                        <i class="fs-2 bi bi-people-fill"></i>
                                    </div>
                                </h4>
                                <div className='card-body row align-item-center px-4'>
                                    <div class="input-group p-0 pb-3">
                                        <span class="input-group-text bg-dark text-white">Cari akun</span>
                                        <input type="text" onChange={() => { changeFind() }} id='findAccount' class="form-control bg-putihdikit" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
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
            <div class="modal fade" id="staticBackdropKadet" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content bg-dark text-white">
                        <form onSubmit={handleTambahKadet}>
                            <div class="modal-header" data-bs-theme="dark">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Tambah Akun Kadet</h1>
                                <button type="reset" onClick={() => { setFoto({ url: defaultAttributes.foto }) }} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body px-lg-4">
                                <div className='py-1'>
                                    <h5>Akun</h5>
                                    <div className='row'>
                                        <div class="mb-2 col-12 col-lg-6">
                                            <label for="exampleFormControlInput1" class="form-label">Username<span className="text-danger">*</span></label>
                                            <input type="text" class="form-control" id="input-username" name='input-username' placeholder="username" />
                                            <small>(min 6 char)</small>
                                        </div>
                                        <div class="mb-2 col-12 col-lg-6">
                                            <label for="exampleFormControlInput1" class="form-label">Password<span className="text-danger">*</span></label>
                                            <input type="password" class="form-control" id="input-password" name='input-password' placeholder="password" />
                                            <small>(min 8 char, must include Uppercase & Number/Symbol)</small>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-1'>
                                    <h5>Data Diri</h5>
                                    <div className='row'>
                                        <div className='col-12 col-lg-4'>
                                            <div className='p-1 px-5 p-lg-3'>
                                                <img src={foto.url} className="rounded-4 w-100" />
                                            </div>
                                            <div class="mb-2">
                                                <label for="exampleFormControlInput1" class="form-label">Pilih Foto</label>
                                                <input onChange={handleChangeFoto} type="file" accept="image/*" id="foto" name='foto' class="form-control" />
                                            </div>
                                        </div>
                                        <div className='col-12 col-lg-8'>
                                            <div class="mb-2">
                                                <label for="exampleFormControlInput1" class="form-label">Nama Lengkap<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="input-nama" name='input-nama' placeholder="nama lengkap" />
                                            </div>
                                            <div class="mb-2">
                                                <label for="exampleFormControlInput1" class="form-label">NIM<span className="text-danger">*</span></label>
                                                <input type="number" class="form-control" id="input-nim" name='input-nim' placeholder="nim" />
                                            </div>
                                            <div class="mb-2">
                                                <label for="exampleFormControlInput1" class="form-label">Jenis Kelamin<span className="text-danger">*</span></label>
                                                <select class="form-select" aria-label="Default select example" id="input-jk" name='input-jk'>
                                                    <option value='L'>Laki-laki</option>
                                                    <option value='P'>Perempuan</option>
                                                </select>
                                            </div>
                                            <div class="mb-2">
                                                <label for="exampleFormControlInput1" class="form-label">Pangkat<span className="text-danger">*</span></label>
                                                <select class="form-select" aria-label="Default select example" id="input-pangkat" name='input-pangkat'></select>
                                            </div>
                                            <div class="mb-2">
                                                <label for="exampleFormControlInput1" class="form-label">Pleton<span className="text-danger">*</span></label>
                                                <select class="form-select" aria-label="Default select example" id="input-pleton" name='input-pleton'></select>
                                            </div>
                                            <div className='text-center d-none' id='tambah-kadet-loading'>
                                                <div class="spinner-border" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                            <div class="alert p-2 bg-danger d-none" id='tambah-kadet-danger' role="alert">
                                                <strong>Gagal menyimpan!</strong>
                                                <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                            </div>
                                            <div class="alert p-2 bg-success d-none" id='tambah-kadet-success' role="alert">
                                                <strong>Berhasil menyimpan!</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type='reset' className='btn btn-secondary me-auto' data-bs-toggle="modal" data-bs-target="#staticBackdropKadetBulk">Bulk Insert</button>
                                <button type="reset" onClick={() => { setFoto({ url: defaultAttributes.foto }) }} class="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                                <button type="submit" class="btn btn-primary px-4">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal fade bg-dark" id="staticBackdropKadetBulk" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen">
                    <div class="modal-content bg-dark text-white">
                        <form onSubmit={handleTambahKadetBulk}>
                            <div class="modal-header" data-bs-theme="dark">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Bulk Insert Kadet</h1>
                                <button type="reset" onClick={() => {
                                    setExcel(null)
                                    document.getElementById('bulk-insert-list').innerHTML = ''
                                    document.getElementById('excel-danger').classList.add('d-none')
                                    document.getElementById('submit-bulk').classList.add('disabled')
                                    document.getElementById('tambah-kadetBulk-status').innerHTML = ''
                                }} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body px-lg-4">
                                <div class='mb-2 border rounded-3 p-3'>
                                    <h5>Panduan Bulk Insert</h5>
                                    <div className='row'>
                                        <div className='col-12 col-lg-4'>
                                            <span><i class="bi bi-1-circle-fill"></i>&nbsp;&nbsp;Buat File Excel (.csv/.xls/.xlsx)</span><br />
                                            <span><i class="bi bi-2-circle-fill"></i>&nbsp;&nbsp;Tempatkan data yang ingin dimasukkan ke sheet pertama</span><br />
                                            <span><i class="bi bi-3-circle-fill"></i>&nbsp;&nbsp;Buat table dengan row 1 sebagai table header</span>
                                        </div>
                                        <div className='col-12 col-lg-8'>
                                            <span><i class="bi bi-4-circle-fill"></i>&nbsp;&nbsp;Pangkat dan Pleton dituliskan id nya</span><br />
                                            <table className='table'>
                                                <tr>
                                                    <td>pangkat_id</td>
                                                    <td id='pangkat_id'></td>
                                                    <td><select onChange={handleChangePangkat} class="form-select p-1" aria-label="Default select example" id="input-pangkat-bulk" name='input-pangkat-bulk'></select></td>
                                                </tr>
                                                <tr>
                                                    <td>pleton_id</td>
                                                    <td id='pleton_id'></td>
                                                    <td><select onChange={handleChangePleton} class="form-select p-1" aria-label="Default select example" id="input-pleton-bulk" name='input-pleton-bulk'></select></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className='col-12 my-2'>
                                            <span><i class="bi bi-5-circle-fill"></i>&nbsp;&nbsp;Contoh data excel yang dimasukkan</span><br />
                                            <div className='table-responsive'>
                                                <table className='border w-100 table'>
                                                    <tr>
                                                        <td className='border text-center'></td>
                                                        <td className='border text-center bg-secondary'>A</td>
                                                        <td className='border text-center bg-secondary'>B</td>
                                                        <td className='border text-center bg-secondary'>C</td>
                                                        <td className='border text-center bg-secondary'>D</td>
                                                        <td className='border text-center bg-secondary'>E</td>
                                                        <td className='border text-center bg-secondary'>F</td>
                                                        <td className='border text-center bg-secondary'>G</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border text-center bg-secondary'>1</td>
                                                        <td className='border'>username</td>
                                                        <td className='border'>password</td>
                                                        <td className='border'>nama</td>
                                                        <td className='border'>nim</td>
                                                        <td className='border'>jk</td>
                                                        <td className='border'>pangkat_id</td>
                                                        <td className='border'>pleton_id</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border text-center bg-secondary'>2</td>
                                                        <td className='border'>garyferdinand</td>
                                                        <td className='border'>Menkorps2024.</td>
                                                        <td className='border'>Gary Ferdinand Wahyudi</td>
                                                        <td className='border'>320200401008</td>
                                                        <td className='border'>L</td>
                                                        <td className='border'>5</td>
                                                        <td className='border'>40</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="mb-2">
                                    <label for="exampleFormControlInput1" class="form-label">Pilih File Excel</label>
                                    <input onChange={handleChangeExcel} type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id="foto" name='foto' class="form-control" />
                                </div>
                                <div>
                                    <span>Bulk Insert List</span>
                                    <div className='table-responsive'>
                                        <table className='w-100 table table-dark'>
                                            <thead>
                                                <tr className='border-bottom'>
                                                    <th>Username</th>
                                                    <th>Password</th>
                                                    <th>Nama</th>
                                                    <th>NIM</th>
                                                    <th>L/P</th>
                                                    <th>Pangkat</th>
                                                    <th>Pleton</th>
                                                </tr>
                                            </thead>
                                            <tbody id='bulk-insert-list'>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="alert p-2 bg-danger d-none" id='excel-danger' role="alert">
                                    <strong>File Tidak Sesuai!</strong>
                                    <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                </div>
                                <div className='text-center d-none' id='tambah-kadetBulk-loading'>
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div class="alert p-2 bg-danger d-none" id='tambah-kadetBulk-danger' role="alert">
                                    <strong>Gagal menyimpan!</strong>
                                    <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                </div>
                                <div className='pt-3' id='tambah-kadetBulk-status'>
                                </div>
                                <div class="alert p-2 bg-success d-none" id='tambah-kadetBulk-success' role="alert">
                                    <strong>Berhasil menyimpan!</strong>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type='reset' onClick={() => {
                                    setExcel(null)
                                    document.getElementById('bulk-insert-list').innerHTML = ''
                                    document.getElementById('excel-danger').classList.add('d-none')
                                    document.getElementById('submit-bulk').classList.add('disabled')
                                    document.getElementById('tambah-kadetBulk-status').innerHTML = ''
                                }} className='btn btn-secondary me-auto' data-bs-toggle="modal" data-bs-target="#staticBackdropKadet">Each Insert</button>
                                <button type="reset" onClick={() => {
                                    setExcel(null)
                                    document.getElementById('bulk-insert-list').innerHTML = ''
                                    document.getElementById('excel-danger').classList.add('d-none')
                                    document.getElementById('submit-bulk').classList.add('disabled')
                                    document.getElementById('tambah-kadetBulk-status').innerHTML = ''
                                }} class="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                                <button type="submit" id='submit-bulk' class="btn btn-primary px-4 disabled">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="staticBackdropAdmin" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content bg-dark text-white">
                        <form onSubmit={handleTambahAdmin}>
                            <div class="modal-header" data-bs-theme="dark">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Tambah Akun Admin</h1>
                                <button type="reset" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body px-lg-4">
                                <div className='py-1'>
                                    <h5>Akun</h5>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label">Username<span className="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="input-username" name='input-username' placeholder="username" />
                                        <small>(min 6 char)</small>
                                    </div>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label">Password<span className="text-danger">*</span></label>
                                        <input type="password" class="form-control" id="input-password" name='input-password' placeholder="password" />
                                        <small>(min 8 char, must include Uppercase & Number/Symbol)</small>
                                    </div>
                                    <div className='text-center d-none' id='tambah-admin-loading'>
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    <div class="alert p-2 bg-danger d-none" id='tambah-admin-danger' role="alert">
                                        <strong>Gagal menyimpan!</strong>
                                        <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                    </div>
                                    <div class="alert p-2 bg-success d-none" id='tambah-admin-success' role="alert">
                                        <strong>Berhasil menyimpan!</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="reset" class="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                                <button type="submit" class="btn btn-primary px-4">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="staticBackdropPengasuh" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content bg-dark text-white">
                        <form onSubmit={handleTambahPengasuh}>
                            <div class="modal-header" data-bs-theme="dark">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Tambah Akun Pengasuh</h1>
                                <button type="reset" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body px-lg-4">
                                <div className='py-1'>
                                    <h5>Akun</h5>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label">Username<span className="text-danger">*</span></label>
                                        <input type="text" class="form-control" id="input-username" name='input-username' placeholder="username" />
                                        <small>(min 6 char)</small>
                                    </div>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label">Password<span className="text-danger">*</span></label>
                                        <input type="password" class="form-control" id="input-password" name='input-password' placeholder="password" />
                                        <small>(min 8 char, must include Uppercase & Number/Symbol)</small>
                                    </div>
                                    <div className='text-center d-none' id='tambah-pengasuh-loading'>
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    <div class="alert p-2 bg-danger d-none" id='tambah-pengasuh-danger' role="alert">
                                        <strong>Gagal menyimpan!</strong>
                                        <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                    </div>
                                    <div class="alert p-2 bg-success d-none" id='tambah-pengasuh-success' role="alert">
                                        <strong>Berhasil menyimpan!</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="reset" class="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                                <button type="submit" class="btn btn-primary px-4">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}