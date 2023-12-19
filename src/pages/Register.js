import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate()


    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    return (
        <div className="text-center bg-dark bg-gradient d-flex p-3 font-poppins" >
            <div className='bg-dark shadow-lg text-light d-flex flex-wrap w-100 rounded-5 m-md-4'>
                <div className='col-12 col-md-4 d-flex align-items-center py-4'>
                    <div className='w-100'>
                        <img src='MENKOR_FIXX.png' height='150px' /><br />
                        <span class="ps-2 font-poppins">
                            <span className="fw-semibold fs-1">Resimen Korps Kadet</span><br />
                            <span className='fs-3'>Pusat Informasi</span>
                        </span>
                    </div>
                </div>
                <div className='col-12 col-md-8 p-3 p-md-5 d-flex align-items-center'>
                    <div className='w-100 bg-gradient p-3 p-md-4 rounded-4'>
                        <h1>Register</h1>
                        <form className='text-start d-flex flex-wrap'>
                            <div className='col-12 col-md-6 px-3'>
                                <div class="my-3">
                                    <label for="exampleFormControlInput1" class="form-label">Username</label>
                                    <input type="text" class="form-control" id="input-username" name='input-username' placeholder="username" />
                                </div>
                                <div class="my-3">
                                    <label for="exampleFormControlInput1" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="input-password" name='input-password' placeholder="password" />
                                </div>
                                <div class="my-3">
                                    <label for="exampleFormControlInput1" class="form-label">Confirm Password</label>
                                    <input type="password" class="form-control" id="input-password" name='input-password' placeholder="password" />
                                </div>
                            </div>
                            <div className='col-12 col-md-6 px-3'>
                                <div class="my-3">
                                    <label for="exampleFormControlInput1" class="form-label">NIM</label>
                                    <input type="number" class="form-control" id="input-nim" name='input-nim' placeholder="nim" />
                                </div>
                                <div class="my-3">
                                    <label for="exampleFormControlInput1" class="form-label">NIM</label>
                                    <input type="file" accept='image/*' class="form-control" id="input-nim" name='input-nim' placeholder="nim" />
                                </div>
                            </div>
                            <div class="col-12 my-3 px-3">
                                <button type="submit" class="form-control btn btn-dark sidebar-link sidebar-active fs-5" id="input-username" name='input-username'>Register</button>
                            </div>
                            <div class="col-12 my-3 text-center">
                                <span>Sudah punya akun? <a className='text-decoration-none color-menkor' href='/login'>Masuk disini.</a></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}