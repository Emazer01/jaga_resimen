import * as React from 'react';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import { verifikasi } from '../function/Verifikasi';
import { Heading, Pagination, TimeInterval } from '../component/Minor';
import { getAttribut, getDds, getJabatans, getKadets } from '../function/Get';
import { ModalFormAssignDinas, ModalFormAssignMenkorps, ModalFormEditJabatan, ModalFormTambahDD, ModalFormTambahJabatan, ModalStrukturMenkorps } from '../component/Modal';

export const Dinas = () => {
    document.title = 'Kelola Dinas - Pusat Informasi Resimen Korps Kadet'

    const [atribut, setAtribut] = React.useState({
        pangkat: {}, pleton: {}
    })

    const [kadets, setKadets] = React.useState([])

    const [dds, setDds] = React.useState([])
    const [ddsSelect, setDdsSelect] = React.useState([])

    const [currentDds, setCurrentDds] = React.useState({})

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
        getDds().then(x => {
            setDds(x)
            setDdsSelect(x)
            console.log(x[0])
        })
        getKadets().then(x => {
            setKadets(x)
        })

        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-dinas').classList.add('sidebar-active')
        
        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-dinas').classList.add('sidebar-active')
    }, [])

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = ddsSelect.slice(indexOfFirstPost, indexOfLastPost)

    const changePage = (number) => {
        if (number >= 1 && number <= Math.ceil(ddsSelect.length / postPerPage)) {
            setCurrentPage(number)
        }
    }

    const changeFind = () => {
        var find = document.getElementById('findJabatan').value.toLowerCase();
        console.log(find)
        var select = []
        for (let index = 0; index < dds.length; index++) {
            if (dds[index].dd_nama.toLowerCase().includes(find)) {
                select.push(dds[index])
            }
        }
        setDdsSelect(select)
        setCurrentPage(1)
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: '#f0f0f0' }}>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='w-100'>
                    <Heading query={'Kelola Dinas'} />
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
                                                    <button className='btn btn-secondary w-100' data-bs-toggle="modal" data-bs-target="#staticBackdropDD">Tambah Dinas Dalam</button>
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
                                <h4 className='card-header d-flex border-bottom'>Dinas Dalam
                                    <i className="fs-2 bi bi-diagram-3-fill ms-auto"></i>
                                </h4>
                                <div className='card-body row align-item-center px-4 table-responsive'>
                                    <div className="input-group p-0 pb-3">
                                        <span className="input-group-text">Cari dinas</span>
                                        <input type="text" id='findJabatan' onChange={changeFind} className="form-control bg-putihdikit" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    </div>
                                    <div className='table-responsive'>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr className='border-bottom'>
                                                    <th>Dinas Dalam</th>
                                                    <th>Jenis</th>
                                                    <th>Tingkat</th>
                                                    <th>Status</th>
                                                    <th>Pejabat</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentPosts.map(dinas => {
                                                    return(
                                                        <tr key={dinas.dd_nama}>
                                                            <td>{dinas.dd_nama}</td>
                                                            <td>{dinas.jenis}</td>
                                                            <td>{dinas.tingkat}</td>
                                                            <td>{dinas.status}</td>
                                                            <td>{dinas.pangkat} {dinas.kadet_nama}</td>
                                                            <td className='p-0'>
                                                                <button onClick={() => { setCurrentDds(dinas) }} className='btn btn-secondary m-1' data-bs-toggle="modal" data-bs-target="#staticBackdropAssignDinas">Assign</button>
                                                                <button className='btn btn-danger m-1'>Nonaktifkan</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination postPerPage={postPerPage} totalPost={ddsSelect.length} currentPage={currentPage} changePage={changePage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalFormTambahDD satuan={satuan} />
            <ModalFormAssignDinas kadets={kadets} dinas={currentDds}/>
        </div>
    )
}