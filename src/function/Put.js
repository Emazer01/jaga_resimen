import { sleep } from "./Minor";
import axios from 'axios';

const handleChangePassword = async (event) => {
    event.preventDefault();
    document.getElementById("change-password-loading").classList.remove('d-none')
    const data = new FormData(event.currentTarget);
    if (data.get('input-newpassword') != data.get('input-confirmnewpassword') || data.get('input-newpassword') == data.get('input-oldpassword')) {
        console.log("blm kirim")
        document.getElementById("change-password-loading").classList.add('d-none')
        document.getElementById("change-password-danger").classList.remove('d-none')
        await sleep(1500)
        document.getElementById("change-password-danger").classList.add('d-none')
    } else {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/changePassword`,
            {
                oldPassword: data.get('input-oldpassword'),
                newPassword: data.get('input-newpassword'),
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            }
        )
            .then(async function (response) {
                if (response.status == 200) {
                    document.getElementById("change-password-loading").classList.add('d-none')
                    document.getElementById("change-password-success").classList.remove('d-none')
                    await sleep(1500)
                    document.getElementById("change-password-success").classList.add('d-none')
                    window.location.reload()
                } else {
                    console.log("udah kirim")
                    document.getElementById("change-password-loading").classList.add('d-none')
                    document.getElementById("change-password-danger").classList.remove('d-none')
                    await sleep(1500)
                    document.getElementById("change-password-danger").classList.add('d-none')
                }
            })
            .catch(async function (error) {
                console.log("error kirim")
                document.getElementById("change-password-loading").classList.add('d-none')
                document.getElementById("change-password-danger").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("change-password-danger").classList.add('d-none')
            });
    }
}

const handleEditKadet = async (event, foto) => {
    event.preventDefault();
    document.getElementById("edit-kadet-loading").classList.remove('d-none')
    const data = new FormData(event.currentTarget);
    const fotoUrl = foto.url
    if (data.get('input-nama') == "" || data.get('input-nim') == "" || data.get('input-pangkat') == "" || data.get('input-pleton') == "") {
        console.log("blm kirim")
        document.getElementById("edit-kadet-loading").classList.add('d-none')
        document.getElementById("edit-kadet-danger").classList.remove('d-none')
        await sleep(1500)
        document.getElementById("edit-kadet-danger").classList.add('d-none')
    } else {
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/editKadet`,
            {
                nama: data.get('input-nama'),
                nim: data.get('input-nim'),
                jk: data.get('input-jk'),
                pangkat: data.get('input-pangkat'),
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
                console.log("asdasd")
                if (response.status == 200) {
                    document.getElementById("edit-kadet-loading").classList.add('d-none')
                    document.getElementById("edit-kadet-success").classList.remove('d-none')
                    await sleep(1500)
                    document.getElementById("edit-kadet-success").classList.add('d-none')
                    window.location.reload()
                } else {
                    console.log("udah kirim")
                    document.getElementById("edit-kadet-loading").classList.add('d-none')
                    document.getElementById("edit-kadet-danger").classList.remove('d-none')
                    await sleep(1500)
                    document.getElementById("edit-kadet-danger").classList.add('d-none')
                }
            })
            .catch(async function (error) {
                console.log("error kirim")
                document.getElementById("edit-kadet-loading").classList.add('d-none')
                document.getElementById("edit-kadet-danger").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("edit-kadet-danger").classList.add('d-none')
            });
    }
}

const handleAssignJabatan = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/jabatans/assign`,
        {
            tingkat: document.getElementById('input-assign-tingkat').value,
            jabatan_id: document.getElementById('input-assign-jabatan').value,
            kadet_id: data.get('input-assign-pejabat')
        },
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(async function (response) {
            if (response.status == 200) {
                document.getElementById("assign-jabatan-loading").classList.add('d-none')
                document.getElementById("assign-jabatan-success").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("assign-jabatan-success").classList.add('d-none')
                window.location.reload()
            } else {
                console.log("udah kirim")
                document.getElementById("assign-jabatan-loading").classList.add('d-none')
                document.getElementById("assign-jabatan-danger").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("assign-jabatan-danger").classList.add('d-none')
            }
        })
        .catch(async function (error) {
            console.log("error kirim")
            document.getElementById("assign-jabatan-loading").classList.add('d-none')
            document.getElementById("assign-jabatan-danger").classList.remove('d-none')
            await sleep(1500)
            document.getElementById("assign-jabatan-danger").classList.add('d-none')
        });
}

const handleAssignDinas = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/dds/assign`,
        {
            tingkat: document.getElementById('input-assign-tingkat').value,
            dinas_id: document.getElementById('input-assign-jabatan').value,
            kadet_id: data.get('input-assign-pejabat')
        },
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(async function (response) {
            if (response.status == 200) {
                document.getElementById("assign-jabatan-loading").classList.add('d-none')
                document.getElementById("assign-jabatan-success").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("assign-jabatan-success").classList.add('d-none')
                window.location.reload()
            } else {
                console.log("udah kirim")
                document.getElementById("assign-jabatan-loading").classList.add('d-none')
                document.getElementById("assign-jabatan-danger").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("assign-jabatan-danger").classList.add('d-none')
            }
        })
        .catch(async function (error) {
            console.log("error kirim")
            document.getElementById("assign-jabatan-loading").classList.add('d-none')
            document.getElementById("assign-jabatan-danger").classList.remove('d-none')
            await sleep(1500)
            document.getElementById("assign-jabatan-danger").classList.add('d-none')
        });
}

const handleApproveGiat = async (giat_id) => {
    console.log(giat_id)
    document.getElementById("edit-approve-loading").classList.remove('d-none')
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/approveGiat`,
        {
            giat_id: giat_id
        },
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(async function (response) {
            if (response.status == 200) {
                document.getElementById("edit-approve-loading").classList.add('d-none')
                document.getElementById("edit-approve-success").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("edit-approve-success").classList.add('d-none')
                //window.location.reload()
            } else {
                console.log("udah kirim")
                document.getElementById("edit-approve-loading").classList.add('d-none')
                document.getElementById("edit-approve-danger").classList.remove('d-none')
                await sleep(1500)
                document.getElementById("edit-approve-danger").classList.add('d-none')
            }
        })
        .catch(async function (error) {
            console.log("error kirim")
            document.getElementById("edit-approve-loading").classList.add('d-none')
            document.getElementById("edit-approve-danger").classList.remove('d-none')
            await sleep(1500)
            document.getElementById("edit-approve-danger").classList.add('d-none')
        });
}


export {
    handleChangePassword,
    handleEditKadet,
    handleAssignJabatan,
    handleAssignDinas,
    handleApproveGiat
};