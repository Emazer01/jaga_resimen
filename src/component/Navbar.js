
export const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg bg-dark d-block d-md-none font-poppins">
            <div class="container-fluid">
                <a class="navbar-brand text-white d-flex align-items-center" href="#">
                    <img src="MENKOR_FIXX.png" alt="Logo" width="40" height="40" class="d-inline-block align-text-top" />
                    <span className="mx-2">
                        <span className="fw-semibold fs-5">Resimen Korps Kadet</span><br />
                        <span className="fs-6">Pusat Informasi</span>
                    </span>

                </a>
                <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse p-1" id="navbarSupportedContent">
                    <ul class="nav nav-pills flex-column mb-auto p-2">
                        <li className='my-1'>
                            <a href="/" id='btn-beranda' class="sidebar-link p-2 rounded-2 text-decoration-none font-poppins sidebar-active text-white row">
                                <i class="bi bi-house-door-fill col-2 p-0 text-center fs-4" />
                                <span className='px-1 col-10 p-2'>Dashboard</span>
                            </a>
                        </li>
                        <li className='my-1'>
                            <a href="/perubahan" id='btn-perubahan' class="sidebar-link p-2 rounded-2 text-decoration-none font-poppins  text-white row">
                                <i class="bi bi-pencil-fill col-2 p-0 text-center fs-4" />
                                <span className='px-1 col-10 p-2'>Perubahan</span>
                            </a>
                        </li>
                        <li className='my-1'>
                            <a href="/tambah" id='btn-tambah' class="sidebar-link p-2 rounded-2 text-decoration-none font-poppins text-white row">
                                <i class="bi bi-file-earmark-plus-fill col-2 p-0 text-center fs-4" />
                                <span className='px-1 col-10 p-2'>Tambah</span>
                            </a>
                        </li>
                        <li className='my-1'>
                            <a href="/cetak" id='btn-cetak' class="sidebar-link p-2 rounded-2 text-decoration-none font-poppins text-white row">
                                <i class="bi bi-printer-fill col-2 p-0 text-center fs-4" />
                                <span className='px-1 col-10 p-2'>Cetak</span>
                            </a>
                        </li>
                    </ul>
                    <hr className="text-light" />
                    <button onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }} className='btn btn-danger row m-1 p-2 w-100'>
                        <i class="bi bi-box-arrow-left col-2 p-0"></i>
                        <span className="col-10 text-start">Logout</span>
                    </button>
                </div>
            </div>
        </nav>

    )
}