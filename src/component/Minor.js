import * as React from 'react';

const Heading = ({ query }) => {
    return (
        <div className='border w-100 p-2 shadow-sm' style={{backgroundColor:'#f5f5f5'}}>
            <h2 className='m-0'>{query}</h2>
        </div>

    )
}

const TimeInterval = ({lgCol}) => {
    const [time, setTime] = React.useState({
        tanggal: new Date().toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
        waktu: new Date().toLocaleString('id-id', { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    })

    React.useEffect(() => {
        setInterval(() => {
            const tanggal = new Date().toLocaleString('id-id', { weekday: "long", year: "numeric", month: "long", day: "numeric" });
            const waktu = new Date().toLocaleString('id-id', { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            setTime({
                tanggal: tanggal,
                waktu: waktu
            })
        }, 1000)
    }, [])

    return (
        <div className={`p-1 p-lg-2 pb-3 col-12 col-lg-${lgCol} d-flex flex-wrap`}>
            <div className='card shadow w-100 col-12 p-3'>
                <h2>
                    <span>{time.tanggal}</span><br />
                    <span>{time.waktu}</span>
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

const Pagination = ({ postPerPage, totalPost, currentPage, changePage, className }) => {
    const pageNumbers = [];
    for (let index = currentPage - 1; index <= currentPage + 1; index++) {
        if (index >= 1 && index <= Math.ceil(totalPost / postPerPage)) {
            pageNumbers.push(index)
        }
    }

    const checkPrev = () => {
        if (currentPage > 2) {
            return (
                <li className='page-item'>
                    <a onClick={() => changePage(1)} className='page-link text-dark'>...</a>
                </li>
            )
        }
    }

    const checkNext = () => {
        if (Math.ceil(totalPost / postPerPage) - currentPage >= 2) {
            return (
                <li className='page-item'>
                    <a onClick={() => changePage(Math.ceil(totalPost / postPerPage))} className='page-link text-dark'>...</a>
                </li>
            )
        }
    }

    return (
        <ul className={`pagination justify-content-center ${className}`} id='page' style={{ cursor: 'pointer' }}>
            <li className='page-item'>
                <a onClick={() => changePage(1)} className='page-link text-dark'>&laquo;</a>
            </li>
            <li className='page-item'>
                <a onClick={() => changePage(currentPage - 1)} className='page-link text-dark'>&lsaquo;</a>
            </li>
            {checkPrev()}
            {pageNumbers.map(number => {
                if (number == currentPage) {
                    return (
                        <li key={number} className='page-item'>
                            <a onClick={() => changePage(number)} className='page-link text-light' style={{ backgroundColor: '#74580f' }}>{number}</a>
                        </li>
                    )
                } else {
                    return (
                        <li key={number} className='page-item'>
                            <a onClick={() => changePage(number)} className='page-link text-dark'>{number}</a>
                        </li>
                    )
                }
            })}
            {checkNext()}
            <li className='page-item'>
                <a onClick={() => changePage(currentPage + 1)} className='page-link text-dark'>&rsaquo;</a>
            </li>
            <li className='page-item'>
                <a onClick={() => changePage(Math.ceil(totalPost / postPerPage))} className='page-link text-dark'>&raquo;</a>
            </li>
        </ul>
    )

}

export {
    Heading,
    TimeInterval,
    StrukturMenkorps,
    Pagination
};