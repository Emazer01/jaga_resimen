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
    //window.location.reload()
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
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/dataApel`,
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

const handleForwardApel = async (event, tingkat, subordinates) => {
    event.preventDefault();
    document.getElementById("forward-apel-loading").classList.remove("d-none")
    const data = new FormData(event.currentTarget);
    var lap_id = []
    for (let index = 0; index < subordinates.length; index++) {
        //console.log(`subordinates-apel-${subordinates[index].subordinates_id}`)
        lap_id.push(data.get(`subordinates-apel-${subordinates[index].subordinates_id}`))
    }
    console.log({
        jenis_apel: data.get('jenis-apel'),
        subordinates_lap_id: lap_id
    })
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/lapApel`,
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
    handleForwardApel
};