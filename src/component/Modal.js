import { handleTambahDD, handleTambahJabatan } from "../function/Post"
import { handleAssignJabatan } from "../function/Put"
import { StrukturMenkorps } from "./Minor"

//Fungsi Penunjang
const changeTingkat = (satuan) => {
    var tingkat = document.getElementById('input-tingkat-jabatan').value
    var stringRecent = ""
    for (let index = 0; index < satuan[tingkat].length; index++) {
        stringRecent += `<option value=${satuan[tingkat][index][`${tingkat}_id`]}>${satuan[tingkat][index][`${tingkat}_nama`]}</option>`
    }
    document.getElementById('input-yurisdiksi-jabatan').innerHTML = stringRecent
}

const changeTingkatDD = (satuan) => {
    var tingkat = document.getElementById('input-tingkat-dd').value
    var stringRecent = ""
    for (let index = 0; index < satuan[tingkat].length; index++) {
        stringRecent += `<option value=${satuan[tingkat][index][`${tingkat}_id`]}>${satuan[tingkat][index][`${tingkat}_nama`]}</option>`
    }
    document.getElementById('input-yurisdiksi-dd').innerHTML = stringRecent
}

const changeAssignTingkat = (jabatans) => {
    var tingkat = document.getElementById('input-assign-tingkat').value
    var stringRecent = ""
    for (let index = 0; index < jabatans.length; index++) {
        if (jabatans[index].tingkat == tingkat) {
            stringRecent += `<option value=${jabatans[index].jabatan_id}>${jabatans[index].jabatan_nama}</option>`
        }
    }
    document.getElementById('input-assign-jabatan').innerHTML = stringRecent
}

const changeFind = (kadets) => {
    var find = document.getElementById('search-nama').value.toLowerCase();
    var stringRecent = ""
    for (let index = 0; index < kadets.length; index++) {
        if (kadets[index].kadet_nama.toLowerCase().includes(find) && kadets[index].jabatan_resimen_nama == null && kadets[index].jabatan_batalyon_nama == null && kadets[index].jabatan_kompi_nama == null && kadets[index].jabatan_pleton_nama == null) {
            stringRecent += `<option value=${kadets[index].kadet_id}>${kadets[index].pangkat_singkat} ${kadets[index].kadet_nama}</option>`
        }

    }
    document.getElementById('input-assign-pejabat').innerHTML = stringRecent
}

//Fungsi Utama
const modalFormTambahJabatan = (satuan) => {
    return (
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
                                        <select class="form-select" required onChange={() => { changeTingkat(satuan) }} aria-label="Default select example" id="input-tingkat-jabatan" name='input-tingkat-jabatan'>
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
    )
}

const modalFormTambahDD = (satuan) => {
    return (
        <div class="modal fade" id="staticBackdropDD" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content bg-dark text-white">
                    <form onSubmit={handleTambahDD}>
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Tambah Dinas Dalam</h1>
                            <button type='reset' class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body px-lg-4">
                            <div className='py-1'>
                                <div class="mb-2 row">
                                    <div className='col-12 col-lg-6 mb-2'>
                                        <label for="exampleFormControlInput1" class="form-label">Jenis<span className="text-danger">*</span></label>
                                        <select class="form-select" required aria-label="Default select example" id="input-jenis-dd" name='input-jenis-dd'>
                                            <option value="1">Komando</option>
                                            <option value="2">Staf</option>
                                            <option value="3">Perwakilan</option>
                                            <option value="4">Penegak Disiplin</option>
                                        </select>
                                    </div>
                                    <div className='col-12 col-lg-6 mb-2'>
                                        <label for="exampleFormControlInput1" class="form-label">Tingkat<span className="text-danger">*</span></label>
                                        <select class="form-select" required onChange={() => { changeTingkatDD(satuan) }} aria-label="Default select example" id="input-tingkat-dd" name='input-tingkat-dd'>
                                            <option value="resimen">Resimen</option>
                                            <option value="batalyon">Batalyon</option>
                                            <option value="kompi">Kompi</option>
                                            <option value="pleton">Pleton</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-2 row">
                                    <div className='col-12 col-lg-8 mb-2'>
                                        <label for="exampleFormControlInput1" class="form-label">Yurisdiksi<span className="text-danger">*</span></label>
                                        <select class="form-select" required aria-label="Default select example" id="input-yurisdiksi-dd" name='input-yurisdiksi-dd'>
                                            <option value="1">Resimen Korps Kadet Mahasiswa S1 Unhan RI</option>
                                        </select>
                                    </div>
                                    <div className='col-12 col-lg-4 mb-2'>
                                        <label for="exampleFormControlInput1" class="form-label">Jenis Kelamin<span className="text-danger">*</span></label>
                                        <select class="form-select" aria-label="Default select example" id="input-jk-dd" name='input-jk-dd'>
                                            <option value='L'>Laki-laki</option>
                                            <option value='P'>Perempuan</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <label for="exampleFormControlInput1" class="form-label">Nama Dinas Dalam<span className="text-danger">*</span></label>
                                    <input type="text" class="form-control" required id="input-nama-dd" name='input-nama-dd' placeholder="nama dinas dalam" />
                                </div>
                                <div className='text-center d-none' id='tambah-dd-loading'>
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <div class="alert p-2 bg-danger d-none" id='tambah-dd-danger' role="alert">
                                    <strong>Gagal menyimpan!</strong>
                                    <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                </div>
                                <div class="alert p-2 bg-success d-none" id='tambah-dd-success' role="alert">
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
    )
}

const ModalStrukturMenkorps = () => {
    return (
        <div class="modal fade" id="staticBackdropStrukturMenkorps" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Struktur Menkorps</h1>
                        <div className='ms-2'>
                            <a href='#struktur-menkorps-komando' className='p-1 px-2 me-2 btn btn-danger'>Komando</a>
                            <a href='#struktur-menkorps-staf' className='p-1 px-2 me-2 btn btn-primary'>Staf</a>
                            <a href='#struktur-menkorps-lemuskad' className='p-1 px-2 me-2 btn btn-dark border-black bg-black'>Lemuskad</a>
                            <a href='#struktur-menkorps-polkad' className='p-1 px-2 me-2 btn btn-light'>Polkad</a>
                        </div>
                        <button type='button' class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body px-lg-4">
                        <StrukturMenkorps />
                    </div>
                </div>
            </div>
        </div>
    )
}

const modalFormAssignMenkorps = (jabatans,kadets) => {
    return (
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
                                        <select class="form-select" required onChange={()=>{changeAssignTingkat(jabatans)}} aria-label="Default select example" id="input-assign-tingkat" name='input-assign-tingkat'>
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
                                    <div class="input-group pb-2">
                                        <span class="input-group-text bg-dark text-white">Cari nama</span>
                                        <input type="text" onChange={()=>{changeFind(kadets)}} id='search-nama' class="form-control bg-putihdikit" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    </div>
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
    )
}

export {
    modalFormTambahJabatan,
    modalFormTambahDD,
    ModalStrukturMenkorps,
    modalFormAssignMenkorps
}