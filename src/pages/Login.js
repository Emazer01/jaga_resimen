import * as React from 'react';
import { handleLogin } from '../function/Post';

export const Login = () => {
    document.title = 'Login - Pusat Informasi Resimen Korps Kadet'

    return (
        <div className="text-center d-flex p-3 p-md-5 font-poppins" style={{ minHeight: '100vh', backgroundColor:'#f0f0f0' }}>
            <div className='bg-light shadow-lg d-flex flex-wrap w-100 rounded-2 m-md-4'>
                <div className='col-12 col-lg-6 d-flex align-items-center py-4'>
                    <div className='w-100'>
                        <img src='MENKOR_FIXX.png' height='150px' /><br />
                        <span className="ps-2 font-poppins">
                            <span className="fw-semibold fs-1">Resimen Korps Kadet</span><br />
                            <span className='fs-3'>Pusat Informasi</span>
                        </span>
                    </div>
                </div>
                <div className='col-12 col-lg-6 p-3 p-md-5 d-flex align-items-center'>
                    <div className='w-100 p-3 p-md-5 rounded-2 shadow' style={{backgroundColor:'#f0f0f0'}}>
                        <h1>Login</h1>
                        <form onSubmit={handleLogin} className='text-start px-md-5'>
                            <div className="my-4">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
                                <input type="text" className="form-control" id="input-username" name='input-username' placeholder="username" />
                            </div>
                            <div className="my-4">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="input-password" name='input-password' placeholder="password" />
                            </div>
                            <div className="my-4">
                                <button type="submit" className="form-control btn btn-dark fs-5">Login</button>
                            </div>
                            <div className='text-center d-none' id='login-loading'>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div className="alert p-2 bg-danger d-none text-light" id='login-danger' role="alert">
                                <strong>Login gagal!</strong>
                                <span className='ps-2' id='login-danger-message'>message</span>
                            </div>
                            <div className="alert p-2 bg-success d-none text-light" id='login-success' role="alert">
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