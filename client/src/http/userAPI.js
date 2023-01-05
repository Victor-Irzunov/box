import { $authHost, $host } from "./index"
import jwt_decode from "jwt-decode"

export const registration = async (login, password, password2) => {
    const { data } = await $host.post('api/user/registration', { login, password, password2,role: 'ADMIN' })  //., role: 'ADMIN' //role: 'COURIER'
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (login, password) => {
    const { data } = await $host.post('api/user/login', { login, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}


export const getMyAccount = async () => {
    const { data } = await $authHost.get('api/user/account')
    return data
}



// //:MyAccount changeMainPhone
// export const changeMainPhone = async (i) => {
//     const { data } = await $authHost.put('api/account/change', i)
//     return data
// }
// //:MyAccount changeAdditionalPhone
// export const changeAdditionalPhone = async (i) => {
//     const { data } = await $authHost.put('api/account/additional', i)
//     return data
// }
// //:MyAccount deleteMainPhone
// export const deleteMainPhone = async () => {
//     const { data } = await $authHost.delete('api/account')
//     return data
// }
// //:MyAccount deleteAdditionalPhone
// export const deleteAdditionalPhone = async (i) => {
//     const { data } = await $authHost.put('api/account/del', i)
//     return data
// }
// //=MyAccount addAddress
// export const addAddress = async (obj) => {
//     const { data } = await $authHost.post('api/account/address', obj)
//     return data
// }
// //=MyAccount changeMainAddress
// export const changeMainAddress = async (obj) => {
//     const { data } = await $authHost.put('api/account/address', obj)
//     return data
// }
// //=MyAccount deleteMainAddress
// export const deleteMainAddress = async () => {
//     const { data } = await $authHost.delete('api/account/address')
//     return data
// }
// //=MyAccount DeleteAdditionalAddress
// export const deleteAdditionalAddress = async (idx) => {
//     const { data } = await $authHost.put('api/account/deladdress', idx)
//     return data
// }
// //=MyAccount changeAdditionalAddress
// export const changeAdditionalAddress = async (obj) => {
//     const { data } = await $authHost.put('api/account/changeaddress', obj)
//     return data
// }