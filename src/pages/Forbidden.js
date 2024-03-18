export const Forbidden = () => {
    document.title = 'Forbidden - Pusat Informasi Resimen Korps Kadet'
    return (
        <div className="text-center d-flex p-3 p-md-5 font-poppins" style={{ minHeight: '100vh', backgroundColor:'#f0f0f0' }}>
            <div className='bg-light shadow-lg d-flex flex-wrap w-100 rounded-2 m-md-4'>
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
                    <div className='w-100 shadow p-3 p-md-5 rounded-2' style={{backgroundColor:'#f0f0f0'}}>
                        <h1 style={{fontSize:100}} className='p-0'>403</h1>
                        <h2 className='mb-4'>FORBIDDEN</h2>
                        <h3>You are not Authorize for this content, try&nbsp;
                            <a href='/login' className='text-dark'>login</a>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}