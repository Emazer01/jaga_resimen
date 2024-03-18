export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark d-block d-md-none font-poppins sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand text-white d-flex align-items-center" href="/">
                    <img src="/MENKOR_FIXX.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top" />
                    <span className="mx-2">
                        <span className="fw-semibold fs-5">Resimen Korps Kadet</span><br />
                        <span className="fs-6">Pusat Informasi</span>
                    </span>

                </a>
                <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse p-1" id="navbarSupportedContent">
                    <ul className="nav nav-pills flex-column mb-auto p-2">
                        <li>
                            <a href="/" id='nav-btn-dashboard' className="sidebar-link p-2 fs-6 text-decoration-none font-poppins sidebar-active text-white d-flex">
                                <i className="bi bi-house-door-fill p-0 px-2 text-center fs-5" />
                                <span className='px-1 p-1'>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/personil" id='nav-btn-personil' className="sidebar-link p-2 fs-6 text-decoration-none font-poppins text-white d-flex">
                                <i className="bi bi-person-vcard-fill p-0 px-2 text-center fs-5" />
                                <span className='px-1 p-1'>Personil</span>
                            </a>
                        </li>
                        <li>
                            <button id="nav-btn-laporan" className="sidebar-link p-2 fs-6 btn btn-dark text-start rounded-0 font-poppins text-white w-100 d-flex" data-bs-toggle="collapse" data-bs-target="#navbar-collapse" aria-expanded="true">
                                <i className="bi bi-pencil-fill p-0 px-2 text-center fs-5"></i>
                                <span className='px-1 p-1'>Laporan</span>
                            </button>
                            <div className="collapse" id="navbar-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li>
                                        <a href="/laporan/pers" id='nav-btn-lap-pers' className="sidebar-link p-2 ps-4 text-decoration-none font-poppins  text-white d-flex">
                                            <i className="bi bi-chevron-right"></i>
                                            <span className="ps-1">Personil</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/laporan/giat" id='nav-btn-lap-giat' className="sidebar-link p-2 ps-4 text-decoration-none font-poppins  text-white d-flex">
                                            <i className="bi bi-chevron-right"></i>
                                            <span className="ps-1">Kegiatan</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href="/jabatan" id='nav-btn-jabatan' className="sidebar-link p-2 fs-6 text-decoration-none font-poppins text-white d-flex">
                                <i className="bi bi-diagram-3-fill p-0 px-2 text-center fs-5" />
                                <span className='px-1 p-1'>Jabatan</span>
                            </a>
                        </li>
                        <li>
                            <a href="/dinas" id='nav-btn-dinas' className="sidebar-link p-2 fs-6 text-decoration-none font-poppins text-white d-flex">
                                <i className="bi bi-bank2 p-0 px-2 text-center fs-5" />
                                <span className='px-1 p-1'>Dinas</span>
                            </a>
                        </li>
                        <li>
                            <a href="/kelola" id='nav-btn-kelolaAkun' className="sidebar-link p-2 fs-6 text-decoration-none font-poppins text-white d-flex">
                                <i className="bi bi-people-fill p-0 px-2 text-center fs-5" />
                                <span className='px-1 p-1'>Kelola Akun</span>
                            </a>
                        </li>
                    </ul>
                    <a href="/user" id='navbar-username' className=" btn btn-dark w-100 p-2 fs-6 text-decoration-none font-poppins text-white d-flex">
                        <i className="bi bi-person-circle p-0 px-2 text-center fs-5" />
                        <span className='px-1 p-1 text-start' id='isi-navbar-username'>My Profile</span>
                    </a>
                    <hr className="text-light" />
                    <button onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }} className='btn btn-danger row m-1 p-2 w-100'>
                        <i className="bi bi-box-arrow-left col-2 p-0"></i>
                        <span className="col-10 text-start">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}