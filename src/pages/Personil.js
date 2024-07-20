import * as React from 'react';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import { verifikasi } from '../function/Verifikasi';
import { Heading, Pagination, TimeInterval } from '../component/Minor';
import { getKadets } from '../function/Get';

export const Personil = () => {
    document.title = 'Personil - Pusat Informasi Resimen Korps Kadet'

    const keterangan_color = {
        'Hadir': '#0b0bbb',
        'Sakit': '#0bbb0b',
        'Izin': '#bbbb0b',
        'Tanpa Keterangan': '#bb0b0b'
    }

    const [kadets, setKadets] = React.useState([])
    const [kadetsSelect, setKadetsSelect] = React.useState([])

    const [currentPage, setCurrentPage] = React.useState(1)
    const [postPerPage, setPostPerPage] = React.useState(10)

    React.useEffect(() => {
        verifikasi()
        getKadets().then(x => {
            setKadets(x)
            setKadetsSelect(x)
            console.log(x[0])
        })
        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-personil').classList.add('sidebar-active')
    
        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-personil').classList.add('sidebar-active')

    }, [])

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = kadetsSelect.slice(indexOfFirstPost, indexOfLastPost)

    const changePage = (number) => {
        if (number >= 1 && number <= Math.ceil(kadetsSelect.length / postPerPage)) {
            setCurrentPage(number)
        }
    }

    const changeFind = () => {
        var find = document.getElementById('findKadet').value.toLowerCase();
        var select = []
        for (let index = 0; index < kadets.length; index++) {
            var pleton = `${kadets[index].pleton_nama} ${kadets[index].kompi_nama} ${kadets[index].batalyon_nama}`
            if (kadets[index].kadet_nama.toLowerCase().includes(find) || pleton.toLowerCase().includes(find)) {
                select.push(kadets[index])
            }
        }
        setKadetsSelect(select)
        setCurrentPage(1)
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor:'#f0f0f0' }}>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='w-100'>
                    <Heading query={'Personil'} />
                    <div className='p-2 d-flex flex-wrap font-nunito'>
                        <TimeInterval lgCol='6' />
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 d-flex flex-wrap'>
                            <div className='card shadow w-100 col-12'>
                                <h4 className='card-header d-flex border-bottom'>...
                                    <i className="fs-2 ms-auto bi bi-person-fill-add"></i>
                                </h4>
                                <div className='card-body p-2'>

                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Kadet Mahasiswa Aktif
                                    <div className='ms-auto'>
                                        <span>{kadetsSelect.length}</span>&nbsp;
                                        <i className="fs-2 bi bi-people-fill"></i>
                                    </div>

                                </h4>
                                <div className='card-body row align-item-center px-4 table-responsive'>
                                    <div className="input-group p-0 pb-3">
                                        <span className="input-group-text">Cari nama</span>
                                        <input type="text" onChange={changeFind} id='findKadet' className="form-control bg-putihdikit" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    </div>
                                    <div className='table-responsive'>
                                        <table className='table table-clickable table-striped'>
                                            <thead>
                                                <tr>
                                                    <th className='d-none d-md-table-cell'>NIM</th>
                                                    <th>Nama</th>
                                                    <th>L/P</th>
                                                    <th className='d-none d-md-table-cell'>Angkatan</th>
                                                    <th className='d-none d-md-table-cell'>Pleton</th>
                                                    <th>Keterangan</th>
                                                    <th className='d-none d-md-table-cell'>Jabatan</th>
                                                    <th className='d-none d-md-table-cell'>Dinas</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentPosts.map(kadet => {
                                                    return (
                                                        <tr key={kadet.kadet_id}>
                                                            <td className='p-0 d-none d-md-table-cell'><a href={`/personil/kadet?nim=${kadet.kadet_nim}`} className='p-2 text-decoration-none text-dark'>{kadet.kadet_nim}</a></td>
                                                            <td className='p-0'><a href={`/personil/kadet?nim=${kadet.kadet_nim}`} className='p-2 text-decoration-none text-dark'>{kadet.pangkat_singkat} {kadet.kadet_nama}</a></td>
                                                            <td className='p-0'><a href={`/personil/kadet?nim=${kadet.kadet_nim}`} className='p-2 text-decoration-none text-dark'>{kadet.jenis_kelamin}</a></td>
                                                            <td className='p-0 d-none d-md-table-cell'><a href={`/personil/kadet?nim=${kadet.kadet_nim}`} className='p-2 text-decoration-none text-dark'>{kadet.angkatan}</a></td>
                                                            <td className='p-0 d-none d-md-table-cell'><a href={`/personil/kadet?nim=${kadet.kadet_nim}`} className='p-2 text-decoration-none text-dark'>{kadet.pleton_nama} {kadet.kompi_nama} {kadet.batalyon_nama}</a></td>
                                                            <td className='p-0'><a href={`/personil/kadet?nim=${kadet.kadet_nim}`} className='p-2 text-decoration-none text-light'><div className='rounded-2 px-2' style={{ backgroundColor: keterangan_color[kadet.keterangan_nama] }}>{kadet.keterangan_nama}</div></a></td>
                                                            <td className='p-0 d-none d-md-table-cell'><a href={`/personil/kadet?nim=${kadet.kadet_nim}`} className='p-2 text-decoration-none text-dark'>{kadet.jabatan_pleton_nama} {kadet.jabatan_kompi_nama} {kadet.jabatan_batalyon_nama} {kadet.jabatan_resimen_nama}</a></td>
                                                            <td className='p-0 d-none d-md-table-cell'><a href={`/personil/kadet?nim=${kadet.kadet_nim}`} className='p-2 text-decoration-none text-dark'>{kadet.dd_pleton_nama} {kadet.dd_kompi_nama} {kadet.dd_batalyon_nama} {kadet.dd_resimen_nama}</a></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination postPerPage={postPerPage} totalPost={kadetsSelect.length} currentPage={currentPage} changePage={changePage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}