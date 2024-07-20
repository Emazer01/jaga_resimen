import * as React from 'react';

export const ComponentToPrintGiat = React.forwardRef((props, ref) => {
    var giat = props.props[0]
    var hitung = 0
    var peserta = props.props[1]
    var foto = props.props[2]
    var link = props.props[3]
    React.useEffect(() => {
        console.log(props.props)
    }, [giat])
    return (
        <div ref={ref} id='recent'>
            <div className='text-center'>
                <h2 className='d-flex align-items-center border-bottom pb-3 mb-3'>
                    <div className='col-2'>
                        <img src="/MENKOR_FIXX.png" style={{ maxHeight: 80, maxWidth: 80 }} />
                    </div>
                    <span className='col-8'>Resimen Korps Kadet Mahasiswa<br />Pusat Informasi</span>
                    <div className='col-2'></div>
                </h2>
            </div>
            <div className='card w-100 col-12 border-white'>
                <h4 className='card-header d-flex border-bottom'>Laporan Kegiatan
                    <i className="fs-2 ms-auto bi bi-file-earmark-person-fill"></i>
                </h4>
                <div className='card-body p-1 '>
                    <div className='d-flex flex-wrap'>
                        <div className='col-12 p-3 d-flex'>
                            <table className='table table-striped'>
                                <tbody>
                                    <tr>
                                        <th>Nama Kegiatan</th>
                                        <td>{giat.giat_nama}</td>
                                    </tr>
                                    <tr>
                                        <th>Tanggal Kegiatan</th>
                                        <td>{new Date(giat.giat_date).toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td>
                                    </tr>
                                    <tr>
                                        <th>Tanggal Laporan</th>
                                        <td>{new Date(giat.lap_giat_date).toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td>
                                    </tr>
                                    <tr>
                                        <th>Pelapor</th>
                                        <td>{giat.pelapor_nama}</td>
                                    </tr>
                                    <tr>
                                        <th>Approver</th>
                                        <td>{giat.approver_nama}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='col-12'>
                            <strong className='fs-5'>Detail Kegiatan</strong>
                            <p>{giat.giat_detail}</p>
                        </div>
                        <div className='col-12'>
                            <strong className='fs-5'>Dokumentasi Kegiatan</strong>
                            <div className='d-flex flex-wrap'>
                                {foto.map(foto => {
                                    return (
                                        <div className='col-4 d-flex p-1'>
                                            <img src={foto.foto_isi} className='rounded-2 w-100 object-fit-contain' />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='col-12 p-2'>
                            <strong className='fs-5'>Attachment</strong>
                            <div>
                                {link.map(link => {
                                    return (
                                        <a href={link.link_isi} target='_blank' className='btn btn-secondary text-start d-flex'><span>{link.link_isi}</span> <i className="bi bi-box-arrow-up-right"></i></a>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='col-12 p-2'>
                            <div className='page-break'></div>
                            <strong className='fs-5'>Peserta</strong>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>Pleton</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {peserta.map(x => {
                                        hitung += 1
                                        return (
                                            <tr key={x.kadet_nama}>
                                                <td>{hitung}</td>
                                                <td>{x.kadet_nama}</td>
                                                <td>{x.pleton}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});