import axios from 'axios';
import * as React from 'react';

const roles = {
    1: 'Admin',
    2: 'Kadet',
    3: 'Pengasuh'
}

var akun = {}

const verifikasi = async() => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/verify`,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(function (response) {
            if (response.status == 200) {
                akun = {
                    username: response.data.username,
                    role: roles[response.data.role_id]
                }
                if (response.data.role_id != 1) {
                    document.getElementById("btn-kelolaAkun").classList.add('d-none')
                    document.getElementById("btn-jabatan").classList.add('d-none')

                    document.getElementById("nav-btn-kelolaAkun").classList.add('d-none')
                    document.getElementById("nav-btn-jabatan").classList.add('d-none')
                }
                document.getElementById('isi-navbar-username').innerHTML = response.data.username
                document.getElementById('isi-sidebar-username').innerHTML = response.data.username
            } else {
                window.location.href = '/forbidden'
            }
        })
        .catch(function (error) {
            window.location.href = '/forbidden'
        });
    return (akun)
}

export {
    verifikasi
};