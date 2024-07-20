import * as React from 'react';

export const ComponentToPrint = React.forwardRef((props, ref) => {
    var lapApel = props.props
    var count = 0
    var page = 1
    React.useEffect(() => {
        console.log(props.props)
    }, [lapApel])
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
                <h4 className='card-header d-flex border-bottom'>Laporan Apel
                    <i className="fs-2 ms-auto bi bi-file-earmark-person-fill"></i>
                </h4>
                <div className='card-body p-1 '>
                    <div className='d-flex flex-wrap'>
                        <div className='col-6'>
                            <table className='table' style={{ fontSize: 15 }}>
                                <thead>
                                    <tr>
                                        <th className='align-middle col-4 p-1'>Jenis Apel</th>
                                        <td className='align-middle p-1'>{lapApel[0].jenis_apel_nama}</td>
                                    </tr>
                                    <tr>
                                        <th className='align-middle p-1'>Hari, Tanggal</th>
                                        <td className='align-middle p-1'>{new Date(lapApel[0].apel_date).toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td>
                                    </tr>
                                    <tr>
                                        <th className='align-middle p-1'>Tingkat</th>
                                        <td className='align-middle p-1'>{lapApel[0].tingkat}</td>
                                    </tr>
                                    <tr>
                                        <th className='align-middle p-1'>Nomor Laporan</th>
                                        <td className='align-middle p-1'>#{lapApel[0].tingkat}-{lapApel[0].apel_id}</td>
                                    </tr>
                                    <tr>
                                        <th className='align-middle p-1'>{lapApel[0].tingkat}</th>
                                        <td className='align-middle p-1'>{lapApel[0].satuan}</td>
                                    </tr>
                                    <tr>
                                        <th className='align-middle p-1'>Pelapor</th>
                                        <td className='align-middle p-1'>{lapApel[0].pangkat_singkat} {lapApel[0].kadet_nama}</td>
                                    </tr>
                                    <tr>
                                        <th className='align-middle'>Jabatan Pelapor</th>
                                        <td className='align-middle'>{lapApel[0].jab_nama}<br />{lapApel[0].dd_nama}</td>
                                    </tr>
                                    <tr>
                                        <th className='align-middle p-1'>Sumber</th>
                                        <td className='align-middle p-0'>
                                            {lapApel[2].map(x => {
                                                return (
                                                    <a href={`/laporan/pers/apel?tingkat=${x.tingkat}&nomor=${x.apel_id}`} className='btn btn-primary rounded-pill m-1 text-start p-0 px-1' style={{ fontSize: 10 }}>
                                                        <small>#{x.tingkat}-{x.apel_id}</small>
                                                    </a>
                                                )
                                            })}
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className='col-6 p-1'>
                            <div className='d-flex'>
                                <div className='col-4 d-flex p-1'>
                                    <div className='btn btn-secondary w-100'>
                                        <strong className='px-2 py-1'>Jumlah</strong>
                                        <span className='p-2 d-flex align-items-center text-center'>
                                            <span className='w-100 fs-3 fw-bold'>{Number(lapApel[0].hadir) + Number(lapApel[0].sakit) + Number(lapApel[0].izin) + Number(lapApel[0].tanpa_keterangan)}</span>
                                        </span>
                                    </div>
                                </div>
                                <div className='col-8 d-flex flex-wrap'>
                                    <div className='col-6 p-1 d-flex'>
                                        <a className='btn btn-primary w-100'>
                                            <strong className='px-2 py-1'>Hadir</strong>
                                            <span className='p-2 d-flex align-items-center text-center'>
                                                <span className='w-100 fs-3 fw-bold'>{Number(lapApel[0].hadir)}</span>
                                            </span>
                                        </a>
                                    </div>
                                    <div className='col-6 p-1 d-flex'>
                                        <a className='btn btn-success w-100' href='#sakit'>
                                            <strong className='px-2 py-1'>Sakit</strong>
                                            <span className='p-2 d-flex align-items-center text-center'>
                                                <span className='w-100 fs-3 fw-bold'>{Number(lapApel[0].sakit)}</span>
                                            </span>
                                        </a>
                                    </div>
                                    <div className='col-6 p-1 d-flex'>
                                        <a className='btn btn-warning text-light w-100' href='#izin'>
                                            <strong className='px-2 py-1'>Izin</strong>
                                            <span className='p-2 d-flex align-items-center text-center'>
                                                <span className='w-100 fs-3 fw-bold'>{Number(lapApel[0].izin)}</span>
                                            </span>
                                        </a>
                                    </div>
                                    <div className='col-6 p-1 d-flex'>
                                        <a className='btn btn-danger w-100' href='#tanpa-keterangan'>
                                            <strong className='py-1'><small>Tanpa Keterangan</small></strong>
                                            <span className='p-2 d-flex align-items-center text-center'>
                                                <span className='w-100 fs-3 fw-bold'>{Number(lapApel[0].tanpa_keterangan)}</span>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-wrap'>
                        <div className='col-12 p-2' id='sakit'>
                            <div className='page-break'></div>
                            <h5>Sakit</h5>
                            <div className='d-flex flex-wrap'>
                                {lapApel[1].map(x => {
                                    if (x.keterangan_nama == 'Sakit') {
                                        return (
                                            <div key={x.sakit_id} class="card mb-3 col-6 border-white">
                                                <div class="row g-0">
                                                    <div class="col-4">
                                                        <img src={x.sakit.foto_isi} class="img-fluid rounded-start" alt="..." />
                                                    </div>
                                                    <div class="col-8">
                                                        <div class="card-body p-1">
                                                            <h5 class="card-title m-0">{x.pangkat_singkat} {x.kadet_nama}</h5>
                                                            <p class="card-text m-0">{x.sakit.sakit_nama}</p>
                                                            <p class="card-text m-0"><small class="text-body-secondary">{x.sakit.sakit_detail}</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                        <div className='col-12 p-2' id='izin'>
                            <div className='page-break'></div>
                            <h5>Izin</h5>
                            <div className='d-flex flex-wrap'>
                                {lapApel[1].map(x => {
                                    if (x.keterangan_nama == 'Izin') {
                                        return (
                                            <div key={x.izin_id} class="card mb-3 col-6 border-white">
                                                <div class="row g-0">
                                                    <div class="col-4">
                                                        <img src={x.izin.foto_isi} class="img-fluid rounded-start" alt="..." />
                                                    </div>
                                                    <div class="col-8">
                                                        <div class="card-body p-1">
                                                            <h5 class="card-title m-0">{x.pangkat_singkat} {x.kadet_nama}</h5>
                                                            <p class="card-text m-0">{x.izin.izin_nama}</p>
                                                            <p class="card-text m-0"><small class="text-body-secondary">{x.izin.izin_detail}</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                        <div className='col-12 p-2' id='tanpa-keterangan'>
                            <div className='page-break'></div>
                            <h5>Tanpa Keterangan</h5>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Nama</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lapApel[1].map(x => {
                                        if (x.keterangan_nama == 'Tanpa Keterangan') {
                                            return (
                                                <tr key={x.data_apel_id}>
                                                    <td>{x.pangkat_singkat} {x.kadet_nama}</td>
                                                </tr>
                                            )
                                        }
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