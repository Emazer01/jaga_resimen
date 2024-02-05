import * as React from 'react';

const heading2 = (query) => {
    return (<h2 className='text-white ps-3 ps-md-4 pt-2 pt-md-3 m-0'>{query}</h2>)
}

const TimeInterval = () => {
    React.useEffect(() => {
        setInterval(() => {
            const tanggal = new Date().toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" });
            document.getElementById("tanggal").innerHTML = tanggal
            const waktu = new Date().toLocaleString('id-id', { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            document.getElementById("waktu").innerHTML = "Pukul " + waktu
        }, 1000)
    }, [])

    return (
        <div className='p-1 p-lg-2 pb-3 col-12 col-lg-6 rounded-3 d-flex flex-wrap'>
            <div className='card rounded-4 bg-dark shadow-lg text-light w-100 col-12'>
                <h2 className='p-3'>
                    <span id='tanggal'></span><br />
                    <span id='waktu'></span>
                </h2>
            </div>
        </div>
    )
}

const StrukturMenkorps = () => {
    return (
        <>
            <h3>Komando</h3>
            <div className='border border-2 rounded-2 border-danger text-center mb-4' id='struktur-menkorps-komando'>

            </div>
            <h3>Staf</h3>
            <div className='border border-2 rounded-2 border-primary text-center mb-4' id='struktur-menkorps-staf'>

            </div>
            <h3>Lemuskad</h3>
            <div className='border border-2 rounded-2 border-black text-center mb-4' id='struktur-menkorps-lemuskad'>

            </div>
            <h3>Polisi Kadet</h3>
            <div className='border border-2 rounded-2 border-white text-center mb-4' id='struktur-menkorps-polkad'>

            </div></>
    )
}

export {
    heading2,
    TimeInterval,
    StrukturMenkorps
};