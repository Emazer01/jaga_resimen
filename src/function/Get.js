import axios from 'axios';

const getTrends = async () => {
    var listLapApel = []
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/trends`,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(function (response) {
            if (response.status == 200) {
                listLapApel = response.data
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    return (listLapApel)
}

const getKadets = async () => {
    var kadets = {}
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/kadet/all`,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(function (response) {
            if (response.status == 200) {
                kadets = response.data
                console.log(response.headers)
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    return (kadets)
}

const getKadet = async (riwayatApel) => {
    var kadet = {}
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const kadet_nim = urlParams.get('nim')
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/kadet/detail?nim=${kadet_nim}&riwayatApel=${riwayatApel}`,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(function (response) {
            if (response.status == 200) {
                kadet = response.data
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    return (kadet)
}

const myKadet = async (riwayatApel) => {
    var kadet = {}
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/kadet/my?riwayatApel=${riwayatApel}`,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(function (response) {
            if (response.status == 200) {
                kadet = response.data
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    return (kadet)
}

const getAccounts = async () => {
    var accounts = {}
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/accounts`,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(function (response) {
            if (response.status == 200) {
                accounts = response.data
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    return (accounts)
}

const getAttribut = async () => {
    var atribut = {}
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/atribut`,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(function (response) {
            if (response.status == 200) {
                atribut = response.data
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    return (atribut)
}

const getJabatans = async () => {
    var jabatans = {}
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/jabatans`,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(function (response) {
            if (response.status == 200) {
                jabatans = response.data
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    return (jabatans)
}

const getDds = async () => {
    var dds = {}
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/dds`,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(function (response) {
            if (response.status == 200) {
                dds = response.data
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    return (dds)
}

const getWewenang = async () => {
    var jabatan = ""
    var kadets = []
    var pleton_id = 0
    var pleton_nama = ""
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/wewenang`,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(function (response) {
            if (response.status == 200) {
                jabatan = response.data.jabatan
                kadets = response.data.kadets
                pleton_id = response.data.pleton_id
                pleton_nama = response.data.pleton_nama
            }
        })
        .catch(function (error) {
            console.clear()
            console.log(error.response.data)
            jabatan = {
                tingkat: "-",
                jabatan_nama: error.response.data
            }
        });
    return ({
        jabatan: jabatan,
        kadets: kadets,
        pleton_id: pleton_id,
        pleton_nama: pleton_nama
    })
}

const getListLapApel = async () => {
    var listLapApel = []
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/laporan/apel`,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(function (response) {
            if (response.status == 200) {
                listLapApel = response.data
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    return (listLapApel)
}

const getLapApel = async () => {
    var result = {}
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tingkat = urlParams.get('tingkat')
    const id = urlParams.get('nomor')
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/laporan/apel/detail?tingkat=${tingkat}&id=${id}`,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(function (response) {
            if (response.status == 200) {
                console.log(response.data)
                result = response.data
                result.lapApel.lap_apel[0].tingkat = result.lapApel.lap_apel[0].tingkat[0].toUpperCase() + result.lapApel.lap_apel[0].tingkat.slice(1)
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    return (result)
}

const getLapApel2 = async (tingkat, id) => {
    var result = {}
    try {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/laporan/apel/detail?tingkat=${tingkat}&id=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            }
        )
            .then(function (response) {
                if (response.status == 200) {
                    result = response.data
                    result.lapApel.lap_apel[0].tingkat = result.lapApel.lap_apel[0].tingkat[0].toUpperCase() + result.lapApel.lap_apel[0].tingkat.slice(1)
                }
            })
            .catch(function (error) {
                console.clear()
            });
    } catch (error) {
        console.clear()
    }
    return (result)
}

const getLapGiat = async () => {
    var result = {}
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const nomor = urlParams.get('nomor')
    try {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/giat?nomor=${nomor}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            }
        )
            .then(function (response) {
                if (response.status == 200) {
                    result = response.data
                }
            })
            .catch(function (error) {
                console.clear()
            });
    } catch (error) {
        console.clear()
    }
    return (result)
}

const getListLapGiat = async () => {
    var listLapGiat = []
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/laporan/giat`,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(function (response) {
            if (response.status == 200) {
                console.log(response.headers)
                listLapGiat = response.data
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    return (listLapGiat)
}

const getListUnapprovedGiat = async () => {
    var listLapGiat = []
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/listUnapprovedGiat`,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(function (response) {
            if (response.status == 200) {
                console.log(response.headers)
                listLapGiat = response.data
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    return (listLapGiat)
}

export {
    getKadets,
    getKadet,
    myKadet,
    getAccounts,
    getAttribut,
    getJabatans,
    getDds,
    getWewenang,
    getListLapApel,
    getLapApel,
    getLapGiat,
    getListLapGiat,
    getListUnapprovedGiat,
    getLapApel2,
    getTrends
};