import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    document.title = 'Login - Pusat Informasi Resimen Korps Kadet'
    const navigate = useNavigate()
    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    const handleSubmit = async (event) => {
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
                navigate('/')
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

    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    return (
        <div className="text-center bg-dark bg-gradient d-flex p-3 p-md-5 font-poppins" style={{ minHeight: '100vh' }}>
            <div className='bg-dark shadow-lg text-light d-flex flex-wrap w-100 rounded-5 m-md-4'>
                <div className='col-12 col-lg-6 d-flex align-items-center py-4'>
                    <div className='w-100'>
                        <img src='MENKOR_FIXX.png' height='150px' /><br />
                        <span class="ps-2 font-poppins">
                            <span className="fw-semibold fs-1">Resimen Korps Kadet</span><br />
                            <span className='fs-3'>Pusat Informasi</span>
                        </span>
                    </div>
                </div>
                <div className='col-12 col-lg-6 p-3 p-md-5 d-flex align-items-center'>
                    <div className='w-100 bg-gradient p-3 p-md-5 rounded-4'>
                        <h1>Login</h1>
                        <form onSubmit={handleSubmit} className='text-start px-md-5'>
                            <div class="my-4">
                                <label for="exampleFormControlInput1" class="form-label">Username</label>
                                <input type="text" class="form-control" id="input-username" name='input-username' placeholder="username" />
                            </div>
                            <div class="my-4">
                                <label for="exampleFormControlInput1" class="form-label">Password</label>
                                <input type="password" class="form-control" id="input-password" name='input-password' placeholder="password" />
                            </div>
                            <div class="my-4">
                                <button type="submit" class="form-control btn btn-dark sidebar-link sidebar-active fs-5">Login</button>
                            </div>
                            <div className='text-center d-none' id='login-loading'>
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div class="alert p-2 bg-danger d-none" id='login-danger' role="alert">
                                <strong>Login gagal!</strong>
                                <span className='ps-2' id='login-danger-message'>message</span>
                            </div>
                            <div class="alert p-2 bg-success d-none" id='login-success' role="alert">
                                <strong>Login berhasil!</strong>
                                <span className='ps-2'>mengalihkan . . . </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}