import * as React from 'react';
import axios from 'axios';
import { Await, useNavigate } from 'react-router-dom';
import { Sidebar } from '../component/Sidebar';
import { Navbar } from '../component/Navbar';

export const User = () => {
    document.title = 'Profile - Pusat Informasi Resimen Korps Kadet'
    const navigate = useNavigate()

    const keterangan_color = {
        'Hadir': '#0b0bbb',
        'Sakit': '#0bbb0b',
        'Izin': '#bbbb0b',
        'Tanpa Keterangan': '#bb0b0b'
    }

    const status_color = {
        'Aktif': '#888888',
        'Tidak Aktif': '#000000'
    }

    const jk = {
        'L': 'Laki-laki',
        'P': 'Perempuan'
    }

    const [kadet, setKadet] = React.useState({
        kadet_nim: "",
        kadet_nama: "",
        keterangan_nama: "",
        pleton_nama: "",
        kompi_nama: "",
        batalyon_nama: "",
        status_nama: "",
        pangkat_nama: "",
        jenis_kelamin: "",
        pangkat_id: "",
        pleton_id: "",
        foto_isi: `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQACWAJYAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAMgBAREA/8QAHAABAAIDAQEBAAAAAAAAAAAAAAYIBAUHAQMC/9oACAEBAAAAAO/gAAAAAAAAAAAAAAAAAMHlcbknVM4AACHVO0RvbYzEAAMClejDe3UzgABxysYFnOxgACv3AQO8WHAAHIavAWc7GAAMClWkDe3VzQAB5CaoaY3lr5n6AAfGskasXGo/v5TXGS2b+wAHlXeRv3N99oYR+HXLRegA5TVYALU9WABTGHABMbnABHaR+AB7dyRADTVBi4ASi325ADT1RgwBOLX7gAD48Q4XqQ2vc+4/YAAY8Ah+u2Mwn+QAAAAAAAAAAAAAAAAAB//EAD8QAAEDAgIGBgcDDQEAAAAAAAECAwQFBgARBxIhMUFRCCIwYXGhEyBAQnKBkRQYIxA0NkNSYGJ0krLB0dKx/9oACAEBAAE/AP3uqtYp1EhKmVOYzFjp3rdWEj5c8VvpD27BcU1S4UqoqH6zY0g+Ge3yx95WV6T9G2dT+ZOf9uKJ0h7dnOJaqkKVTlH9ZsdQPHLb5YpVYp1bhJmUyYzKjq3LaWFD58vZNIOkGnWJSPTv5PTngRGig7VnmeSRzxdF3Vi7qkqbVpanTn1GgckNjkkcPUte7qxaNSTNpMtTRz67ROaHByUOONH2kGnX3SPTsZMzmQBJik7UHmOaTz9irVWi0KjS6pMVqx4zRcWeeXDxO7F23PNu64ZNWnLJU6rJtGextHBI8PWtG6Jto3FGq0JZBaVk4jPY4jik4o9VjVykRKnDXrx5LSXEHuI3eI3ew9Imsrh2fCpjasjOkZry4pQM8vqR2HR4ri51oTaU4rMwJGbefBCxnl9QfYekqlWtby9upk8Pn1ew6NWv9vuDfqeiZ+uavYekNR1TbHjVFtOaoMkFWXBCxqnzy7Do8UNcGz5lUdTkZ8jJGfFCBln9SfYa1SY1do0ulzE60eU0ptY5Z8fEb8XXbU207hlUmcghbKuovLY4jgoeI9a0bYm3dcUakwkHNxWbjmWxtHFRxR6XGolIiUyGjUjxmktoHcBv8fYVKCQSSABvJxpAsCm6QaKkBaG5zQJiy07cv4TlvScXJa9WtSprgVaItlwHqqyzQ4OaTxHqWzaVYu2ppg0mIt1RPXcIyQ2OajwxYVhUzR/RFIStDkx0Aypa8hrHkOSRhKgoAggg7iPYJUpiFFckyXUNMNJKluLOQSBxJxpQ0ySricdpFBcXHpIJSt5J1VyP9J7uOLE0oVyyZKUNuqlUwn8SG6rZlzSfdOKVctlaUqR9mWI0kkZrhSgA62e7j8xirdHe2Zi1Lp02bAJ9zMOJH12+eD0aT6TZco1O+Jt/uxRujxbcJxLlTnS6gR7mxpB8ctvnisXTZujGkfZk/ZoxSPw4MUD0iz3gf+nF96UK3e0lSHHVRaaD+HDaVsy5qPvHGi/TJKt1xqkV5xcikkhKHlHWXH/2nu4YiymJsVuTGdQ6w6kKQ4g5hQPEHtlKCQSSABtJONMek9y46i5QqU8RSI6tVxaD+cLHH4Rw+v5WXnY7qXWXFtuJOaVIUQQe4jFI0wXvRm0ttVhchpO5EpAd8zt88feFvLU1fRU3P9r0B/6xV9MF71ltTbtYXHaVvRFQGvMbfPDzzsh1Trzi3HFHNSlqJJPeT+XQ5pPctyot0KqvE0iQrVbWs/m6zx+E8frhKgoAggg7QR2unK91W5bKaTCd1J9SBSVJO1tr3j8931xv7LdjQbeyrjtlVJmu68+mgJBUdrjXun5bvp2hOQzONKNyKue/qjMCyqO0sx4/LURs8zmfn2mi65FWxf1OmFerHdWI8gcChezyOR+WAcxmOzvutC37Hq9S1sltRlBv41dVPmRhSiokk5k7Se0SopIIORG0HFiVoXBY9IqWtmt2OkOfGnqq8x2d021Cuy35NHn6/oXgMlIORSobQR4HF7WPVLIrCoU9BWyokx5KR1HU/wCDzHaWTY9UvesphQEFDKCDIkqHUaT/AJPIYta2oVp2/Go8DXLLIOalnMqUdpJ8T2ly2zS7ro7tMqscOsr2pV7zauCkngcX/oyq9jzFLcQqTS1K/CmITs8Fcj2VgaM6vfExKm0KjUxCvxpi07PBP7RxbVs0u1KO1TKUwGmUbVK95xXFSjxPbSokedGcjSmW3mHBqrbcTrJUO8Yvfo/MSVOTbUeSw4cyYTx6h+FXDwOK3bNZtyUY9Xpz8RYOQLiOqrwVuPrUS2qzccoR6RTpEtwnIltHVT4ncMWT0fmY6m511vpeWMlCEyeoPiVx8BiJEjwYrcaKy2yw2NVDbackpHcPYZkGJUY6o8yMzIZVvQ6gKB+RxWdB9lVZSltwnYDh4xHNUf0nMYmdGuIpRMK4nkDgHo4V5gjH3apmt+kjGX8sf+sQ+jXESoGbcT6xxDMcJ8yTijaD7KpKkuOQXJ7g96W4VD+kZDEODEp0dMeHGZjsp3IaQEgfIfvd/9k=`
    })

    const [akun, setAkun] = React.useState({
        username: '',
        role_id: ''
    })

    const roles = {
        1: 'Admin',
        2: 'Kadet',
        3: 'Pengasuh'
    }

    const [atribut, setAtribut] = React.useState({
        pangkat: {}, pleton: {}
    })

    const [foto, setFoto] = React.useState({
        url: `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQACWAJYAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wgALCADIAMgBAREA/8QAHAABAAIDAQEBAAAAAAAAAAAAAAYIBAUHAQMC/9oACAEBAAAAAO/gAAAAAAAAAAAAAAAAAMHlcbknVM4AACHVO0RvbYzEAAMClejDe3UzgABxysYFnOxgACv3AQO8WHAAHIavAWc7GAAMClWkDe3VzQAB5CaoaY3lr5n6AAfGskasXGo/v5TXGS2b+wAHlXeRv3N99oYR+HXLRegA5TVYALU9WABTGHABMbnABHaR+AB7dyRADTVBi4ASi325ADT1RgwBOLX7gAD48Q4XqQ2vc+4/YAAY8Ah+u2Mwn+QAAAAAAAAAAAAAAAAAB//EAD8QAAEDAgIGBgcDDQEAAAAAAAECAwQFBgARBxIhMUFRCCIwYXGhEyBAQnKBkRQYIxA0NkNSYGJ0krLB0dKx/9oACAEBAAE/AP3uqtYp1EhKmVOYzFjp3rdWEj5c8VvpD27BcU1S4UqoqH6zY0g+Ge3yx95WV6T9G2dT+ZOf9uKJ0h7dnOJaqkKVTlH9ZsdQPHLb5YpVYp1bhJmUyYzKjq3LaWFD58vZNIOkGnWJSPTv5PTngRGig7VnmeSRzxdF3Vi7qkqbVpanTn1GgckNjkkcPUte7qxaNSTNpMtTRz67ROaHByUOONH2kGnX3SPTsZMzmQBJik7UHmOaTz9irVWi0KjS6pMVqx4zRcWeeXDxO7F23PNu64ZNWnLJU6rJtGextHBI8PWtG6Jto3FGq0JZBaVk4jPY4jik4o9VjVykRKnDXrx5LSXEHuI3eI3ew9Imsrh2fCpjasjOkZry4pQM8vqR2HR4ri51oTaU4rMwJGbefBCxnl9QfYekqlWtby9upk8Pn1ew6NWv9vuDfqeiZ+uavYekNR1TbHjVFtOaoMkFWXBCxqnzy7Do8UNcGz5lUdTkZ8jJGfFCBln9SfYa1SY1do0ulzE60eU0ptY5Z8fEb8XXbU207hlUmcghbKuovLY4jgoeI9a0bYm3dcUakwkHNxWbjmWxtHFRxR6XGolIiUyGjUjxmktoHcBv8fYVKCQSSABvJxpAsCm6QaKkBaG5zQJiy07cv4TlvScXJa9WtSprgVaItlwHqqyzQ4OaTxHqWzaVYu2ppg0mIt1RPXcIyQ2OajwxYVhUzR/RFIStDkx0Aypa8hrHkOSRhKgoAggg7iPYJUpiFFckyXUNMNJKluLOQSBxJxpQ0ySricdpFBcXHpIJSt5J1VyP9J7uOLE0oVyyZKUNuqlUwn8SG6rZlzSfdOKVctlaUqR9mWI0kkZrhSgA62e7j8xirdHe2Zi1Lp02bAJ9zMOJH12+eD0aT6TZco1O+Jt/uxRujxbcJxLlTnS6gR7mxpB8ctvnisXTZujGkfZk/ZoxSPw4MUD0iz3gf+nF96UK3e0lSHHVRaaD+HDaVsy5qPvHGi/TJKt1xqkV5xcikkhKHlHWXH/2nu4YiymJsVuTGdQ6w6kKQ4g5hQPEHtlKCQSSABtJONMek9y46i5QqU8RSI6tVxaD+cLHH4Rw+v5WXnY7qXWXFtuJOaVIUQQe4jFI0wXvRm0ttVhchpO5EpAd8zt88feFvLU1fRU3P9r0B/6xV9MF71ltTbtYXHaVvRFQGvMbfPDzzsh1Trzi3HFHNSlqJJPeT+XQ5pPctyot0KqvE0iQrVbWs/m6zx+E8frhKgoAggg7QR2unK91W5bKaTCd1J9SBSVJO1tr3j8931xv7LdjQbeyrjtlVJmu68+mgJBUdrjXun5bvp2hOQzONKNyKue/qjMCyqO0sx4/LURs8zmfn2mi65FWxf1OmFerHdWI8gcChezyOR+WAcxmOzvutC37Hq9S1sltRlBv41dVPmRhSiokk5k7Se0SopIIORG0HFiVoXBY9IqWtmt2OkOfGnqq8x2d021Cuy35NHn6/oXgMlIORSobQR4HF7WPVLIrCoU9BWyokx5KR1HU/wCDzHaWTY9UvesphQEFDKCDIkqHUaT/AJPIYta2oVp2/Go8DXLLIOalnMqUdpJ8T2ly2zS7ro7tMqscOsr2pV7zauCkngcX/oyq9jzFLcQqTS1K/CmITs8Fcj2VgaM6vfExKm0KjUxCvxpi07PBP7RxbVs0u1KO1TKUwGmUbVK95xXFSjxPbSokedGcjSmW3mHBqrbcTrJUO8Yvfo/MSVOTbUeSw4cyYTx6h+FXDwOK3bNZtyUY9Xpz8RYOQLiOqrwVuPrUS2qzccoR6RTpEtwnIltHVT4ncMWT0fmY6m511vpeWMlCEyeoPiVx8BiJEjwYrcaKy2yw2NVDbackpHcPYZkGJUY6o8yMzIZVvQ6gKB+RxWdB9lVZSltwnYDh4xHNUf0nMYmdGuIpRMK4nkDgHo4V5gjH3apmt+kjGX8sf+sQ+jXESoGbcT6xxDMcJ8yTijaD7KpKkuOQXJ7g96W4VD+kZDEODEp0dMeHGZjsp3IaQEgfIfvd/9k=`
    })

    const handleEditKadet = async (event) => {
        event.preventDefault();
        document.getElementById("edit-kadet-loading").classList.remove('d-none')
        const data = new FormData(event.currentTarget);
        const fotoUrl = foto.url
        console.log({
            nama: data.get('input-nama'),
            nim: data.get('input-nim'),
            pangkat: data.get('input-pangkat'),
            pleton: data.get('input-pleton'),
            fotoUrl: fotoUrl
        })
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
                    fotoUrl: fotoUrl
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

    React.useEffect(() => {
        function verifikasi() {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/verify`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            )
                .then(function (response) {
                    if (response.status == 200) {
                        setAkun({
                            username: response.data.username,
                            role: roles[response.data.role_id]
                        })
                        if (response.data.role_id != 1) {
                            document.getElementById("btn-kelolaAkun").classList.add('d-none')

                            document.getElementById("nav-btn-kelolaAkun").classList.add('d-none')
                        }
                        if (response.data.role_id != 2) {
                            document.getElementById('data-diri').classList.add('d-none')
                        }
                        document.getElementById('isi-navbar-username').innerHTML = response.data.username
                        document.getElementById('isi-sidebar-username').innerHTML = response.data.username
                    } else {
                        navigate('/forbidden')
                    }
                })
                .catch(function (error) {
                    navigate('/forbidden')
                });
        }
        function myKadet() {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/mykadet`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            )
                .then(function (response) {
                    if (response.status == 200) {
                        setKadet(response.data)
                        setFoto({ url: response.data.foto_isi })
                        document.getElementById('input-pangkat').value = response.data.pangkat_id
                        document.getElementById('input-pleton').value = response.data.pleton_id
                        document.getElementById('input-jk').value = response.data.jenis_kelamin
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
        function getAttribut() {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/atribut`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                    }
                }
            )
                .then(function (response) {
                    if (response.status == 200) {
                        setAtribut(response.data)
                        var stringPleton = ``
                        for (let index = 0; index < response.data.pleton.length; index++) {
                            stringPleton += `<option value=${response.data.pleton[index].pleton_id}>${response.data.pleton[index].pleton_nama} ${response.data.pleton[index].kompi_nama} ${response.data.pleton[index].batalyon_nama}</option>`
                        }
                        document.getElementById('input-pleton').innerHTML = stringPleton
                        var stringPangkat = ``
                        for (let index = 0; index < response.data.pangkat.length; index++) {
                            stringPangkat += `<option value=${response.data.pangkat[index].pangkat_id}>${response.data.pangkat[index].pangkat_nama}</option>`
                        }
                        document.getElementById('input-pangkat').innerHTML = stringPangkat
                    } else {

                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
        verifikasi()
        myKadet()
        getAttribut()
        document.getElementById('btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('btn-jabatan').classList.remove('sidebar-active')
        document.getElementById('btn-kelolaAkun').classList.remove('sidebar-active')
        document.getElementById('btn-dataKadet').classList.remove('sidebar-active')
        document.getElementById('sidebar-username').classList.remove('btn-dark')
        document.getElementById('sidebar-username').classList.add('btn-secondary')

        document.getElementById('nav-btn-dashboard').classList.remove('sidebar-active')
        document.getElementById('nav-btn-jabatan').classList.remove('sidebar-active')
        document.getElementById('nav-btn-kelolaAkun').classList.remove('sidebar-active')
        document.getElementById('nav-btn-dataKadet').classList.remove('sidebar-active')
        document.getElementById('navbar-username').classList.remove('btn-dark')
        document.getElementById('navbar-username').classList.add('btn-secondary')

    }, [])

    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    const handleChangeFoto = (e) => {
        let selectedFile = e.target.files[0]
        console.log(selectedFile.size)
        if (selectedFile) {
            if (selectedFile) {
                let reader = new FileReader()
                reader.readAsDataURL(selectedFile)
                reader.onload = (e) => {
                    setFoto({
                        url: e.target.result,
                        file: selectedFile
                    })
                }
            }
            else {
                setFoto(null)
            }
        }
        else {
            console.log("Select File")
        }
    }

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

    return (
        <div className='bg-dark bg-gradient' style={{ minHeight: "100vh" }}>
            <Navbar />
            <div className='d-flex'>
                <Sidebar />
                <div className='w-100'>
                    <div className='fs-1 fw-medium text-light font-poppins p-1 pt-md-3 ps-3'>
                        <span>Profile</span>
                    </div>
                    <div className='p-2 p-md-3 d-flex flex-wrap font-nunito'>
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 rounded-3 d-flex flex-wrap'>
                            <div className='card rounded-4 bg-dark shadow-lg text-light w-100 col-12'>
                                <h4 className='card-header d-flex border-bottom'>Akun
                                    <i class="fs-2 ms-auto bi bi-person-circle"></i>
                                </h4>
                                <div className='card-body p-2 p-lg-3'>
                                    <div className='d-flex my-2'>
                                        <strong className='col'>Username</strong>
                                        <h4 className='col fw-bold' id='username'>{akun.username}</h4>
                                    </div>
                                    <div className='d-flex mb-2'>
                                        <strong className='col'>Role</strong>
                                        <h4 className='col fw-bold' id='role'>{akun.role}</h4>
                                    </div>
                                    <div className='d-flex mb-2'>
                                        <strong className='col'>Password</strong>
                                        <span className='col'>******** <button className='p-1 px-2 btn btn-secondary' data-bs-toggle="modal" data-bs-target="#staticBackdropPassword"><small>Change Password</small></button></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 rounded-3 d-flex flex-wrap'>
                            <div className='card rounded-4 bg-dark shadow-lg text-light w-100 col-12'>
                                <h4 className='card-header d-flex border-bottom'>...
                                    <i class="fs-2 ms-auto bi bi-person-fill-add"></i>
                                </h4>
                                <div className='card-body p-2'>

                                </div>
                            </div>
                        </div>
                        <div className='p-1 p-lg-2 pb-3 col-12 d-flex flex-wrap' id='data-diri'>
                            <div className='card rounded-4 bg-dark shadow-lg w-100 text-light'>
                                <h4 className='card-header d-flex border-bottom'>Data Diri
                                    <i class="fs-2 bi bi-person-vcard-fill ms-auto"></i>
                                </h4>
                                <div className='card-body row align-item-center px-4'>
                                    <div className='d-flex flex-wrap'>
                                        <div className='col-12 col-lg-3'>
                                            <div className='p-1 '>
                                                <img src={kadet.foto_isi} className="rounded-4 w-100" />
                                            </div>
                                        </div>
                                        <div className='col-12 col-lg-9 px-1 px-lg-3'>
                                            <table className='fs-4 w-100 table table-dark'>
                                                <tbody>
                                                    <tr>
                                                        <th className='align-top'>Nama</th>
                                                        <td className='ps-3'>{kadet.kadet_nama}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-top'>NIM</th>
                                                        <td className='ps-3'>{kadet.kadet_nim}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-top'>Jenis Kelamin</th>
                                                        <td className='ps-3'>{jk[kadet.jenis_kelamin]}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-top'>Pangkat</th>
                                                        <td className='ps-3'>{kadet.pangkat_nama}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-top'>Pleton</th>
                                                        <td className='ps-3'>{kadet.pleton_nama} {kadet.kompi_nama} {kadet.batalyon_nama}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-top'>Status</th>
                                                        <td className='ps-3'>
                                                            <span className="rounded-2 px-2 text-white p-0" style={{ backgroundColor: status_color[kadet.status_nama] }}>{kadet.status_nama}</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className='align-top'>Keterangan</th>
                                                        <td className='ps-3'>
                                                            <span className='rounded-2 px-2 text-white p-0' style={{ backgroundColor: keterangan_color[kadet.keterangan_nama] }}>{kadet.keterangan_nama}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <button className='card-footer btn btn-dark rounded-bottom-4 border-none border-top text-end p-1' data-bs-toggle="modal" data-bs-target="#staticBackdropKadet"><small>Edit Data Diri<i class="ms-2 bi bi-box-arrow-up-right"></i></small></button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="modal fade" id="staticBackdropPassword" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content bg-dark text-white">
                        <form onSubmit={handleChangePassword}>
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Change Password</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body px-lg-4">
                                <div className='py-1'>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label">Old Password<span className="text-danger">*</span></label>
                                        <input type="password" class="form-control" id="input-oldpassword" name='input-oldpassword' placeholder="old password" />
                                    </div>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label">New Password<span className="text-danger">*</span></label>
                                        <input type="password" class="form-control" id="input-newpassword" name='input-newpassword' placeholder="new password" />
                                        <small>(min 8 char, must include Uppercase & Number/Symbol)</small>
                                    </div>
                                    <div class="mb-2">
                                        <label for="exampleFormControlInput1" class="form-label">Confirm New Password<span className="text-danger">*</span></label>
                                        <input type="password" class="form-control" id="input-confirmnewpassword" name='input-confirmnewpassword' placeholder="confirm new password" />
                                    </div>
                                    <div className='text-center d-none' id='change-password-loading'>
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    <div class="alert p-2 bg-danger d-none" id='change-password-danger' role="alert">
                                        <strong>Gagal menyimpan!</strong>
                                        <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                    </div>
                                    <div class="alert p-2 bg-success d-none" id='change-password-success' role="alert">
                                        <strong>Berhasil menyimpan!</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                                <button type="submit" class="btn btn-primary px-4">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="staticBackdropKadet" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content bg-dark text-white">
                        <form onSubmit={handleEditKadet}>
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Data Diri</h1>
                                <button type="button" onClick={() => {
                                    setFoto({ url: kadet.foto_isi })
                                    document.getElementById('input-pangkat').value = kadet.pangkat_id
                                    document.getElementById('input-pleton').value = kadet.pleton_id
                                    document.getElementById('input-jk').value = kadet.jenis_kelamin
                                    document.getElementById('input-nama').value = document.getElementById('input-nama').defaultValue
                                    document.getElementById('input-nim').value = document.getElementById('input-nim').defaultValue
                                }} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body px-lg-4">
                                <div className='py-1'>
                                    <div className='row'>
                                        <div className='col-12 col-lg-4'>
                                            <div className='p-1 px-5 p-lg-3'>
                                                <img src={foto.url} className="rounded-4 w-100" />
                                            </div>
                                            <div class="mb-2">
                                                <label for="exampleFormControlInput1" class="form-label">Pilih Foto</label>
                                                <input onChange={handleChangeFoto} type="file" accept="image/*" id="foto" name='foto' class="form-control" />
                                            </div>
                                        </div>
                                        <div className='col-12 col-lg-8'>
                                            <div class="mb-2">
                                                <label for="exampleFormControlInput1" class="form-label">Nama Lengkap<span className="text-danger">*</span></label>
                                                <input type="text" class="form-control" id="input-nama" name='input-nama' placeholder="nama lengkap" defaultValue={kadet.kadet_nama} />
                                            </div>
                                            <div class="mb-2">
                                                <label for="exampleFormControlInput1" class="form-label">NIM<span className="text-danger">*</span></label>
                                                <input type="number" class="form-control" id="input-nim" name='input-nim' placeholder="nim" defaultValue={kadet.kadet_nim} />
                                            </div>
                                            <div class="mb-2">
                                                <label for="exampleFormControlInput1" class="form-label">Jenis Kelamin<span className="text-danger">*</span></label>
                                                <select class="form-select" aria-label="Default select example" id="input-jk" name='input-jk'>
                                                    <option value='L'>Laki-laki</option>
                                                    <option value='P'>Perempuan</option>
                                                </select>
                                            </div>
                                            <div class="mb-2">
                                                <label for="exampleFormControlInput1" class="form-label">Pangkat<span className="text-danger">*</span></label>
                                                <select class="form-select" aria-label="Default select example" id="input-pangkat" name='input-pangkat'></select>
                                            </div>
                                            <div class="mb-2">
                                                <label for="exampleFormControlInput1" class="form-label">Pleton<span className="text-danger">*</span></label>
                                                <select class="form-select" aria-label="Default select example" id="input-pleton" name='input-pleton'></select>
                                            </div>
                                            <div className='text-center d-none' id='edit-kadet-loading'>
                                                <div class="spinner-border" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                            <div class="alert p-2 bg-danger d-none" id='edit-kadet-danger' role="alert">
                                                <strong>Gagal menyimpan!</strong>
                                                <span className='ps-2' id='login-danger-message'>periksa kembali data yang dimasukkan</span>
                                            </div>
                                            <div class="alert p-2 bg-success d-none" id='edit-kadet-success' role="alert">
                                                <strong>Berhasil menyimpan!</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" onClick={() => {
                                    setFoto({ url: kadet.foto_isi })
                                    document.getElementById('input-pangkat').value = kadet.pangkat_id
                                    document.getElementById('input-pleton').value = kadet.pleton_id
                                    document.getElementById('input-jk').value = kadet.jenis_kelamin
                                    document.getElementById('input-nama').value = document.getElementById('input-nama').defaultValue
                                    document.getElementById('input-nim').value = document.getElementById('input-nim').defaultValue
                                }} class="btn btn-danger" data-bs-dismiss="modal">Discard</button>
                                <button type="submit" class="btn btn-primary px-4">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}