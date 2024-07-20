import * as React from 'react';
import { handleEditApel, handleForwardApel, handleLapApel, handleLapGiat, handleTambahAdmin, handleTambahDD, handleTambahJabatan, handleTambahKadet, handleTambahKadetBulk, handleTambahPengasuh } from "../function/Post"
import { handleApproveGiat, handleAssignDinas, handleAssignJabatan, handleChangePassword, handleEditKadet } from "../function/Put"
import { StrukturMenkorps } from "./Minor"
import { handleChangeExcel, handleChangeFoto } from '../function/Change';
import { verifikasi } from '../function/Verifikasi';
import { getLapApel, getLapApel2 } from '../function/Get';

const ModalFormTambahJabatan = ({ satuan }) => {
    const [currentTingkat, setCurrentTingkat] = React.useState('resimen')

    const [currentSatuan, setCurrentSatuan] = React.useState([{
        resimen_id: 1,
        resimen_nama: "Resimen Korps Kadet Mahasiswa S1 Unhan RI"
    }])

    const changeTingkat = () => {
        var tingkat = document.getElementById('input-tingkat-jabatan').value
        setCurrentSatuan(satuan[tingkat])
        setCurrentTingkat(tingkat)
    }
    return (
        <div className="modal fade" id="staticBackdropMenkorps" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleTambahJabatan}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Tambah Jabatan Menkorps</h1>
                            <button type='reset' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-lg-4">
                            <div className='py-1'>
                                <div className="mb-2 row">
                                    <div className='col-12 col-lg-6 mb-2'>
                                        <label className="form-label">Jenis<span className="text-danger">*</span></label>
                                        <select className="form-select" required aria-label="Default select example" id="input-jenis-jabatan" name='input-jenis-jabatan'>
                                            <option value="1">Komando</option>
                                            <option value="2">Staf</option>
                                            <option value="3">Perwakilan</option>
                                            <option value="4">Penegak Disiplin</option>
                                        </select>
                                    </div>
                                    <div className='col-12 col-lg-6 mb-2'>
                                        <label className="form-label">Tingkat<span className="text-danger">*</span></label>
                                        <select className="form-select" required onChange={changeTingkat} aria-label="Default select example" id="input-tingkat-jabatan" name='input-tingkat-jabatan'>
                                            <option value="resimen">Resimen</option>
                                            <option value="batalyon">Batalyon</option>
                                            <option value="kompi">Kompi</option>
                                            <option value="pleton">Pleton</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Yurisdiksi<span className="text-danger">*</span></label>
                                    <select className="form-select" required aria-label="Default select example" id="input-yurisdiksi-jabatan" name='input-yurisdiksi-jabatan'>
                                        {currentSatuan.map(satuan => {
                                            return (
                                                <option key={satuan[`${currentTingkat}_id`]} value={satuan[`${currentTingkat}_id`]}>{satuan[`${currentTingkat}_nama`]}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Nama Jabatan<span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" required id="input-nama-jabatan" name='input-nama-jabatan' placeholder="nama jabatan" />
                                </div>
                                <div className='text-center d-none' id='tambah-jabatan-loading'>
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div className="alert p-2 bg-danger d-none" id='tambah-jabatan-danger' role="alert">
                                    <strong>Gagal menyimpan!</strong>
                                    <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                </div>
                                <div className="alert p-2 bg-success d-none" id='tambah-jabatan-success' role="alert">
                                    <strong>Berhasil menyimpan!</strong>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type='reset' className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-primary px-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ModalFormTambahDD = ({ satuan }) => {
    const [currentTingkat, setCurrentTingkat] = React.useState('resimen')

    const [currentSatuan, setCurrentSatuan] = React.useState([{
        resimen_id: 1,
        resimen_nama: "Resimen Korps Kadet Mahasiswa S1 Unhan RI"
    }])
    const changeTingkatDD = () => {
        var tingkat = document.getElementById('input-tingkat-dd').value
        setCurrentSatuan(satuan[tingkat])
        setCurrentTingkat(tingkat)
    }
    return (
        <div className="modal fade" id="staticBackdropDD" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleTambahDD}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Tambah Dinas Dalam</h1>
                            <button type='reset' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-lg-4">
                            <div className='py-1'>
                                <div className="mb-2 row">
                                    <div className='col-12 col-lg-6 mb-2'>
                                        <label className="form-label">Jenis<span className="text-danger">*</span></label>
                                        <select className="form-select" required aria-label="Default select example" id="input-jenis-dd" name='input-jenis-dd'>
                                            <option value="1">Komando</option>
                                            <option value="2">Staf</option>
                                            <option value="3">Perwakilan</option>
                                            <option value="4">Penegak Disiplin</option>
                                        </select>
                                    </div>
                                    <div className='col-12 col-lg-6 mb-2'>
                                        <label className="form-label">Tingkat<span className="text-danger">*</span></label>
                                        <select className="form-select" required onChange={changeTingkatDD} aria-label="Default select example" id="input-tingkat-dd" name='input-tingkat-dd'>
                                            <option value="resimen">Resimen</option>
                                            <option value="batalyon">Batalyon</option>
                                            <option value="kompi">Kompi</option>
                                            <option value="pleton">Pleton</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-2 row">
                                    <div className='col-12 col-lg-8 mb-2'>
                                        <label className="form-label">Yurisdiksi<span className="text-danger">*</span></label>
                                        <select className="form-select" required aria-label="Default select example" id="input-yurisdiksi-dd" name='input-yurisdiksi-dd'>
                                            {currentSatuan.map(satuan => {
                                                return (
                                                    <option key={satuan[`${currentTingkat}_id`]} value={satuan[`${currentTingkat}_id`]}>{satuan[`${currentTingkat}_nama`]}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className='col-12 col-lg-4 mb-2'>
                                        <label className="form-label">Jenis Kelamin<span className="text-danger">*</span></label>
                                        <select className="form-select" aria-label="Default select example" id="input-jk-dd" name='input-jk-dd'>
                                            <option value='L'>Laki-laki</option>
                                            <option value='P'>Perempuan</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Nama Dinas Dalam<span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" required id="input-nama-dd" name='input-nama-dd' placeholder="nama dinas dalam" />
                                </div>
                                <div className='text-center d-none' id='tambah-dd-loading'>
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div className="alert p-2 bg-danger d-none" id='tambah-dd-danger' role="alert">
                                    <strong>Gagal menyimpan!</strong>
                                    <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                </div>
                                <div className="alert p-2 bg-success d-none text-white" id='tambah-dd-success' role="alert">
                                    <strong>Berhasil menyimpan!</strong>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type='reset' className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-primary px-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ModalStrukturMenkorps = () => {
    return (
        <div className="modal fade" id="staticBackdropStrukturMenkorps" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Struktur Menkorps</h1>
                        <div className='ms-2'>
                            <a href='#struktur-menkorps-komando' className='p-1 px-2 me-2 btn btn-danger'>Komando</a>
                            <a href='#struktur-menkorps-staf' className='p-1 px-2 me-2 btn btn-primary'>Staf</a>
                            <a href='#struktur-menkorps-lemuskad' className='p-1 px-2 me-2 btn btn-dark border-black bg-black'>Lemuskad</a>
                            <a href='#struktur-menkorps-polkad' className='p-1 px-2 me-2 btn btn-light border'>Polkad</a>
                        </div>
                        <button type='button' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body px-lg-4">
                        <StrukturMenkorps />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ModalFormAssignMenkorps = ({ kadets, jabatan }) => {
    const [kadetsSelect, setKadetsSelect] = React.useState([])

    React.useEffect(() => {
        setKadetsSelect(kadets)
    }, [kadets])

    const changeFind = (kadets) => {
        var find = document.getElementById('search-nama').value.toLowerCase();
        var stringRecent = []
        for (let index = 0; index < kadets.length; index++) {
            if (kadets[index].kadet_nama.toLowerCase().includes(find) && kadets[index].jabatan_resimen_nama == null && kadets[index].jabatan_batalyon_nama == null && kadets[index].jabatan_kompi_nama == null && kadets[index].jabatan_pleton_nama == null) {
                stringRecent.push(kadets[index])
            }
        }
        setKadetsSelect(stringRecent)
    }

    return (
        <div className="modal fade" id="staticBackdropAssignMenkorps" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleAssignJabatan}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Assign Jabatan Menkorps</h1>
                            <button type='reset' onClick={() => { setKadetsSelect(kadets) }} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-lg-4">
                            <div className='py-1'>
                                <div className="mb-2 row">
                                    <div className='col-12 col-lg-6 mb-2'>
                                        <label className="form-label">Tingkat<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" disabled required id="input-assign-tingkat" name='input-assign-tingkat' value={jabatan.tingkat} />
                                    </div>
                                    <div className='col-12 col-lg-6 mb-2'>
                                        <label className="form-label">Jabatan<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control d-none" disabled required id="input-assign-jabatan" name='input-assign-jabatan' value={jabatan.jabatan_id} />
                                        <input type="text" className="form-control" disabled required value={jabatan.jabatan_nama} />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Pejabat<span className="text-danger">*</span></label>
                                    <div className="input-group pb-2">
                                        <span className="input-group-text">Cari nama</span>
                                        <input type="text" onChange={() => { changeFind(kadets) }} id='search-nama' className="form-control bg-putihdikit" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    </div>
                                    <select className="form-select" required aria-label="Default select example" id="input-assign-pejabat" name='input-assign-pejabat'>
                                        {kadetsSelect.map(kadet => {
                                            return (
                                                <option key={kadet.kadet_id} value={kadet.kadet_id}>{kadet.pangkat_singkat} {kadet.kadet_nama}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className='text-center d-none' id='assign-jabatan-loading'>
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div className="alert p-2 bg-danger d-none text-light" id='assign-jabatan-danger' role="alert">
                                    <strong>Gagal menyimpan!</strong>
                                    <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                </div>
                                <div className="alert p-2 bg-success d-none text-light" id='assign-jabatan-success' role="alert">
                                    <strong>Berhasil menyimpan!</strong>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type='reset' onClick={() => { setKadetsSelect(kadets) }} className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-primary px-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ModalFormAssignDinas = ({ kadets, dinas }) => {
    const [kadetsSelect, setKadetsSelect] = React.useState([])

    React.useEffect(() => {
        setKadetsSelect(kadets)
    }, [kadets])

    const changeFind = (kadets) => {
        var find = document.getElementById('search-nama').value.toLowerCase();
        var stringRecent = []
        for (let index = 0; index < kadets.length; index++) {
            /*if (kadets[index].kadet_nama.toLowerCase().includes(find) && kadets[index].jabatan_resimen_nama == null && kadets[index].jabatan_batalyon_nama == null && kadets[index].jabatan_kompi_nama == null && kadets[index].jabatan_pleton_nama == null) {
                stringRecent.push(kadets[index])
            }*/
            if (kadets[index].kadet_nama.toLowerCase().includes(find)) {
                stringRecent.push(kadets[index])
            }
        }
        setKadetsSelect(stringRecent)
    }

    return (
        <div className="modal fade" id="staticBackdropAssignDinas" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleAssignDinas}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Assign Dinas Dalam</h1>
                            <button type='reset' onClick={() => { setKadetsSelect(kadets) }} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-lg-4">
                            <div className='py-1'>
                                <div className="mb-2 row">
                                    <div className='col-12 col-lg-6 mb-2'>
                                        <label className="form-label">Tingkat<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" disabled required id="input-assign-tingkat" name='input-assign-tingkat' value={dinas.tingkat} />
                                    </div>
                                    <div className='col-12 col-lg-6 mb-2'>
                                        <label className="form-label">Jabatan<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control d-none" disabled required id="input-assign-jabatan" name='input-assign-jabatan' value={dinas.dd_id} />
                                        <input type="text" className="form-control" disabled required value={dinas.dd_nama} />
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Pejabat<span className="text-danger">*</span></label>
                                    <div className="input-group pb-2">
                                        <span className="input-group-text">Cari nama</span>
                                        <input type="text" onChange={() => { changeFind(kadets) }} id='search-nama' className="form-control bg-putihdikit" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    </div>
                                    <select className="form-select" required aria-label="Default select example" id="input-assign-pejabat" name='input-assign-pejabat'>
                                        {kadetsSelect.map(kadet => {
                                            return (
                                                <option key={kadet.kadet_id} value={kadet.kadet_id}>{kadet.pangkat_singkat} {kadet.kadet_nama}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className='text-center d-none' id='assign-jabatan-loading'>
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div className="alert p-2 bg-danger d-none text-light" id='assign-jabatan-danger' role="alert">
                                    <strong>Gagal menyimpan!</strong>
                                    <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                </div>
                                <div className="alert p-2 bg-success d-none text-light" id='assign-jabatan-success' role="alert">
                                    <strong>Berhasil menyimpan!</strong>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type='reset' onClick={() => { setKadetsSelect(kadets) }} className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-primary px-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ModalFormEditJabatan = ({ satuan }) => {
    const [currentTingkat, setCurrentTingkat] = React.useState('resimen')

    const [currentSatuan, setCurrentSatuan] = React.useState([{
        resimen_id: 1,
        resimen_nama: "Resimen Korps Kadet Mahasiswa S1 Unhan RI"
    }])

    const changeTingkat = () => {
        var tingkat = document.getElementById('input-tingkat-jabatan').value
        setCurrentSatuan(satuan[tingkat])
        setCurrentTingkat(tingkat)
    }
    return (
        <div className="modal fade" id="staticBackdropEditMenkorps" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={handleTambahJabatan}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Tambah Jabatan Menkorps</h1>
                            <button type='reset' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-lg-4">
                            <div className='py-1'>
                                <div className="mb-2 row">
                                    <div className='col-12 col-lg-6 mb-2'>
                                        <label className="form-label">Jenis<span className="text-danger">*</span></label>
                                        <select className="form-select" required aria-label="Default select example" id="input-jenis-jabatan" name='input-jenis-jabatan'>
                                            <option value="1">Komando</option>
                                            <option value="2">Staf</option>
                                            <option value="3">Perwakilan</option>
                                            <option value="4">Penegak Disiplin</option>
                                        </select>
                                    </div>
                                    <div className='col-12 col-lg-6 mb-2'>
                                        <label className="form-label">Tingkat<span className="text-danger">*</span></label>
                                        <select className="form-select" required onChange={changeTingkat} aria-label="Default select example" id="input-tingkat-jabatan" name='input-tingkat-jabatan'>
                                            <option value="resimen">Resimen</option>
                                            <option value="batalyon">Batalyon</option>
                                            <option value="kompi">Kompi</option>
                                            <option value="pleton">Pleton</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Yurisdiksi<span className="text-danger">*</span></label>
                                    <select className="form-select" required aria-label="Default select example" id="input-yurisdiksi-jabatan" name='input-yurisdiksi-jabatan'>
                                        {currentSatuan.map(satuan => {
                                            return (
                                                <option key={satuan[`${currentTingkat}_id`]} value={satuan[`${currentTingkat}_id`]}>{satuan[`${currentTingkat}_nama`]}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Nama Jabatan<span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" required id="input-nama-jabatan" name='input-nama-jabatan' placeholder="nama jabatan" />
                                </div>
                                <div className='text-center d-none' id='tambah-jabatan-loading'>
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div className="alert p-2 bg-danger d-none" id='tambah-jabatan-danger' role="alert">
                                    <strong>Gagal menyimpan!</strong>
                                    <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                </div>
                                <div className="alert p-2 bg-success d-none" id='tambah-jabatan-success' role="alert">
                                    <strong>Berhasil menyimpan!</strong>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type='reset' className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-primary px-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ModalFormTambahKadet = ({ pleton, pangkat }) => {
    const defaultAttributes = {
        foto: `data:image/jpeg;base64,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`
    }
    const [foto, setFoto] = React.useState({
        url: `data:image/jpeg;base64,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`
    })
    const changeFoto = async (e) => {
        let selectedFile = e.target.files[0]
        await handleChangeFoto(selectedFile).then(x => {
            setFoto(x)
        })
    }

    return (
        <div className="modal fade" id="staticBackdropKadet" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={(e) => { handleTambahKadet(e, foto) }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Tambah Akun Kadet</h1>
                            <button type="reset" onClick={() => { setFoto({ url: defaultAttributes.foto }) }} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-lg-4">
                            <div className='py-1'>
                                <h5>Akun</h5>
                                <div className='row'>
                                    <div className="mb-2 col-12 col-lg-6">
                                        <label className="form-label">Username<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="input-username" name='input-username' placeholder="username" />
                                        <small>(min 6 char)</small>
                                    </div>
                                    <div className="mb-2 col-12 col-lg-6">
                                        <label className="form-label">Password<span className="text-danger">*</span></label>
                                        <input type="password" className="form-control" id="input-password" name='input-password' placeholder="password" />
                                        <small>(min 8 char, must include Uppercase & Number/Symbol)</small>
                                    </div>
                                </div>
                            </div>
                            <div className='py-1'>
                                <h5>Data Diri</h5>
                                <div className='row'>
                                    <div className='col-12 col-lg-4'>
                                        <div className='p-1 px-5 p-lg-3'>
                                            <img src={foto.url} className="rounded-2 w-100" />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Pilih Foto</label>
                                            <input onChange={changeFoto} type="file" accept="image/*" id="foto" name='foto' className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col-12 col-lg-8'>
                                        <div className="mb-2">
                                            <label className="form-label">Nama Lengkap<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="input-nama" name='input-nama' placeholder="nama lengkap" />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">NIM<span className="text-danger">*</span></label>
                                            <input type="number" className="form-control" id="input-nim" name='input-nim' placeholder="nim" />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Jenis Kelamin<span className="text-danger">*</span></label>
                                            <select className="form-select" aria-label="Default select example" id="input-jk" name='input-jk'>
                                                <option value='L'>Laki-laki</option>
                                                <option value='P'>Perempuan</option>
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Tahun Masuk<span className="text-danger">*</span></label>
                                            <input type='number' className="form-control" id="input-angkatan" name='input-angkatan' placeholder="tahun" />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Pangkat<span className="text-danger">*</span></label>
                                            <select className="form-select" aria-label="Default select example" id="input-pangkat" name='input-pangkat'>
                                                {pangkat.map(pangkat => {
                                                    return (
                                                        <option key={pangkat.pangkat_id} value={pangkat.pangkat_id}>{pangkat.pangkat_nama}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Pleton<span className="text-danger">*</span></label>
                                            <select className="form-select" aria-label="Default select example" id="input-pleton" name='input-pleton'>
                                                {pleton.map(pleton => {
                                                    return (
                                                        <option key={pleton.pleton_id} value={pleton.pleton_id}>{pleton.pleton_nama}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className='text-center d-none' id='tambah-kadet-loading'>
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        <div className="alert p-2 bg-danger d-none text-light" id='tambah-kadet-danger' role="alert">
                                            <strong>Gagal menyimpan!</strong>
                                            <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                        </div>
                                        <div className="alert p-2 bg-success d-none text-light" id='tambah-kadet-success' role="alert">
                                            <strong>Berhasil menyimpan!</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type='reset' className='btn btn-secondary me-auto' data-bs-toggle="modal" data-bs-target="#staticBackdropKadetBulk">Bulk Insert</button>
                            <button type="reset" onClick={() => { setFoto({ url: defaultAttributes.foto }) }} className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-primary px-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ModalFormTambahKadetBulk = ({ pleton, pangkat }) => {
    const [foto, setFoto] = React.useState({
        url: `data:image/jpeg;base64,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`
    })
    const [excel, setExcel] = React.useState([])

    const changeExcel = (e) => {
        console.log(pangkat, pleton)
        document.getElementById('excel-danger').classList.add('d-none')
        document.getElementById('bulk-insert-list').innerHTML = ''
        let selectedFile = e.target.files[0]
        handleChangeExcel(selectedFile).then(x => {
            console.log(x)
            if (x) {
                setExcel(x)
                document.getElementById('submit-bulk').classList.remove('disabled')
            } else {
                setExcel(null)
                document.getElementById('excel-danger').classList.remove('d-none')
                document.getElementById('submit-bulk').classList.add('disabled')
            }
        })
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
        <div className="modal fade bg-light" id="staticBackdropKadetBulk" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                    <form onSubmit={(e) => { handleTambahKadetBulk(e, foto, excel) }}>
                        <div className="modal-header sticky-top bg-light">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Bulk Insert Kadet</h1>
                            <button type="reset" onClick={() => {
                                setExcel(null)
                                document.getElementById('bulk-insert-list').innerHTML = ''
                                document.getElementById('excel-danger').classList.add('d-none')
                                document.getElementById('submit-bulk').classList.add('disabled')
                                document.getElementById('tambah-kadetBulk-status').innerHTML = ''
                            }} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-lg-4">
                            <div className='mb-2 border rounded-3 p-3'>
                                <h5>Panduan Bulk Insert</h5>
                                <div className='row'>
                                    <div className='col-12 col-lg-4'>
                                        <span><i className="bi bi-1-circle-fill"></i>&nbsp;&nbsp;Buat File Excel (.csv/.xls/.xlsx)</span><br />
                                        <span><i className="bi bi-2-circle-fill"></i>&nbsp;&nbsp;Tempatkan data yang ingin dimasukkan ke sheet pertama</span><br />
                                        <span><i className="bi bi-3-circle-fill"></i>&nbsp;&nbsp;Buat table dengan row 1 sebagai table header</span>
                                    </div>
                                    <div className='col-12 col-lg-8'>
                                        <span><i className="bi bi-4-circle-fill"></i>&nbsp;&nbsp;Pangkat dan Pleton dituliskan id nya</span><br />
                                        <table className='table'>
                                            <tr>
                                                <td>pangkat_id</td>
                                                <td id='pangkat_id'></td>
                                                <td>
                                                    <select onChange={handleChangePangkat} className="form-select p-1" aria-label="Default select example" id="input-pangkat-bulk" name='input-pangkat-bulk'>
                                                        {pangkat.map(pangkat => {
                                                            return (
                                                                <option key={pangkat.pangkat_id} value={pangkat.pangkat_id}>{pangkat.pangkat_nama}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>pleton_id</td>
                                                <td id='pleton_id'></td>
                                                <td>
                                                    <select onChange={handleChangePleton} className="form-select p-1" aria-label="Default select example" id="input-pleton-bulk" name='input-pleton-bulk'>
                                                        {pleton.map(pleton => {
                                                            return (
                                                                <option key={pleton.pleton_id} value={pleton.pleton_id}>{pleton.pleton_nama}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div className='col-12 my-2'>
                                        <span><i className="bi bi-5-circle-fill"></i>&nbsp;&nbsp;Contoh data excel yang dimasukkan</span><br />
                                        <div className='table-responsive'>
                                            <table className='border w-100 table'>
                                                <thead>
                                                    <tr>
                                                        <td className='border border-dark text-center'></td>
                                                        <td className='border border-dark text-center'>A</td>
                                                        <td className='border border-dark text-center'>B</td>
                                                        <td className='border border-dark text-center'>C</td>
                                                        <td className='border border-dark text-center'>D</td>
                                                        <td className='border border-dark text-center'>E</td>
                                                        <td className='border border-dark text-center'>F</td>
                                                        <td className='border border-dark text-center'>G</td>
                                                        <td className='border border-dark text-center'>H</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='border border-dark text-center'>1</td>
                                                        <td className='border border-dark fw-bold'>username</td>
                                                        <td className='border border-dark fw-bold'>password</td>
                                                        <td className='border border-dark fw-bold'>nama</td>
                                                        <td className='border border-dark fw-bold'>nim</td>
                                                        <td className='border border-dark fw-bold'>jk</td>
                                                        <td className='border border-dark fw-bold'>pangkat_id</td>
                                                        <td className='border border-dark fw-bold'>pleton_id</td>
                                                        <td className='border border-dark fw-bold'>angkatan</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border border-dark text-center'>2</td>
                                                        <td className='border border-dark'>garyferdinand</td>
                                                        <td className='border border-dark'>Menkorps2024.</td>
                                                        <td className='border border-dark'>Gary Ferdinand Wahyudi</td>
                                                        <td className='border border-dark'>320200401008</td>
                                                        <td className='border border-dark'>L</td>
                                                        <td className='border border-dark'>5</td>
                                                        <td className='border border-dark'>40</td>
                                                        <td className='border border-dark'>2020</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="mb-2">
                                <label className="form-label">Pilih File Excel</label>
                                <input onChange={changeExcel} type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" id="foto" name='foto' className="form-control" />
                            </div>
                            <div>
                                <span>Bulk Insert List</span>
                                <div className='table-responsive'>
                                    <table className='w-100 table table-striped'>
                                        <thead>
                                            <tr className='border-bottom'>
                                                <th>Username</th>
                                                <th>Password</th>
                                                <th>Nama</th>
                                                <th>NIM</th>
                                                <th>L/P</th>
                                                <th>Pangkat</th>
                                                <th>Pleton</th>
                                                <th>Angkatan</th>
                                            </tr>
                                        </thead>
                                        <tbody id='bulk-insert-list'>
                                            {excel.map(data => {
                                                return (
                                                    <tr>
                                                        <td>{data.username}</td>
                                                        <td>{data.password}</td>
                                                        <td>{data.nama}</td>
                                                        <td>{data.nim}</td>
                                                        <td>{data.jk}</td>
                                                        <td>
                                                            {pangkat.map(pangkat => {
                                                                if (pangkat.pangkat_id == data.pangkat_id) {
                                                                    return (
                                                                        <>{pangkat.pangkat_nama}</>
                                                                    )
                                                                }
                                                            })}
                                                        </td>
                                                        <td>
                                                            {pleton.map(pleton => {
                                                                if (pleton.pleton_id == data.pleton_id) {
                                                                    return (
                                                                        <>{pleton.pleton_nama}</>
                                                                    )
                                                                }
                                                            })}
                                                        </td>
                                                        <td>{data.angkatan}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="alert p-2 bg-danger d-none text-light" id='excel-danger' role="alert">
                                <strong>File Tidak Sesuai!</strong>
                                <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                            </div>
                            <div className='text-center d-none' id='tambah-kadetBulk-loading'>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div className="alert p-2 bg-danger d-none text-light" id='tambah-kadetBulk-danger' role="alert">
                                <strong>Gagal menyimpan!</strong>
                                <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                            </div>
                            <div className='pt-3' id='tambah-kadetBulk-status'>
                            </div>
                            <div className="alert p-2 bg-success d-none text-light" id='tambah-kadetBulk-success' role="alert">
                                <strong>Berhasil menyimpan!</strong>
                            </div>
                        </div>
                        <div className="modal-footer sticky-bottom bg-light">
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
                            }} className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" id='submit-bulk' className="btn btn-primary px-4 disabled">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ModalFormTambahAdmin = () => {
    return (
        <div className="modal fade" id="staticBackdropAdmin" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleTambahAdmin}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Tambah Akun Admin</h1>
                            <button type="reset" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-lg-4">
                            <div className='py-1'>
                                <h5>Akun</h5>
                                <div className="mb-2">
                                    <label className="form-label">Username<span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="input-username" name='input-username' placeholder="username" />
                                    <small>(min 6 char)</small>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Password<span className="text-danger">*</span></label>
                                    <input type="password" className="form-control" id="input-password" name='input-password' placeholder="password" />
                                    <small>(min 8 char, must include Uppercase & Number/Symbol)</small>
                                </div>
                                <div className='text-center d-none' id='tambah-admin-loading'>
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div className="alert p-2 bg-danger d-none text-white" id='tambah-admin-danger' role="alert">
                                    <strong>Gagal menyimpan!</strong>
                                    <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                </div>
                                <div className="alert p-2 bg-success d-none text-white" id='tambah-admin-success' role="alert">
                                    <strong>Berhasil menyimpan!</strong>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="reset" className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-primary px-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ModalFormTambahPengasuh = () => {
    return (
        <div className="modal fade" id="staticBackdropPengasuh" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleTambahPengasuh}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Tambah Akun Pengasuh</h1>
                            <button type="reset" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-lg-4">
                            <div className='py-1'>
                                <h5>Akun</h5>
                                <div className="mb-2">
                                    <label className="form-label">Username<span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" id="input-username" name='input-username' placeholder="username" />
                                    <small>(min 6 char)</small>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Password<span className="text-danger">*</span></label>
                                    <input type="password" className="form-control" id="input-password" name='input-password' placeholder="password" />
                                    <small>(min 8 char, must include Uppercase & Number/Symbol)</small>
                                </div>
                                <div className='text-center d-none' id='tambah-pengasuh-loading'>
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div className="alert p-2 bg-danger d-none text-white" id='tambah-pengasuh-danger' role="alert">
                                    <strong>Gagal menyimpan!</strong>
                                    <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                </div>
                                <div className="alert p-2 bg-success d-none text-white" id='tambah-pengasuh-success' role="alert">
                                    <strong>Berhasil menyimpan!</strong>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="reset" className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-primary px-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ModalFormPassword = () => {
    return (
        <div className="modal fade" id="staticBackdropPassword" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleChangePassword}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Change Password</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-lg-4">
                            <div className='py-1'>
                                <div className="mb-2">
                                    <label for="exampleFormControlInput1" className="form-label">Old Password<span className="text-danger">*</span></label>
                                    <input type="password" className="form-control" id="input-oldpassword" name='input-oldpassword' placeholder="old password" />
                                </div>
                                <div className="mb-2">
                                    <label for="exampleFormControlInput1" className="form-label">New Password<span className="text-danger">*</span></label>
                                    <input type="password" className="form-control" id="input-newpassword" name='input-newpassword' placeholder="new password" />
                                    <small>(min 8 char, must include Uppercase & Number/Symbol)</small>
                                </div>
                                <div className="mb-2">
                                    <label for="exampleFormControlInput1" className="form-label">Confirm New Password<span className="text-danger">*</span></label>
                                    <input type="password" className="form-control" id="input-confirmnewpassword" name='input-confirmnewpassword' placeholder="confirm new password" />
                                </div>
                                <div className='text-center d-none' id='change-password-loading'>
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div className="alert p-2 bg-danger d-none text-light" id='change-password-danger' role="alert">
                                    <strong>Gagal menyimpan!</strong>
                                    <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                </div>
                                <div className="alert p-2 bg-success d-none text-light" id='change-password-success' role="alert">
                                    <strong>Berhasil menyimpan!</strong>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-primary px-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ModalFormEditKadet = ({ kadet, pleton, pangkat, foto, setFoto }) => {

    React.useEffect(() => {
        document.getElementById('input-pangkat').value = kadet.pangkat_id
        document.getElementById(`input-pleton`).value = kadet.pleton_id
        document.getElementById('input-jk').value = kadet.jenis_kelamin
    }, [kadet])
    const changeFoto = async (e) => {
        let selectedFile = e.target.files[0]
        await handleChangeFoto(selectedFile).then(x => {
            setFoto(x)
        })
    }
    return (
        <div className="modal fade" id="staticBackdropKadet" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={(e) => { handleEditKadet(e, foto) }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Data Diri</h1>
                            <button type="button" onClick={() => {
                                setFoto({ url: kadet.foto_isi })
                                document.getElementById('input-pangkat').value = kadet.pangkat_id
                                document.getElementById('input-pleton').value = kadet.pleton_id
                                document.getElementById('input-jk').value = kadet.jenis_kelamin
                                document.getElementById('input-nama').value = document.getElementById('input-nama').defaultValue
                                document.getElementById('input-nim').value = document.getElementById('input-nim').defaultValue
                            }} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-lg-4">
                            <div className='py-1'>
                                <div className='row'>
                                    <div className='col-12 col-lg-4'>
                                        <div className='p-1 px-5 p-lg-3'>
                                            <img src={foto.url} className="rounded-4 w-100" />
                                        </div>
                                        <div className="mb-2">
                                            <label for="exampleFormControlInput1" className="form-label">Pilih Foto</label>
                                            <input onChange={changeFoto} type="file" accept="image/*" id="foto" name='foto' className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col-12 col-lg-8'>
                                        <div className="mb-2">
                                            <label for="exampleFormControlInput1" className="form-label">Nama Lengkap<span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="input-nama" name='input-nama' placeholder="nama lengkap" defaultValue={kadet.kadet_nama} />
                                        </div>
                                        <div className="mb-2">
                                            <label for="exampleFormControlInput1" className="form-label">NIM<span className="text-danger">*</span></label>
                                            <input type="number" className="form-control" id="input-nim" name='input-nim' placeholder="nim" defaultValue={kadet.kadet_nim} />
                                        </div>
                                        <div className="mb-2">
                                            <label for="exampleFormControlInput1" className="form-label">Jenis Kelamin<span className="text-danger">*</span></label>
                                            <select className="form-select" aria-label="Default select example" id="input-jk" name='input-jk'>
                                                <option value='L'>Laki-laki</option>
                                                <option value='P'>Perempuan</option>
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Tahun Masuk<span className="text-danger">*</span></label>
                                            <input type='number' className="form-control" id="input-angkatan" name='input-angkatan' placeholder="tahun" defaultValue={kadet.angkatan} />
                                        </div>
                                        <div className="mb-2">
                                            <label for="exampleFormControlInput1" className="form-label">Pangkat<span className="text-danger">*</span></label>
                                            <select className="form-select" aria-label="Default select example" id="input-pangkat" name='input-pangkat'>
                                                {pangkat.map(pangkat => {
                                                    return (
                                                        <option key={pangkat.pangkat_id} value={pangkat.pangkat_id}>{pangkat.pangkat_nama}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <label for="exampleFormControlInput1" className="form-label">Pleton<span className="text-danger">*</span></label>
                                            <select className="form-select" aria-label="Default select example" id="input-pleton" name='input-pleton'>
                                                {pleton.map(pleton => {
                                                    return (
                                                        <option key={pleton.pleton_id} value={pleton.pleton_id}>{pleton.pleton_nama}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className='text-center d-none' id='edit-kadet-loading'>
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        <div className="alert p-2 bg-danger d-none text-light" id='edit-kadet-danger' role="alert">
                                            <strong>Gagal menyimpan!</strong>
                                            <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                        </div>
                                        <div className="alert p-2 bg-success d-none text-light" id='edit-kadet-success' role="alert">
                                            <strong>Berhasil menyimpan!</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={() => {
                                setFoto({ url: kadet.foto_isi })
                                document.getElementById('input-pangkat').value = kadet.pangkat_id
                                document.getElementById('input-pleton').value = kadet.pleton_id
                                document.getElementById('input-jk').value = kadet.jenis_kelamin
                                document.getElementById('input-nama').value = document.getElementById('input-nama').defaultValue
                                document.getElementById('input-nim').value = document.getElementById('input-nim').defaultValue
                            }} className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-primary px-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ModalFormLapApel = ({ kadets, pleton }) => {

    const [sakit, setSakit] = React.useState([])
    const [izin, setIzin] = React.useState([])

    const [foto, setFoto] = React.useState({
        url: `data:image/jpeg;base64,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`
    })

    React.useEffect(() => {
        //console.log('sakit', sakit)
        //console.log('izin', izin)
    }, [sakit, izin])

    return (
        <div className="modal fade" id="staticBackdropLapApel" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={(e) => { handleLapApel(e, kadets) }}>
                        <div className="modal-header sticky-top bg-light">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Laporan Apel</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-lg-4 table-responsive">
                            <table className='w-100 table table-striped'>
                                <thead>
                                    <tr>
                                        <th className='align-middle'>Jenis Apel</th>
                                        <td>
                                            <select className="form-select" name='jenis-apel'>
                                                <option value='1'>Pagi</option>
                                                <option value='2'>Malam</option>
                                                <option value='3'>Insidental</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='align-middle'>Pleton</th>
                                        <td>
                                            <input type='hidden' readOnly className='form-control' name='input-pleton-id' defaultValue={pleton.pleton_id} />
                                            <input type='text' disabled className='form-control' defaultValue={pleton.pleton_nama} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Nama</th>
                                        <th>Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kadets.map(kadet => {
                                        return (
                                            <tr key={kadet.kadet_id}>
                                                <td className='d-none'><input name={`kadet_id-${kadet.kadet_id}`} value={kadet.kadet_id} readOnly /></td>
                                                <td>
                                                    {kadet.kadet_nama}
                                                </td>
                                                <td>
                                                    <select className="form-select" onChange={() => {
                                                        if (document.getElementById(`keterangan_id-${kadet.kadet_id}`).value == 2) {
                                                            setSakit([...sakit, kadet.kadet_id])
                                                            setIzin(izin.filter(izin => izin != kadet.kadet_id))
                                                        } else if (document.getElementById(`keterangan_id-${kadet.kadet_id}`).value == 3) {
                                                            setIzin([...izin, kadet.kadet_id])
                                                            setSakit(sakit.filter(sakit => sakit != kadet.kadet_id))
                                                        } else {
                                                            setSakit(sakit.filter(sakit => sakit != kadet.kadet_id))
                                                            setIzin(izin.filter(izin => izin != kadet.kadet_id))
                                                        }
                                                    }} name={`keterangan_id-${kadet.kadet_id}`} id={`keterangan_id-${kadet.kadet_id}`}>
                                                        <option value="1">Hadir</option>
                                                        <option value="2">Sakit</option>
                                                        <option value="3">Izin</option>
                                                        <option value="4">Tanpa Keterangan</option>
                                                    </select>
                                                    {sakit.map(sakit => {
                                                        if (sakit == kadet.kadet_id) {
                                                            return (
                                                                <div key={sakit} className='p-1'>
                                                                    <table className='w-100'>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Sakit<span className='text-danger'>*</span></td>
                                                                                <td>
                                                                                    <input required className='form-control' name={`sakit-${sakit}`} />
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Tindak Lanjut<span className='text-danger'>*</span></td>
                                                                                <td>
                                                                                    <textarea required type='textarea' className='form-control' name={`detail-sakit-${sakit}`} />
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Foto<span className='text-danger'>*</span></td>
                                                                                <td>
                                                                                    <img id={`display-foto-sakit-${sakit}`} className='border w-100 p-1' style={{ maxWidth: 300 }} />
                                                                                    <br /><small className='p-1'>Masukkan lampiran bukti sakit</small>
                                                                                    <input required onChange={async (e) => {
                                                                                        let selectedFile = e.target.files[0]
                                                                                        if (selectedFile) {
                                                                                            await handleChangeFoto(selectedFile).then(x => {
                                                                                                console.log(x)
                                                                                                document.getElementById(`display-foto-sakit-${sakit}`).src = x.url
                                                                                            })
                                                                                        }
                                                                                    }} type='file' accept="image/*" className='form-control' name={`foto-sakit-${sakit}`} />
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                    {izin.map(izin => {
                                                        if (izin == kadet.kadet_id) {
                                                            return (
                                                                <div key={izin} className='p-1'>
                                                                    <table className='w-100'>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Izin<span className='text-danger'>*</span></td>
                                                                                <td>
                                                                                    <input required className='form-control' name={`izin-${izin}`} />
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Detail<span className='text-danger'>*</span></td>
                                                                                <td>
                                                                                    <input required className='form-control' name={`detail-izin-${izin}`} />
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Foto<span className='text-danger'>*</span></td>
                                                                                <td>
                                                                                    <img id={`display-foto-izin-${izin}`} className='border w-100 p-1' style={{ maxWidth: 300 }} />
                                                                                    <br /><small className='p-1'>Masukkan lampiran bukti izin</small>
                                                                                    <input required onChange={async (e) => {
                                                                                        let selectedFile = e.target.files[0]
                                                                                        if (selectedFile) {
                                                                                            await handleChangeFoto(selectedFile).then(x => {
                                                                                                console.log(x)
                                                                                                document.getElementById(`display-foto-izin-${izin}`).src = x.url
                                                                                            })
                                                                                        }
                                                                                    }} type='file' accept="image/*" className='form-control' name={`foto-izin-${izin}`} />
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className='text-center d-none' id='lap-apel-loading'>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div className="alert p-2 bg-danger d-none text-light" id='lap-apel-danger' role="alert">
                                <strong>Gagal menyimpan!</strong>
                                <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                            </div>
                            <div className="alert p-2 bg-success d-none text-light" id='lap-apel-success' role="alert">
                                <strong>Berhasil menyimpan!</strong>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-primary px-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ModalFormForwardApel = ({ tingkat, subordinates }) => {
    const [jenis_apel, setJenisApel] = React.useState(1)
    var keterangan = {
        jumlah: 0,
        hadir: 0,
        sakit: 0,
        izin: 0,
        tanpa_keterangan: 0,
    }
    return (
        <div className="modal fade" id="staticBackdropForwardApel" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={(e) => { handleForwardApel(e, tingkat, subordinates) }}>
                        <div className="modal-header sticky-top bg-light">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Laporan Apel</h1>
                            <button type="reset" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-lg-4 table-responsive">
                            <table className='w-100 table table-striped'>
                                <thead>
                                    <tr>
                                        <th className='align-middle'>Jenis Apel</th>
                                        <td colSpan='5'>
                                            <select onChange={async (e) => {
                                                setJenisApel(e.target.value)

                                            }} className="form-select" name='jenis-apel' id='jenis-apel'>
                                                <option value='1'>Pagi</option>
                                                <option value='2'>Malam</option>
                                                <option value='3'>Insidental</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Laporan</th>
                                        <td className='text-end'><span className='d-md-none'>J</span><span className='d-none d-md-block'>Jumlah</span></td>
                                        <td className='text-end'><span className='d-md-none'>H</span><span className='d-none d-md-block'>Hadir</span></td>
                                        <td className='text-end'><span className='d-md-none'>S</span><span className='d-none d-md-block'>Sakit</span></td>
                                        <td className='text-end'><span className='d-md-none'>I</span><span className='d-none d-md-block'>Izin</span></td>
                                        <td className='text-end'><span className='d-md-none'>TK</span><span className='d-none d-md-block'>Tanpa Keterangan</span></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subordinates.map(eachSubordinates => {
                                        return (
                                            <tr key={eachSubordinates.subordinates_id}>
                                                <td>{eachSubordinates.subordinates_nama}</td>
                                                {eachSubordinates.lap_apel.map(lap_apel => {
                                                    if (lap_apel.jenis_apel_id == jenis_apel) {
                                                        keterangan.jumlah = keterangan.jumlah + Number(lap_apel.hadir) + Number(lap_apel.sakit) + Number(lap_apel.izin) + Number(lap_apel.tanpa_keterangan)
                                                        keterangan.hadir = keterangan.hadir + Number(lap_apel.hadir)
                                                        keterangan.sakit = keterangan.sakit + Number(lap_apel.sakit)
                                                        keterangan.izin = keterangan.izin + Number(lap_apel.izin)
                                                        keterangan.tanpa_keterangan = keterangan.tanpa_keterangan + Number(lap_apel.tanpa_keterangan)

                                                        return (
                                                            <>
                                                                <input type='hidden' value={lap_apel.apel_id} name={`subordinates-apel-${eachSubordinates.subordinates_id}`} />
                                                                <td className='text-end'>{Number(lap_apel.hadir) + Number(lap_apel.sakit) + Number(lap_apel.izin) + Number(lap_apel.tanpa_keterangan)}</td>
                                                                <td className='text-end'>{Number(lap_apel.hadir)}</td>
                                                                <td className='text-end'>{Number(lap_apel.sakit)}</td>
                                                                <td className='text-end'>{Number(lap_apel.izin)}</td>
                                                                <td className='text-end'>{Number(lap_apel.tanpa_keterangan)}</td>
                                                            </>
                                                        )
                                                    }
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <thead>
                                    <tr>
                                        <th>Total</th>
                                        <td className='text-end'>{keterangan.jumlah}</td>
                                        <td className='text-end'>{keterangan.hadir}</td>
                                        <td className='text-end'>{keterangan.sakit}</td>
                                        <td className='text-end'>{keterangan.izin}</td>
                                        <td className='text-end'>{keterangan.tanpa_keterangan}</td>
                                    </tr>
                                </thead>
                            </table>
                            <div className='text-center d-none' id='forward-apel-loading'>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div className="alert p-2 bg-danger d-none text-light" id='forward-apel-danger' role="alert">
                                <strong>Gagal menyimpan!</strong>
                                <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                            </div>
                            <div className="alert p-2 bg-success d-none text-light" id='forward-apel-success' role="alert">
                                <strong>Berhasil menyimpan!</strong>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="reset" className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-primary px-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ModalFormLapGiat = ({ kadets }) => {
    /*
        const [foto, setFoto] = React.useState([{
            url: `data:image/jpeg;base64,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`
        }])
    */
    const [foto, setFoto] = React.useState([])
    const [attachment, setAttachment] = React.useState([])
    const [kadetsSelect, setKadetsSelect] = React.useState([])

    const [kadetsAdd, setKadetsAdd] = React.useState([

    ])

    const changeFind = (kadets) => {
        var find = document.getElementById('search-nama').value.toLowerCase();
        if (find == '') {
            setKadetsSelect([])
        } else {
            var stringRecent = []
            for (let index = 0; index < kadets.length; index++) {
                if (kadets[index].kadet_nama.toLowerCase().includes(find)) {
                    stringRecent.push(kadets[index])
                }
            }
            setKadetsSelect(stringRecent)
        }
    }

    const addKadet = (kadet_id, kadet_nama) => {
        var included = 0
        for (let index = 0; index < kadetsAdd.length; index++) {
            if (kadet_id == kadetsAdd[index].kadet_id) {
                included = 1
                break
            }
        }
        console.log(included)
        if (included == 0) {
            setKadetsAdd([...kadetsAdd, { kadet_id: kadet_id, kadet_nama: kadet_nama.split(" ")[0] }])
        }
    }

    return (
        <div className="modal fade" id="staticBackdropLapGiat" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={(e) => { handleLapGiat(e, kadetsAdd, foto, attachment) }}>
                        <div className="modal-header sticky-top bg-light">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Laporan Kegiatan</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-lg-4 table-responsive">
                            <table className='w-100 table table-borderless'>
                                <tbody>
                                    <tr>
                                        <th className='col-4'>Nama Kegiatan</th>
                                        <td><input type="text" required className="form-control" id="input-nama-giat" name='input-nama-giat' placeholder="nama kegiatan" /></td>
                                    </tr>
                                    <tr>
                                        <th>Tanggal Kegiatan</th>
                                        <td><input type="date" required className="form-control" id="input-date-giat" name='input-date-giat' /></td>
                                    </tr>
                                    <tr>
                                        <th>Detail Kegiatan</th>
                                        <td><textarea class="form-control" required placeholder="Detail Kegiatan" id="input-detail-giat" name='input-detail-giat'></textarea></td>
                                    </tr>
                                    <tr>
                                        <th>Peserta</th>
                                        <td>
                                            <div className="input-group pb-2">
                                                <span className="input-group-text">Cari nama</span>
                                                <input type="text" onChange={() => { changeFind(kadets) }} id='search-nama' className="form-control bg-putihdikit" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                            </div>
                                            <div className='border rounded-2 p-2 overflow-auto mb-2 bg-light' style={{ maxHeight: 300 }}>
                                                {kadetsSelect.map(kadet => {
                                                    return (
                                                        <div key={kadet.kadet_id} className='d-flex border rounded-1 p-1 mb-1'>
                                                            <span className='align-self-center'>{kadet.pangkat_singkat} {kadet.kadet_nama}</span>
                                                            <button type='button' className='btn p-0 px-1 border-0 ms-auto' onClick={() => { addKadet(kadet.kadet_id, kadet.kadet_nama) }}>
                                                                <i class="bi bi-plus-square-fill fs-4"></i>
                                                            </button>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className='border rounded-2 p-2 overflow-auto' style={{ height: 100 }}>
                                                {kadetsAdd.map(x => {
                                                    return (
                                                        <button type='button' onClick={() => {
                                                            setKadetsAdd(kadetsAdd.filter(kadet => {
                                                                return kadet.kadet_id != x.kadet_id
                                                            }))
                                                        }} className='btn btn-secondary rounded-pill mb-1 me-1 p-0 px-2'>
                                                            {x.kadet_nama}
                                                            <i class="ms-2 bi bi-x-lg"></i>
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Attachment(url)</th>
                                        <td>
                                            {attachment.map(x => {
                                                return (
                                                    <div key={x} className='mb-1 d-flex'>
                                                        <input type='url' required id={`attachment-${x}`} name={`attachment-${x}`} placeholder='attachment link' className='form-control bg-putihdikit me-2' />
                                                        <button type='button' className='btn p-0 border-0' onClick={() => {
                                                            setAttachment(attachment.filter(attachment => {
                                                                return attachment != x
                                                            }))
                                                        }}>
                                                            <i class="bi bi-x-square-fill fs-4"></i>
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                            <button type='button' className='btn p-0 border-0' onClick={() => {
                                                if (attachment.length == 0) {
                                                    setAttachment([...attachment, attachment.length])
                                                } else {
                                                    setAttachment([...attachment, attachment[attachment.length-1]+1])
                                                }
                                                console.log(attachment)
                                            }}>
                                                <i class="bi bi-plus-square-fill fs-4"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Dokumentasi</th>
                                        <td>
                                            <input onChange={async (e) => {
                                                let selectedFile = e.target.files[0]
                                                await handleChangeFoto(selectedFile).then(x => {
                                                    setFoto([...foto, x])
                                                })
                                            }} type='file' accept="image/*" className='form-control' name='' />
                                            {foto.map((f, i) => {
                                                return (
                                                    <div className='d-flex'>
                                                        <img src={f.url} id={`dokumentasi-${i}`} className='border p-1 col-10' style={{ maxWidth: 300 }} />
                                                        <button type='button' className='btn p-0 px-1 border-0 col-2' onClick={() => {
                                                            setFoto(foto.filter(f2 => f2.url != document.getElementById(`dokumentasi-${i}`).src))

                                                        }}>
                                                            <i class="bi bi-x-square-fill fs-3"></i>
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='text-center d-none' id='lap-giat-loading'>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div className="alert p-2 bg-danger d-none text-light" id='lap-giat-danger' role="alert">
                                <strong>Gagal menyimpan!</strong>
                                <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                            </div>
                            <div className="alert p-2 bg-success d-none text-light" id='lap-giat-success' role="alert">
                                <strong>Berhasil menyimpan!</strong>
                            </div>
                        </div>
                        <div className="modal-footer sticky-bottom bg-light">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-primary px-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ModalFormApproveGiat = ({ giat }) => {

    return (
        <div className="modal fade" id="staticBackdropApproveGiat" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header sticky-top bg-light">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Approve Laporan Kegiatan</h1>
                        <button type="reset" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body px-lg-4 table-responsive">
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <th className='col-4'>Nama Kegiatan</th>
                                    <td>{giat.giat_nama}</td>
                                </tr>
                                <tr>
                                    <th>Detail Kegiatan</th>
                                    <td>{giat.giat_detail}</td>
                                </tr>
                                <tr>
                                    <th>Tanggal Kegiatan</th>
                                    <td>{new Date(giat.giat_date).toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td>
                                </tr>
                                <tr>
                                    <th>Pelapor</th>
                                    <td>{giat.pelapor_nama}</td>
                                </tr>
                            </tbody>
                        </table>
                        Approve Laporan Kegiatan ini ?
                        <div className='text-center d-none' id='edit-approve-loading'>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <div className="alert p-2 bg-danger d-none text-light" id='edit-approve-danger' role="alert">
                            <strong>Gagal menyimpan!</strong>
                            <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                        </div>
                        <div className="alert p-2 bg-success d-none text-light" id='edit-approve-success' role="alert">
                            <strong>Berhasil menyimpan!</strong>
                        </div>
                    </div>
                    <form></form>
                    <div className="modal-footer">
                        <button type="reset" className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                        <button type="submit" onClick={() => { handleApproveGiat(giat.giat_id) }} className="btn btn-primary px-4">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ModalFormEditApel = ({ tingkat, id }) => {

    const [sakit, setSakit] = React.useState([])
    const [izin, setIzin] = React.useState([])

    const [lapApel, setLapApel] = React.useState({})
    const [dataApel, setDataApel] = React.useState([])
    const [subordinates, setSubordinates] = React.useState([])

    React.useEffect(() => {
        getLapApel2(tingkat, id).then(x => {
            if (x.lapApel) {
                var listSakit = []
                var listIzin = []
                setLapApel(x.lapApel.lap_apel[0])
                document.getElementById('edit-jenis-apel').value = x.lapApel.lap_apel[0].jenis_apel_id
                setDataApel(x.dataApel)
                for (let index = 0; index < x.dataApel.length; index++) {
                    if (x.dataApel[index].keterangan_id == 2) {
                        listSakit.push(x.dataApel[index].data_apel_id)
                    } else if (x.dataApel[index].keterangan_id == 3) {
                        listIzin.push(x.dataApel[index].data_apel_id)
                    }
                }
                setSakit(listSakit)
                setIzin(listIzin)
                if (x.sub.lap_apel) {
                    setSubordinates(x.sub.lap_apel)
                }
            }
        })

    }, [tingkat, id])

    React.useEffect(() => {
        for (let index = 0; index < dataApel.length; index++) {
            document.getElementById(`keterangan_id-${dataApel[index].data_apel_id}`).value = dataApel[index].keterangan_id
            if (dataApel[index].keterangan_id == 2) {
                document.getElementById(`sakit-${dataApel[index].data_apel_id}`).value = dataApel[index].sakit.sakit_nama
                document.getElementById(`detail-sakit-${dataApel[index].data_apel_id}`).value = dataApel[index].sakit.sakit_detail
                document.getElementById(`display-foto-sakit-${dataApel[index].data_apel_id}`).src = dataApel[index].sakit.foto_isi
            } else if (dataApel[index].keterangan_id == 3) {
                document.getElementById(`izin-${dataApel[index].data_apel_id}`).value = dataApel[index].izin.izin_nama
                document.getElementById(`detail-izin-${dataApel[index].data_apel_id}`).value = dataApel[index].izin.izin_detail
                document.getElementById(`display-foto-izin-${dataApel[index].data_apel_id}`).src = dataApel[index].izin.foto_isi
            }
        }
    }, [dataApel])


    return (
        <div className="modal fade" id="staticBackdropEditApel" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form onSubmit={(e) => { handleEditApel(e, dataApel, { tingkat: lapApel.tingkat, satuan_id: lapApel.satuan_id }) }}>
                        <div className="modal-header sticky-top bg-light">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Laporan Apel</h1>
                            <button type="reset" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body px-lg-4 table-responsive">
                            <table className='w-100 table table-striped'>
                                <thead>
                                    <tr>
                                        <th className='align-middle'>Jenis Apel</th>
                                        <td>
                                            <select disabled className="form-select" name='jenis-apel' id='edit-jenis-apel'>
                                                <option value='1'>Pagi</option>
                                                <option value='2'>Malam</option>
                                                <option value='3'>Insidental</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='align-middle'>Pleton</th>
                                        <td>
                                            <input type='text' disabled className='form-control' defaultValue={lapApel.satuan} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>Nama</th>
                                        <th>Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataApel.map(x => {
                                        return (
                                            <tr key={x.data_apel_id}>
                                                <td>{x.kadet_nama}</td>
                                                <td>
                                                    <select className="form-select" onChange={() => {
                                                        if (document.getElementById(`keterangan_id-${x.data_apel_id}`).value == 2) {
                                                            setSakit([...sakit, x.data_apel_id])
                                                            setIzin(izin.filter(izin => izin != x.data_apel_id))
                                                        } else if (document.getElementById(`keterangan_id-${x.data_apel_id}`).value == 3) {
                                                            setIzin([...izin, x.data_apel_id])
                                                            setSakit(sakit.filter(sakit => sakit != x.data_apel_id))
                                                        } else {
                                                            setSakit(sakit.filter(sakit => sakit != x.data_apel_id))
                                                            setIzin(izin.filter(izin => izin != x.data_apel_id))
                                                        }
                                                    }} name={`keterangan_id-${x.data_apel_id}`} id={`keterangan_id-${x.data_apel_id}`}>
                                                        <option value="1">Hadir</option>
                                                        <option value="2">Sakit</option>
                                                        <option value="3">Izin</option>
                                                        <option value="4">Tanpa Keterangan</option>
                                                    </select>
                                                    {sakit.map(sakit => {
                                                        if (sakit == x.data_apel_id) {
                                                            return (
                                                                <div key={sakit} className='p-1'>
                                                                    <table className='w-100'>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Sakit<span className='text-danger'>*</span></td>
                                                                                <td>
                                                                                    <input required className='form-control' name={`sakit-${sakit}`} id={`sakit-${sakit}`} />
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Tindak Lanjut<span className='text-danger'>*</span></td>
                                                                                <td>
                                                                                    <textarea required type='textarea' className='form-control' name={`detail-sakit-${sakit}`} id={`detail-sakit-${sakit}`} />
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Foto<span className='text-danger'>*</span></td>
                                                                                <td>
                                                                                    <img id={`display-foto-sakit-${sakit}`} className='border w-100 p-1' style={{ maxWidth: 300 }} />
                                                                                    <br /><small className='p-1'>Masukkan lampiran bukti sakit</small>
                                                                                    <input onChange={async (e) => {
                                                                                        let selectedFile = e.target.files[0]
                                                                                        if (selectedFile) {
                                                                                            await handleChangeFoto(selectedFile).then(x => {
                                                                                                console.log(x)
                                                                                                document.getElementById(`display-foto-sakit-${sakit}`).src = x.url
                                                                                            })
                                                                                        }
                                                                                    }} type='file' accept="image/*" className='form-control' name={`foto-sakit-${sakit}`} />
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                    {izin.map(izin => {
                                                        if (izin == x.data_apel_id) {
                                                            return (
                                                                <div key={izin} className='p-1'>
                                                                    <table className='w-100'>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Izin<span className='text-danger'>*</span></td>
                                                                                <td>
                                                                                    <input required className='form-control' name={`izin-${izin}`} id={`izin-${izin}`} />
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Detail<span className='text-danger'>*</span></td>
                                                                                <td>
                                                                                    <input required className='form-control' name={`detail-izin-${izin}`} id={`detail-izin-${izin}`} />
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Foto<span className='text-danger'>*</span></td>
                                                                                <td>
                                                                                    <img id={`display-foto-izin-${izin}`} className='border w-100 p-1' style={{ maxWidth: 300 }} />
                                                                                    <br /><small className='p-1'>Masukkan lampiran bukti izin</small>
                                                                                    <input onChange={async (e) => {
                                                                                        let selectedFile = e.target.files[0]
                                                                                        if (selectedFile) {
                                                                                            await handleChangeFoto(selectedFile).then(x => {
                                                                                                console.log(x)
                                                                                                document.getElementById(`display-foto-izin-${izin}`).src = x.url
                                                                                            })
                                                                                        }
                                                                                    }} type='file' accept="image/*" className='form-control' name={`foto-izin-${izin}`} />
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className='text-center d-none' id='edit-apel-loading'>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div className="alert p-2 bg-danger d-none text-light" id='edit-apel-danger' role="alert">
                                <strong>Gagal menyimpan!</strong>
                                <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                            </div>
                            <div className="alert p-2 bg-success d-none text-light" id='edit-apel-success' role="alert">
                                <strong>Berhasil menyimpan!</strong>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="reset" className="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                            <button type="submit" className="btn btn-primary px-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export {
    ModalFormTambahJabatan,
    ModalFormTambahDD,
    ModalFormAssignMenkorps,
    ModalFormAssignDinas,
    ModalStrukturMenkorps,
    ModalFormEditJabatan,
    ModalFormTambahKadet,
    ModalFormTambahKadetBulk,
    ModalFormTambahAdmin,
    ModalFormTambahPengasuh,
    ModalFormPassword,
    ModalFormEditKadet,
    ModalFormLapApel,
    ModalFormForwardApel,
    ModalFormLapGiat,
    ModalFormEditApel,
    ModalFormApproveGiat
}