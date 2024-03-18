export const Sidebar = () => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-2 p-md-3 text-white bg-dark sidebar shadow-lg sticky-top col-3 col-md-2 d-none d-md-flex" style={{ height: "100vh" }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <img src="/MENKOR_FIXX.png" className='col-12 col-md-3 p-md-1' />
                <span className="ps-2 font-poppins">
                    <span className="fw-semibold fs-6">Resimen Korps Kadet</span><br />
                    <span>Pusat Informasi</span>
                </span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column" >
                <li className='mb-1'>
                    <a href="/" id='btn-dashboard' className="sidebar-link p-1 text-decoration-none font-poppins sidebar-active text-white d-flex">
                        <i className="bi bi-house-door-fill p-0 px-2 text-center fs-5" />
                        <span className='px-1 col-md-10 d-none d-md-block p-1'>Dashboard</span>
                    </a>
                </li>
                <li className='mb-1'>
                    <a href="/personil" id='btn-personil' className="sidebar-link p-1 text-decoration-none font-poppins text-white d-flex">
                        <i className="bi bi-person-vcard-fill p-0 px-2 text-center fs-5" />
                        <span className='px-1 p-1'>Personil</span>
                    </a>
                </li>
                <li className='mb-1'>
                    <button id="btn-laporan" className="sidebar-link p-1 btn btn-dark text-start rounded-0 font-poppins text-white w-100 d-flex" data-bs-toggle="collapse" data-bs-target="#sidebar-collapse" aria-expanded="true">
                        <i className="bi bi-pencil-fill p-0 px-2 text-center fs-5"></i>
                        <span className='px-1 p-1'>Laporan</span>
                    </button>
                    <div className="collapse" id="sidebar-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li>
                                <a href="/laporan/pers" id='btn-lap-pers' className="sidebar-link p-1 ps-4 text-decoration-none font-poppins  text-white d-flex">
                                    <i className="bi bi-chevron-right"></i>
                                    <span className="ps-1">Personil</span>
                                </a>
                            </li>
                            <li>
                                <a href="/laporan/giat" id='btn-lap-giat' className="sidebar-link p-1 ps-4 text-decoration-none font-poppins  text-white d-flex">
                                    <i className="bi bi-chevron-right"></i>
                                    <span className="ps-1">Kegiatan</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className='mb-1'>
                    <a href="/jabatan" id='btn-jabatan' className="sidebar-link p-1 text-decoration-none font-poppins  text-white d-flex">
                        <i className="bi bi-diagram-3-fill p-0 px-2 text-center fs-5" />
                        <span className='px-1 p-1'>Jabatan</span>
                    </a>
                </li>
                <li className='mb-1'>
                    <a href="/dinas" id='btn-dinas' className="sidebar-link p-1 text-decoration-none font-poppins  text-white d-flex">
                        <i className="bi bi-bank2 p-0 px-2 text-center fs-5" />
                        <span className='px-1 p-1'>Dinas</span>
                    </a>
                </li>
                <li className='mb-1'>
                    <a href="/kelola" id='btn-kelolaAkun' className="sidebar-link p-1 text-decoration-none font-poppins text-white d-flex">
                        <i className="bi bi-people-fill p-0 px-2 text-center fs-5" />
                        <span className='px-1 p-1'>Kelola Akun</span>
                    </a>
                </li>
            </ul>
            <div className="mt-auto">
                <a href="/user" id='sidebar-username' className="btn btn-dark p-1 font-poppins text-white d-flex">
                    <i className="bi bi-person-circle p-0 px-2 text-center fs-5" />
                    <span className='px-1 p-1 text-start' id='isi-sidebar-username'>My Profile</span>
                </a>
                <hr />
                <button onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                }} className='btn btn-danger row m-1 w-100'>
                    <i className="bi bi-box-arrow-left col-2 p-0"></i>
                    <span className="col-10 text-start">Logout</span>
                </button>
            </div>
        </div>
    )
}