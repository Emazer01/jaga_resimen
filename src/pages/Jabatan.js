import * as React from 'react';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import { verifikasi } from '../function/Verifikasi';
import { Heading, Pagination, TimeInterval } from '../component/Minor';
import { getAttribut, getJabatans, getKadets } from '../function/Get';
import { ModalFormAssignMenkorps, ModalFormTambahJabatan, ModalStrukturMenkorps } from '../component/Modal';

export const Jabatan = () => {
    document.title = 'Kelola Jabatan - Pusat Informasi Resimen Korps Kadet'

    const [atribut, setAtribut] = React.useState({
        pangkat: {}, pleton: {}
    })

    const [kadets, setKadets] = React.useState([])

    const [jabatans, setJabatans] = React.useState([])
    const [jabatansSelect, setJabatansSelect] = React.useState([])

    const [currentJabatan, setCurrentJabatan] = React.useState({})

    const [currentPage, setCurrentPage] = React.useState(1)
    const [postPerPage, setPostPerPage] = React.useState(10)

    const [satuan, setSatuan] = React.useState({
        batalyon: [],
        kompi: [],
        pleton: [],
        resimen: []
    })

    React.useEffect(() => {
        verifikasi().then(x => {
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
            setJabatansSelect(x)
            console.log(x[0])
        })
        getKadets().then(x => {
            setKadets(x)
        })

        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-jabatan').classList.add('sidebar-active')

        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-jabatan').classList.add('sidebar-active')
    }, [])

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = jabatansSelect.slice(indexOfFirstPost, indexOfLastPost)

    const changePage = (number) => {
        if (number >= 1 && number <= Math.ceil(jabatansSelect.length / postPerPage)) {
            setCurrentPage(number)
        }
    }

    const changeFind = () => {
        var find = document.getElementById('findJabatan').value.toLowerCase();
        var select = []
        for (let index = 0; index < jabatans.length; index++) {
            if (jabatans[index].jabatan_nama.toLowerCase().includes(find)) {
                select.push(jabatans[index])
            }
        }
        setJabatansSelect(select)
        setCurrentPage(1)
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: '#f0f0f0' }}>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='w-100'>
                    <Heading query={'Kelola Jabatan'} />
                    <div className='d-flex flex-wrap p-2 font-nunito'>
                        <TimeInterval lgCol='6' />
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 d-flex flex-wrap' id='actionAdmin'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Action
                                    <i className="fs-2 ms-auto bi bi-diagram-3-fill"></i>
                                </h4>
                                <div className='card-body p-2'>
                                    <table className='table-dark w-100 text-center'>
                                        <tbody>
                                            <tr>
                                                <td className='p-1 p-lg-2 col-6'>
                                                    <button className='btn btn-secondary w-100' data-bs-toggle="modal" data-bs-target="#staticBackdropMenkorps">Tambah Jabatan</button>
                                                </td>
                                                <td className='p-1 p-lg-2 col-6'>
                                                    <button className='btn btn-secondary w-100'>Struktur</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Menkorps
                                    <i className="fs-2 bi bi-diagram-3-fill ms-auto"></i>
                                </h4>
                                <div className='card-body row align-item-center px-4 table-responsive'>
                                    <div className="input-group p-0 pb-3">
                                        <span className="input-group-text">Cari jabatan</span>
                                        <input type="text" id='findJabatan' onChange={changeFind} className="form-control bg-putihdikit" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    </div>
                                    <div className='table-responsive'>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr className='border-bottom'>
                                                    <th>Jabatan</th>
                                                    <th className='d-none d-md-table-cell'>Jenis</th>
                                                    <th className='d-none d-md-table-cell'>Tingkat</th>
                                                    <th className='d-none d-md-table-cell'>Status</th>
                                                    <th>Pejabat</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentPosts.map(jabatan => {
                                                    return (
                                                        <tr key={jabatan.jabatan_nama}>
                                                            <td>{jabatan.jabatan_nama}</td>
                                                            <td className='d-none d-md-table-cell'>{jabatan.jenis}</td>
                                                            <td className='d-none d-md-table-cell'>{jabatan.tingkat}</td>
                                                            <td className='d-none d-md-table-cell'>{jabatan.status}</td>
                                                            <td>{jabatan.pangkat} {jabatan.kadet_nama}</td>
                                                            <td className='p-0'>
                                                                <button onClick={() => { setCurrentJabatan(jabatan) }} className='btn btn-secondary m-1' data-bs-toggle="modal" data-bs-target="#staticBackdropAssignMenkorps">Assign</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination postPerPage={postPerPage} totalPost={jabatansSelect.length} currentPage={currentPage} changePage={changePage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalFormTambahJabatan satuan={satuan} />
            <ModalFormAssignMenkorps kadets={kadets} jabatan={currentJabatan} />
        </div>
    )
}