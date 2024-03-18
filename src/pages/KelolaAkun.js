import * as React from 'react';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';
import { verifikasi } from '../function/Verifikasi';
import { Heading, Pagination, TimeInterval } from '../component/Minor';
import { getAccounts, getAttribut } from '../function/Get';
import { ModalFormTambahAdmin, ModalFormTambahKadet, ModalFormTambahKadetBulk, ModalFormTambahPengasuh } from '../component/Modal';

export const KelolaAkun = () => {
    document.title = 'Kelola Akun - Pusat Informasi Resimen Korps Kadet'

    const role_color = {
        'admin': 'bg-info',
        'kadet': 'bg-primary',
        'pengasuh': 'bg-secondary'
    }

    const [accounts, setAccounts] = React.useState([])
    const [accountsSelect, setAccountsSelect] = React.useState([])

    const [currentPage, setCurrentPage] = React.useState(1)
    const [postPerPage, setPostPerPage] = React.useState(10)

    const [pleton, setPleton] = React.useState([])
    const [pangkat, setPangkat] = React.useState([])

    React.useEffect(() => {
        verifikasi().then(x => {
            if (x.role != 'Admin') {
                window.location.href = '/forbidden'
            }
        })
        getAccounts().then(x => {
            setAccounts(x)
            setAccountsSelect(x)
            console.log(x[0])
        })
        getAttribut().then(x => {
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

        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-kelolaAkun').classList.add('sidebar-active')

        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-kelolaAkun').classList.add('sidebar-active')
    }, [])

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = accountsSelect.slice(indexOfFirstPost, indexOfLastPost)

    const changePage = (number) => {
        if (number >= 1 && number <= Math.ceil(accountsSelect.length / postPerPage)) {
            setCurrentPage(number)
        }
    }

    const changeFind = () => {
        var find = document.getElementById('findAccount').value.toLowerCase();
        var select = []
        for (let index = 0; index < accounts.length; index++) {
            if (accounts[index].username.toLowerCase().includes(find)) {
                select.push(accounts[index])
            }
        }
        setAccountsSelect(select)
        setCurrentPage(1)
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: '#f0f0f0' }}>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='w-100'>
                    <Heading query={'Kelola Akun'} />
                    <div className='p-2 d-flex flex-wrap font-nunito'>
                        <TimeInterval lgCol='6' />
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 d-flex flex-wrap'>
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Tambah Akun
                                    <i className="fs-2 ms-auto bi bi-person-fill-add"></i>
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
                            <div className='card shadow w-100'>
                                <h4 className='card-header d-flex border-bottom'>Akun Kadet
                                    <div className='ms-auto'>
                                        <i className="fs-2 bi bi-people-fill"></i>
                                    </div>
                                </h4>
                                <div className='card-body row align-item-center py-0 pt-3 px-4'>
                                    <div className="input-group p-0 pb-3">
                                        <span className="input-group-text">Cari akun</span>
                                        <input type="text" onChange={() => { changeFind() }} id='findAccount' className="form-control bg-putihdikit" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    </div>
                                    <div className='table-responsive'>
                                        <table className="table table-striped w-100">
                                            <thead>
                                                <tr className='border-bottom'>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Username</th>
                                                    <th scope="col">Nama</th>
                                                    <th scope="col">Role</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentPosts.map(akun => {
                                                    return (
                                                        <tr key={akun.akun_id}>
                                                            <td>{akun.akun_id}</td>
                                                            <td>{akun.username}</td>
                                                            <td>{akun.kadet_nama}</td>
                                                            <td>{akun.role_target}</td>
                                                            <td>{akun.status_nama}</td>
                                                            <td className='p-0'>
                                                                <button className='btn btn-danger m-1'>Nonaktifkan</button>
                                                                <button className='btn btn-info m-1'>Reset Password</button>
                                                            </td>
                                                        </tr>
                                                    )

                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination postPerPage={postPerPage} totalPost={accountsSelect.length} currentPage={currentPage} changePage={changePage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalFormTambahKadet pleton={pleton} pangkat={pangkat} />
            <ModalFormTambahKadetBulk pleton={pleton} pangkat={pangkat} />
            <ModalFormTambahAdmin />
            <ModalFormTambahPengasuh />
        </div>
    )
}