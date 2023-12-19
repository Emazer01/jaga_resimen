
export const Sidebar = () => {
    return (
        <div class="d-flex flex-column flex-shrink-0 p-2 p-md-3 text-white bg-dark sidebar shadow-lg sticky-top col-3 col-md-3 d-none d-md-flex" style={{ height: "100vh" }}>
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <img src="MENKOR_FIXX.png" className='col-12 col-md-3 p-md-1' />
                <span class="ps-2 font-poppins">
                    <span className="fw-semibold fs-5">Resimen Korps Kadet</span><br />
                    <span>Pusat Informasi</span>
                </span>
            </a>
            <hr />
            <ul class="nav nav-pills flex-column p-2" >
                <li className='my-1'>
                    <a href="/" id='btn-dashboard' class="sidebar-link p-2 rounded-2 text-decoration-none font-poppins sidebar-active text-white row">
                        <i class="bi bi-house-door-fill col-12 col-md-2 p-0 text-center fs-4" />
                        <span className='px-1 col-md-10 d-none d-md-block p-2'>Dashboard</span>
                    </a>
                </li>
                <li className='my-1'>
                    <a href="/editsatuan" id='btn-editsatuan' class="sidebar-link p-2 rounded-2 text-decoration-none font-poppins  text-white row">
                        <i class="bi bi-diagram-3-fill col-12 col-md-2 p-0 text-center fs-4" />
                        <span className='px-1 col-md-10 d-none d-md-block p-2'>Edit Satuan</span>
                    </a>
                </li>
                <li className='my-1'>
                    <a href="/tambah" id='btn-tambah' class="sidebar-link p-2 rounded-2 text-decoration-none font-poppins text-white row">
                        <i class="bi bi-file-earmark-plus-fill col-12 col-md-2 p-0 text-center fs-4" />
                        <span className='px-1 col-md-10 d-none d-md-block p-2'>Tambah</span>
                    </a>
                </li>
                <li className='my-1'>
                    <a href="/cetak" id='btn-cetak' class="sidebar-link p-2 rounded-2 text-decoration-none font-poppins text-white row">
                        <i class="bi bi-printer-fill col-12 col-md-2 p-0 text-center fs-4" />
                        <span className='px-1 col-md-10 d-none d-md-block p-2'>Cetak</span>
                    </a>
                </li>
            </ul>
            <div className="mt-auto">
                <hr />
                <button onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                }} className='btn btn-danger row m-1 w-100'>
                    <i class="bi bi-box-arrow-left col-2 p-0"></i>
                    <span className="col-10 text-start">Logout</span>
                </button>
            </div>
        </div>
    )
}