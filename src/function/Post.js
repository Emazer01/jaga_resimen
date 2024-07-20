import axios from 'axios';
import { sleep } from "./Minor";

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
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/accounts/add`,
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
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/accounts/add`,
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

const handleTambahKadet = async (event, foto) => {
    event.preventDefault();
    document.getElementById("tambah-kadet-loading").classList.remove('d-none')
    const data = new FormData(event.currentTarget);
    const fotoUrl = foto.url
    if (data.get('input-username') == "" || data.get('input-password') == "" || data.get('input-nama') == "" || data.get('input-nim') == "" || data.get('input-pangkat') == "" || data.get('input-jk') == "" || data.get('input-pleton') == "") {
        document.getElementById("tambah-kadet-loading").classList.add('d-none')
        document.getElementById("tambah-kadet-danger").classList.remove('d-none')
        await sleep(1500)
        document.getElementById("tambah-kadet-danger").classList.add('d-none')
    } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/accounts/addKadet`,
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
                angkatan: data.get('input-angkatan')
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            }
        )
            .then(async function (response) {
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
                console.log(error)
                console.log("error kirim")
                document.getElementById("tambah-kadet-loading").classList.add('d-none')
                document.getElementById("tambah-kadet-danger").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("tambah-kadet-danger").classList.add('d-none')
            });
    }
}

const handleTambahKadetBulk = async (event, foto, excel) => {
    event.preventDefault();
    document.getElementById("tambah-kadetBulk-loading").classList.remove('d-none')
    for (let index = 0; index < excel.length; index++) {
        console.log(excel[index])
        if (excel[index].username == null || excel[index].password == null || excel[index].nama == null || excel[index].nim == null || excel[index].pangkat_id == null || excel[index].pleton_id == null) {
            document.getElementById('tambah-kadetBulk-status').innerHTML += `<span class='text-danger'>${excel[index].nama}&nbsp;<i class="bi bi-x-circle-fill"></i></span><br/>`
        } else {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/accounts/addKadet`,
                {
                    username: excel[index].username,
                    password: excel[index].password,
                    role: 2,
                    nama: excel[index].nama,
                    nim: excel[index].nim,
                    pangkat: excel[index].pangkat_id,
                    jk: excel[index].jk,
                    pleton: excel[index].pleton_id,
                    fotoUrl: foto.url,
                    angkatan: excel[index].angkatan
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            )
                .then(async function (response) {
                    if (response.status == 200) {
                        console.log(response)
                        document.getElementById('tambah-kadetBulk-status').innerHTML += `<span class='text-success'>${excel[index].nama}&nbsp;<i class="bi bi-check-circle-fill"></i></span><br/>`
                    } else {
                        document.getElementById('tambah-kadetBulk-status').innerHTML += `<span class='text-danger'>${excel[index].nama}&nbsp;<i class="bi bi-x-circle-fill"></i></span><br/>`
                    }
                })
                .catch(async function (error) {
                    console.log(error)
                    document.getElementById('tambah-kadetBulk-status').innerHTML += `<span class='text-danger'>${excel[index].nama}&nbsp;<i class="bi bi-x-circle-fill"></i></span><br/>`
                });

        }

    }
    document.getElementById("tambah-kadetBulk-loading").classList.add('d-none')
    window.location.reload()
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

const handleTambahDD = async (event) => {
    event.preventDefault();
    document.getElementById("tambah-dd-loading").classList.remove('d-none')
    const data = new FormData(event.currentTarget);
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tambahDD`,
        {
            jenis_jabatan: data.get('input-jenis-dd'),
            tingkat: data.get('input-tingkat-dd'),
            yurisdiksi: data.get('input-yurisdiksi-dd'),
            nama_dd: data.get('input-nama-dd'),
            jk: data.get('input-jk-dd')
        },
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(async function (response) {
            if (response.status == 200) {
                document.getElementById("tambah-dd-loading").classList.add('d-none')
                document.getElementById("tambah-dd-success").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("tambah-dd-success").classList.add('d-none')
                window.location.reload()
            } else {
                console.log("udah kirim")
                document.getElementById("tambah-dd-loading").classList.add('d-none')
                document.getElementById("tambah-dd-danger").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("tambah-dd-danger").classList.add('d-none')
            }
        })
        .catch(async function (error) {
            console.log("error kirim")
            document.getElementById("tambah-dd-loading").classList.add('d-none')
            document.getElementById("tambah-dd-danger").classList.remove('d-none')
            await sleep(1500)
            document.getElementById("tambah-dd-danger").classList.add('d-none')
        });
}

const handleLogin = async (event) => {
    event.preventDefault();
    document.getElementById("login-loading").classList.remove("d-none")
    const data = new FormData(event.currentTarget);
    const username = data.get('input-username');
    const password = data.get('input-password');
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        username: username,
        password: password
    })
        .then(async function (response) {
            document.getElementById("login-loading").classList.add("d-none")
            document.getElementById('login-success').classList.remove("d-none")
            await sleep(1000)
            localStorage.setItem('access_token', response.data)
            window.location.href = '/'
        })
        .catch(async function (error) {
            console.log(error.response);
            document.getElementById("login-loading").classList.add("d-none")
            document.getElementById('login-danger-message').innerHTML = error.response.data
            document.getElementById("login-danger").classList.remove("d-none")
            await sleep(1500)
            document.getElementById("login-danger").classList.add("d-none")
        });
}

const handleLapApel = async (event, kadets) => {
    event.preventDefault();
    document.getElementById("lap-apel-loading").classList.remove("d-none")
    const data = new FormData(event.currentTarget);
    var listKet = []
    for (let index = 0; index < kadets.length; index++) {
        if (data.get(`keterangan_id-${kadets[index].kadet_id}`) == 2) {
            listKet.push({
                kadet_id: data.get(`kadet_id-${kadets[index].kadet_id}`),
                keterangan_id: data.get(`keterangan_id-${kadets[index].kadet_id}`),
                sakit: data.get(`sakit-${kadets[index].kadet_id}`),
                detail_sakit: data.get(`detail-sakit-${kadets[index].kadet_id}`),
                foto_sakit: document.getElementById(`display-foto-sakit-${kadets[index].kadet_id}`).src
            })
        } else if (data.get(`keterangan_id-${kadets[index].kadet_id}`) == 3) {
            listKet.push({
                kadet_id: data.get(`kadet_id-${kadets[index].kadet_id}`),
                keterangan_id: data.get(`keterangan_id-${kadets[index].kadet_id}`),
                izin: data.get(`izin-${kadets[index].kadet_id}`),
                detail_izin: data.get(`detail-izin-${kadets[index].kadet_id}`),
                foto_izin: document.getElementById(`display-foto-izin-${kadets[index].kadet_id}`).src
            })
        } else {
            listKet.push({
                kadet_id: data.get(`kadet_id-${kadets[index].kadet_id}`),
                keterangan_id: data.get(`keterangan_id-${kadets[index].kadet_id}`)
            })
        }
    }
    console.log({
        jenis_apel: data.get('jenis-apel'),
        pleton_id: data.get('input-pleton-id'),
        data: listKet
    })
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/laporan/apel/create`,
        {
            jenis_apel: data.get('jenis-apel'),
            pleton_id: data.get('input-pleton-id'),
            data: listKet
        },
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(async function (response) {
            console.log(response)
            if (response.status == 200) {
                document.getElementById("lap-apel-loading").classList.add('d-none')
                document.getElementById("lap-apel-success").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("lap-apel-success").classList.add('d-none')
                window.location.reload()
            } else {
                console.log("udah kirim")
                document.getElementById("lap-apel-loading").classList.add('d-none')
                document.getElementById("lap-apel-danger").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("lap-apel-danger").classList.add('d-none')
            }
        })
        .catch(async function (error) {
            console.log("error kirim")
            document.getElementById("lap-apel-loading").classList.add('d-none')
            document.getElementById("lap-apel-danger").classList.remove('d-none')
            await sleep(1500)
            document.getElementById("lap-apel-danger").classList.add('d-none')
        });
}

const handleEditApel = async (event, dataApel, cek) => {
    try {
        event.preventDefault();
        document.getElementById("edit-apel-loading").classList.remove("d-none")
        const data = new FormData(event.currentTarget);
        var kirim = {
            cek: cek,
            major: [],
            minor: {
                sakit: [],
                izin: []
            },
            toDel: {
                sakit: [],
                izin: [],
                foto: []
            }
        }
        for (let index = 0; index < dataApel.length; index++) {
            if (data.get(`keterangan_id-${dataApel[index].data_apel_id}`) != dataApel[index].keterangan_id) {
                if (dataApel[index].keterangan_id == 2) {
                    kirim.toDel.sakit.push(dataApel[index].sakit_id)
                    kirim.toDel.foto.push(dataApel[index].sakit.foto_id)
                } else if (dataApel[index].keterangan_id == 3) {
                    kirim.toDel.izin.push(dataApel[index].izin_id)
                    kirim.toDel.foto.push(dataApel[index].izin.foto_id)
                }

                if (data.get(`keterangan_id-${dataApel[index].data_apel_id}`) == 2) {
                    if (document.getElementById(`display-foto-sakit-${dataApel[index].data_apel_id}`).src == "") {
                        throw Error
                    }
                    kirim.major.push({
                        data_apel_id: dataApel[index].data_apel_id,
                        keterangan_id: data.get(`keterangan_id-${dataApel[index].data_apel_id}`),
                        sakit: {
                            sakit_nama: data.get(`sakit-${dataApel[index].data_apel_id}`),
                            sakit_detail: data.get(`detail-sakit-${dataApel[index].data_apel_id}`),
                            foto: document.getElementById(`display-foto-sakit-${dataApel[index].data_apel_id}`).src
                        }
                    })
                } else if (data.get(`keterangan_id-${dataApel[index].data_apel_id}`) == 3) {
                    if (document.getElementById(`display-foto-izin-${dataApel[index].data_apel_id}`).src == "") {
                        throw Error
                    }
                    kirim.major.push({
                        data_apel_id: dataApel[index].data_apel_id,
                        keterangan_id: data.get(`keterangan_id-${dataApel[index].data_apel_id}`),
                        izin: {
                            izin_nama: data.get(`izin-${dataApel[index].data_apel_id}`),
                            izin_detail: data.get(`detail-izin-${dataApel[index].data_apel_id}`),
                            foto: document.getElementById(`display-foto-izin-${dataApel[index].data_apel_id}`).src
                        }
                    })
                } else {
                    kirim.major.push({
                        data_apel_id: dataApel[index].data_apel_id,
                        keterangan_id: data.get(`keterangan_id-${dataApel[index].data_apel_id}`),
                    })
                }
            } else {
                if (dataApel[index].keterangan_id == 2) {
                    if (dataApel[index].sakit.sakit_nama != data.get(`sakit-${dataApel[index].data_apel_id}`) || dataApel[index].sakit.sakit_detail != data.get(`detail-sakit-${dataApel[index].data_apel_id}`) || dataApel[index].sakit.foto_isi != document.getElementById(`display-foto-sakit-${dataApel[index].data_apel_id}`).src) {
                        if (document.getElementById(`display-foto-sakit-${dataApel[index].data_apel_id}`).src == "") {
                            throw Error
                        }
                        kirim.minor.sakit.push({
                            sakit_id: dataApel[index].sakit.sakit_id,
                            sakit_nama: data.get(`sakit-${dataApel[index].data_apel_id}`),
                            sakit_detail: data.get(`detail-sakit-${dataApel[index].data_apel_id}`),
                            foto_id: dataApel[index].sakit.foto_id,
                            foto: document.getElementById(`display-foto-sakit-${dataApel[index].data_apel_id}`).src
                        })
                    }
                } else if (dataApel[index].keterangan_id == 3) {
                    if (dataApel[index].izin.izin_nama != data.get(`izin-${dataApel[index].data_apel_id}`) || dataApel[index].izin.izin_detail != data.get(`detail-izin-${dataApel[index].data_apel_id}`) || dataApel[index].izin.foto_isi != document.getElementById(`display-foto-izin-${dataApel[index].data_apel_id}`).src) {
                        if (document.getElementById(`display-foto-izin-${dataApel[index].data_apel_id}`).src == "") {
                            throw Error
                        }
                        kirim.minor.izin.push({
                            izin_id: dataApel[index].izin.izin_id,
                            izin_nama: data.get(`izin-${dataApel[index].data_apel_id}`),
                            izin_detail: data.get(`detail-izin-${dataApel[index].data_apel_id}`),
                            foto_id: dataApel[index].izin.foto_id,
                            foto: document.getElementById(`display-foto-izin-${dataApel[index].data_apel_id}`).src
                        })
                    }
                }

            }
        }
        console.log(dataApel)
        console.log('kirim', kirim)
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/laporan/apel/edit`,
            kirim,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            }
        )
            .then(async function (response) {
                console.log(response)
                if (response.status == 200) {
                    document.getElementById("edit-apel-loading").classList.add('d-none')
                    document.getElementById("edit-apel-success").classList.remove('d-none')
                    await sleep(1500)
                    document.getElementById("edit-apel-success").classList.add('d-none')
                    window.location.reload()
                } else {
                    console.log("udah kirim")
                    document.getElementById("edit-apel-loading").classList.add('d-none')
                    document.getElementById("edit-apel-danger").classList.remove('d-none')
                    await sleep(1500)
                    document.getElementById("edit-apel-danger").classList.add('d-none')
                }
            })
            .catch(async function (error) {
                console.log("error kirim")
                document.getElementById("edit-apel-loading").classList.add('d-none')
                document.getElementById("edit-apel-danger").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("edit-apel-danger").classList.add('d-none')
            });
    } catch (error) {
        console.log("throw an")
        document.getElementById("edit-apel-loading").classList.add('d-none')
        document.getElementById("edit-apel-danger").classList.remove('d-none')
        await sleep(1500)
        document.getElementById("edit-apel-danger").classList.add('d-none')
    }
}

const handleForwardApel = async (event, tingkat, subordinates) => {
    event.preventDefault();
    document.getElementById("forward-apel-loading").classList.remove("d-none")
    const data = new FormData(event.currentTarget);
    var lap_id = []
    try {
        for (let index = 0; index < subordinates.length; index++) {
            if (data.get(`subordinates-apel-${subordinates[index].subordinates_id}`) == null) {
                throw Error
            }
            //console.log(`subordinates-apel-${subordinates[index].subordinates_id}`)
            lap_id.push(data.get(`subordinates-apel-${subordinates[index].subordinates_id}`))
            console.log('habis push')
        }
        console.log({
            jenis_apel: data.get('jenis-apel'),
            subordinates_lap_id: lap_id
        })
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/laporan/apel/forward`,
            {
                jenis_apel: data.get('jenis-apel'),
                subordinates_lap_id: lap_id
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            }
        )
            .then(async function (response) {
                console.log(response)
                if (response.status == 200) {
                    document.getElementById("forward-apel-loading").classList.add('d-none')
                    document.getElementById("forward-apel-success").classList.remove('d-none')
                    await sleep(1500)
                    document.getElementById("forward-apel-success").classList.add('d-none')
                    window.location.reload()
                } else {
                    console.log("udah kirim")
                    document.getElementById("forward-apel-loading").classList.add('d-none')
                    document.getElementById("forward-apel-danger").classList.remove('d-none')
                    await sleep(1500)
                    document.getElementById("forward-apel-danger").classList.add('d-none')
                }
            })
            .catch(async function (error) {
                console.log("error kirim")
                document.getElementById("forward-apel-loading").classList.add('d-none')
                document.getElementById("forward-apel-danger").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("forward-apel-danger").classList.add('d-none')
            });
    } catch (error) {
        console.log("kena throw error")
        document.getElementById("forward-apel-loading").classList.add('d-none')
        document.getElementById("forward-apel-danger").classList.remove('d-none')
        await sleep(1500)
        document.getElementById("forward-apel-danger").classList.add('d-none')
    }

}

const handleLapGiat = async (event, kadets, foto, attachment) => {
    event.preventDefault();
    document.getElementById("lap-giat-loading").classList.remove("d-none")
    const data = new FormData(event.currentTarget);
    var list_attachment = []
    for (let index = 0; index < attachment.length; index++) {
        list_attachment.push(data.get(`attachment-${attachment[index]}`))
    }
    console.log({
        nama_kegiatan: data.get('input-nama-giat'),
        date_kegiatan: data.get('input-date-giat'),
        detail_kegiatan: data.get('input-detail-giat'),
        peserta: kadets,
        foto: foto,
        attachment: list_attachment
    })
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/laporan/giat/create`,
        {
            nama_kegiatan: data.get('input-nama-giat'),
            date_kegiatan: data.get('input-date-giat'),
            detail_kegiatan: data.get('input-detail-giat'),
            peserta: kadets,
            foto: foto,
            attachment: list_attachment
        },
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(async function (response) {
            console.log(response)
            if (response.status == 200) {
                document.getElementById("lap-giat-loading").classList.add('d-none')
                document.getElementById("lap-giat-success").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("lap-giat-success").classList.add('d-none')
                window.location.reload()
            } else {
                console.log("udah kirim")
                document.getElementById("lap-giat-loading").classList.add('d-none')
                document.getElementById("lap-giat-danger").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("lap-giat-danger").classList.add('d-none')
            }
        })
        .catch(async function (error) {
            console.log("error kirim")
            document.getElementById("lap-giat-loading").classList.add('d-none')
            document.getElementById("lap-giat-danger").classList.remove('d-none')
            await sleep(1500)
            document.getElementById("lap-giat-danger").classList.add('d-none')
        });
}

export {
    handleTambahAdmin,
    handleTambahPengasuh,
    handleTambahKadet,
    handleTambahKadetBulk,
    handleTambahJabatan,
    handleTambahDD,
    handleLogin,
    handleLapApel,
    handleEditApel,
    handleForwardApel,
    handleLapGiat
};