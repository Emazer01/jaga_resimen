import * as React from 'react';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import { verifikasi } from '../function/Verifikasi';
import { heading2, TimeInterval } from '../component/Minor';
import { getAttribut, getDds, getJabatans, getKadets } from '../function/Get';
import { handleAssignJabatan } from '../function/Put';
import { modalFormAssignMenkorps, modalFormTambahDD, modalFormTambahJabatan, ModalStrukturMenkorps } from '../component/Modal';

export const Jabatan = () => {
    document.title = 'Kelola Jabatan - Pusat Informasi Resimen Korps Kadet'

    const [atribut, setAtribut] = React.useState({
        pangkat: {}, pleton: {}
    })

    const [kadets, setKadets] = React.useState({})

    const [jabatans, setJabatans] = React.useState({})

    const [dds, setDds] = React.useState({})

    const [satuan, setSatuan] = React.useState({
        batalyon: [],
        kompi: [],
        pleton: [],
        resimen: []
    })

    React.useEffect(() => {
        verifikasi().then(x => {
            console.log(x.role)
            if (x.role != 'Admin') {
                window.location.href = '/forbidden'
            }
        })
        getAttribut().then(x => {
            setAtribut(x)
            if (x) {
                var batalyon = []
                var batalyonData = []
                var kompi = []
                var kompiData = []
                var pleton = []
                var pletonData = []
                for (let index = 0; index < x.pleton.length; index++) {
                    if (batalyon.includes(x.pleton[index].batalyon_id)) {
                    } else {
                        batalyon.push(x.pleton[index].batalyon_id)
                        batalyonData.push({
                            batalyon_id: x.pleton[index].batalyon_id,
                            batalyon_nama: x.pleton[index].batalyon_nama
                        })
                    }
                    if (kompi.includes(x.pleton[index].kompi_id)) {
                    } else {
                        kompi.push(x.pleton[index].kompi_id)
                        kompiData.push({
                            kompi_id: x.pleton[index].kompi_id,
                            kompi_nama: `${x.pleton[index].kompi_nama} ${x.pleton[index].batalyon_nama}`
                        })
                    }
                    if (pleton.includes(x.pleton[index].pleton_id)) {
                    } else {
                        pleton.push(x.pleton[index].pleton_id)
                        pletonData.push({
                            pleton_id: x.pleton[index].pleton_id,
                            pleton_nama: `${x.pleton[index].pleton_nama} ${x.pleton[index].kompi_nama} ${x.pleton[index].batalyon_nama}`
                        })
                    }
                }
                setSatuan({
                    batalyon: batalyonData,
                    kompi: kompiData,
                    pleton: pletonData,
                    resimen: [{ resimen_id: 1, resimen_nama: 'Resimen Korps Kadet Mahasiswa S1 Unhan RI' }]
                })
            }
        })
        getJabatans().then(x => {
            setJabatans(x)
            if (x) {
                var stringJabatans = ``
                var listJabatans = ``
                var currentkomando = 'resimen'
                var currentstaf = 'resimen'
                var currentlemuskad = 'resimen'
                var currentpolkad = 'resimen'
                var komando = `<div class='d-flex flex-wrap p-1 border border-danger rounded-1 border-2 justify-content-center'>`
                var staf = `<div class='d-flex flex-wrap p-1 border border-primary rounded-1 border-2 justify-content-center'>`
                var lemuskad = `<div class='d-flex flex-wrap p-1 border border-black rounded-1 border-2 justify-content-center'>`
                var polkad = `<div class='d-flex flex-wrap p-1 border border-white rounded-1 border-2 justify-content-center'>`
                for (let index = 0; index < x.length; index++) {
                    if (x[index].tingkat == 'resimen') {
                        listJabatans += `<option value=${x[index].jabatan_id}>${x[index].jabatan_nama}</option>`
                    }
                    if (x[index].jenis == 'Komando') {
                        if (x[index].tingkat == currentkomando) {
                            komando += `<div class='col-6 col-lg-3 p-1 p-lg-3'>
                                                    <h6>${x[index].jabatan_nama}</h6>
                                                    <img style="max-height:250px;max-width:70%" class='rounded-2' src=${x[index].foto} /><br/>
                                                    <a href='/personil/kadet?nim=${x[index].kadet_nim}' class='btn btn-dark'>${x[index].pangkat} ${x[index].kadet_nama}</a>
                                                </div>`
                        } else {
                            currentkomando = x[index].tingkat
                            komando += `</div><div class='d-flex flex-wrap p-1 border border-danger rounded-1 border-2 justify-content-center'>
                                                <div class='col-6 col-lg-3 p-1 p-lg-3'>
                                                    <h6>${x[index].jabatan_nama}</h6>
                                                    <img style="max-height:250px;max-width:70%" class='rounded-2' src=${x[index].foto} /><br/>
                                                    <a href='/personil/kadet?nim=${x[index].kadet_nim}' class='btn btn-dark'>${x[index].pangkat} ${x[index].kadet_nama}</a>
                                                </div>`
                        }
                    } else if (x[index].jenis == 'Staf') {
                        if (x[index].tingkat == currentstaf) {
                            staf += `<div class='col-6 col-lg-3 p-3'>
                                                    <h6>${x[index].jabatan_nama}</h6>
                                                    <img height='200' class='rounded-2' src=${x[index].foto} /><br/>
                                                    <a href='/personil/kadet?nim=${x[index].kadet_nim}' class='btn btn-dark'>${x[index].pangkat} ${x[index].kadet_nama}</a>
                                                </div>`
                        } else {
                            currentstaf = x[index].tingkat
                            staf += `</div><div class='d-flex flex-wrap p-1 border border-primary rounded-1 border-2'>
                                                <div class='col-6 col-lg-3 p-3'>
                                                    <h6>${x[index].jabatan_nama}</h6>
                                                    <img height='200' class='rounded-2' src=${x[index].foto} /><br/>
                                                    <a href='/personil/kadet?nim=${x[index].kadet_nim}' class='btn btn-dark'>${x[index].pangkat} ${x[index].kadet_nama}</a>
                                                </div>`
                        }
                    } else if (x[index].jenis == 'Perwakilan') {
                        if (x[index].tingkat == currentlemuskad) {
                            lemuskad += `<div class='col-6 col-lg-3 p-3'>
                                                    <h6>${x[index].jabatan_nama}</h6>
                                                    <img height='200' class='rounded-2' src=${x[index].foto} /><br/>
                                                    <a href='/personil/kadet?nim=${x[index].kadet_nim}' class='btn btn-dark'>${x[index].pangkat} ${x[index].kadet_nama}</a>
                                                </div>`
                        } else {
                            currentlemuskad = x[index].tingkat
                            lemuskad += `</div><div class='d-flex flex-wrap p-1 border border-black rounded-1 border-2'>
                                                <div class='col-6 col-lg-3 p-3'>
                                                    <h6>${x[index].jabatan_nama}</h6>
                                                    <img height='200' class='rounded-2' src=${x[index].foto} /><br/>
                                                    <a href='/personil/kadet?nim=${x[index].kadet_nim}' class='btn btn-dark'>${x[index].pangkat} ${x[index].kadet_nama}</a>
                                                </div>`
                        }
                    } else if (x[index].jenis == 'Penegak Disiplin') {
                        if (x[index].tingkat == currentpolkad) {
                            polkad += `<div class='col-6 col-lg-3 p-3'>
                                                    <h6>${x[index].jabatan_nama}</h6>
                                                    <img height='200' class='rounded-2' src=${x[index].foto} /><br/>
                                                    <a href='/personil/kadet?nim=${x[index].kadet_nim}' class='btn btn-dark'>${x[index].pangkat} ${x[index].kadet_nama}</a>
                                                </div>`
                        } else {
                            currentpolkad = x[index].tingkat
                            polkad += `</div><div class='d-flex flex-wrap p-1 border border-white rounded-1 border-2'>
                                                <div class='col-6 col-lg-3 p-3'>
                                                    <h6>${x[index].jabatan_nama}</h6>
                                                    <img height='200' class='rounded-2' src=${x[index].foto} /><br/>
                                                    <a href='/personil/kadet?nim=${x[index].kadet_nim}' class='btn btn-dark'>${x[index].pangkat} ${x[index].kadet_nama}</a>
                                                </div>`
                        }
                    }

                    if (x[index].kadet_nama == null) {
                        x[index].kadet_nama = ""
                        stringJabatans += `<tr>
                                                        <td class='p-0' name='jabatan_nama'><a href='/jabatan/menkorps?tingkat=${x[index].tingkat}?id=${x[index].jabatan_id}' class='btn btn-dark rounded-0 text-start w-100'>${x[index].jabatan_nama}</a></td>
                                                        <td class='p-0'></td>
                                                    </tr>`
                    } else {
                        stringJabatans += `<tr>
                                                        <td class='p-0' name='jabatan_nama'><a href='/jabatan/menkorps?tingkat=${x[index].tingkat}?id=${x[index].jabatan_id}' class='btn btn-dark rounded-0 text-start w-100'>${x[index].jabatan_nama}</a></td>
                                                        <td class='p-0'><a href='/personil/kadet?nim=${x[index].kadet_nim}' class='btn btn-dark rounded-0 text-start w-100'>${x[index].pangkat} ${x[index].kadet_nama}</a></td>
                                                    </tr>`
                    }
                }
                komando += `</div>`
                staf += `</div>`
                lemuskad += `</div>`
                polkad += `</div>`
                document.getElementById('struktur-menkorps-komando').innerHTML = komando
                document.getElementById('struktur-menkorps-staf').innerHTML = staf
                document.getElementById('struktur-menkorps-lemuskad').innerHTML = lemuskad
                document.getElementById('struktur-menkorps-polkad').innerHTML = polkad
                document.getElementById('input-assign-jabatan').innerHTML = listJabatans
                document.getElementById('jabatans').innerHTML = stringJabatans
            } else {
                document.getElementById('jabatans').innerHTML = 'Tidak ada data'
            }
        })
        getDds().then(x => {
            setDds(x)
            if (x) {
                var stringDds = ""
                for (let index = 0; index < x.length; index++) {
                    if (x[index].kadet_nama == null) {
                        x[index].kadet_nama = ""
                        stringDds += `<tr>
                                                    <td name='dd-nama'>${x[index].dd_nama}</td>
                                                    <td class='p-0'></td>
                                                </tr>`
                    } else {
                        stringDds += `<tr>
                                                        <td name='dd-nama'>${x[index].dd_nama}</td>
                                                        <td class='p-0'><a href='/personil/kadet?nim=${x[index].kadet_nim}' class='btn btn-dark rounded-0 text-start'>${x[index].pangkat} ${x[index].kadet_nama}</a></td>
                                                    </tr>`
                    }
                }
                document.getElementById('dds').innerHTML = stringDds
            } else {
                document.getElementById('dds').innerHTML = 'Tidak ada data'
            }
        })
        getKadets().then(x => {
            setKadets(x)
            if (x) {
                var stringKadets = ``
                for (let index = 0; index < x.length; index++) {
                    if (x[index].jabatan_resimen_nama == null && x[index].jabatan_batalyon_nama == null && x[index].jabatan_kompi_nama == null && x[index].jabatan_pleton_nama == null) {
                        stringKadets += `<option value=${x[index].kadet_id}>${x[index].pangkat_singkat} ${x[index].kadet_nama}</option>`
                    }

                }
                document.getElementById('input-assign-pejabat').innerHTML = stringKadets
            } else {
                document.getElementById('input-assign-pejabat').innerHTML = 'Tidak ada data'
            }
        })

        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-jabatan').classList.add('sidebar-active')
        document.getElementById('btn-kelolaAkun').classList.remove('sidebar-active')
        document.getElementById('btn-personil').classList.remove('sidebar-active')
        document.getElementById('sidebar-username').classList.add('btn-dark')
        document.getElementById('sidebar-username').classList.remove('btn-secondary')

        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-jabatan').classList.add('sidebar-active')
        document.getElementById('nav-btn-kelolaAkun').classList.remove('sidebar-active')
        document.getElementById('nav-btn-personil').classList.remove('sidebar-active')
        document.getElementById('navbar-username').classList.add('btn-dark')
        document.getElementById('navbar-username').classList.remove('btn-secondary')

    }, [])

    return (
        <div className='bg-dark bg-gradient' style={{ minHeight: "100vh" }}>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='w-100'>
                    {heading2("Kelola Jabatan")}
                    <div className='p-2 p-md-3 font-nunito'>
                        <div className='d-flex flex-wrap'>
                            <TimeInterval />
                            <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 rounded-3 d-flex flex-wrap' id='actionAdmin'>
                                <div className='card rounded-4 bg-dark shadow-lg text-light w-100 col-12'>
                                    <h4 className='card-header d-flex border-bottom'>Action Admin
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
                                                        <button className='btn btn-secondary w-100' data-bs-toggle="modal" data-bs-target="#staticBackdropDD">Dinas Dalam</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 rounded-3 d-flex flex-wrap' id='actionAll'>
                                <div className='card rounded-4 bg-dark shadow-lg text-light w-100 col-12'>
                                    <h4 className='card-header d-flex border-bottom'>Struktur
                                        <i class="fs-2 ms-auto bi bi-diagram-3-fill"></i>
                                    </h4>
                                    <div className='card-body p-2'>
                                        <table className='table-dark w-100 text-center'>
                                            <tbody>
                                                <tr>
                                                    <td className='p-1 p-lg-2 col-6'>
                                                        <button className='btn btn-secondary w-100' data-bs-toggle="modal" data-bs-target="#staticBackdropStrukturMenkorps">Menkorps</button>
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
                                <div className='card rounded-4 bg-dark shadow-lg w-100 text-light' style={{ maxHeight: 400 }}>
                                    <h4 className='card-header d-flex border-bottom'>Menkorps
                                        <i class="fs-2 bi bi-diagram-3-fill ms-auto"></i>
                                    </h4>
                                    <div className='card-body row align-item-center px-4 table-responsive'>
                                        <div class="input-group p-0 pb-3">
                                            <span class="input-group-text bg-dark text-white">Cari jabatan</span>
                                            <input type="text" id='findJabatan' class="form-control bg-putihdikit" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
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
                                <div className='card rounded-4 bg-dark shadow-lg w-100 text-light' style={{ maxHeight: 400 }}>
                                    <h4 className='card-header d-flex border-bottom'>Dinas Dalam
                                        <i class="fs-2 bi bi-bank2 ms-auto"></i>
                                    </h4>
                                    <div className='card-body row align-item-center px-4 table-responsive'>
                                        <div class="input-group p-0 pb-3">
                                            <span class="input-group-text bg-dark text-white">Cari dinas dalam</span>
                                            <input type="text" id='findAccount' class="form-control bg-putihdikit" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                        </div>
                                        <table class="table table-dark">
                                            <thead>
                                                <tr className='border-bottom'>
                                                    <th scope="col">Dinas Dalam</th>
                                                    <th scope="col">Pejabat</th>
                                                </tr>
                                            </thead>
                                            <tbody id='dds'>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {modalFormTambahJabatan(satuan)}
            {modalFormTambahDD(satuan)}
            {modalFormAssignMenkorps(jabatans,kadets)}
            <ModalStrukturMenkorps />
        </div>
    )
}