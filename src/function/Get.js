import axios from 'axios';

const getKadets = async () => {
    var kadets = {}
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/kadets`,
        {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }
    )
        .then(function (response) {
            if (response.status == 200) {
                kadets = response.data
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    return (kadets)
}

const getKadet = async () => {
    var kadet = {}
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const kadet_nim = urlParams.get('nim')
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/kadet?nim=${kadet_nim}`,
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

const myKadet = async () => {
    var kadet = {}
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/mykadet`,
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

export {
    getKadets,
    getKadet,
    myKadet,
    getAccounts,
    getAttribut,
    getJabatans,
    getDds
};