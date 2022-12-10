import axios from "axios"

//_без авторизации
const $host = axios.create({
    baseURL: "http://localhost:5000/"
})


const $authHost = axios.create({
    baseURL: "http://localhost:5000/"
})

//.вставляю токен
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}


//_будет отробат перед каждым запросом и подстовлять токен 
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
