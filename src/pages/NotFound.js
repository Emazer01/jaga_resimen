export const NotFound = () => {
    document.title = 'Not Found - Pusat Informasi Resimen Korps Kadet'
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
                        <h1 style={{fontSize:100}} className='p-0'>404</h1>
                        <h2 className='mb-4'>NOT FOUND</h2>
                        <h3>The page you were looking for does not exist, try&nbsp;
                            <a href='/login' className='text-white'>login</a>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}