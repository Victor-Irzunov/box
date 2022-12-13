import { useContext, useEffect, useState } from 'react'
import { Context } from '../App'

function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}


const useCookieList = value => {
	const { dataApp } = useContext(Context)
	const [idProduct, setIdProduct] = useState(value)

	const addList = (key, id) => {
		if (key !== 'BasketProduct') {
			let value_cookie = getCookie(key)
			if (value_cookie === undefined) {
				let date = new Date()
				date.setYear(date.getFullYear() + 1)
				document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify([])) + '; expires=' + date.toUTCString() + ';path' + '=' + '/'
			}
			let cookie = {}
			decodeURIComponent(document.cookie).split(';').forEach(el => {
				let [k, v] = el.split('=')
				cookie[k.trim()] = v
			})
			let arr = JSON.parse(cookie[key])
			if (!arr.includes(id)) {
				arr.push(id)
				let date = new Date()
				date.setYear(date.getFullYear() + 1)
				let json_str = JSON.stringify(arr)
				document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(json_str) + '; expires=' + date.toUTCString() + ';path' + '=' + '/'
			}
			if (key === 'ComparisonList') dataApp.setVesyLength(arr.length)
			if (key === 'LikedList') dataApp.setLikedLength(arr.length)
		} else {
			let value_cookie = getCookie(key)
			if (value_cookie === undefined) {
				let date = new Date()
				date.setYear(date.getFullYear() + 1)
				document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify([])) + '; expires=' + date.toUTCString() + ';path' + '=' + '/'
			}
			let cookie = {}
			decodeURIComponent(document.cookie).split(';').forEach(el => {
				let [k, v] = el.split('=')
				cookie[k.trim()] = v
			})
			let arr = JSON.parse(cookie[key])
			if (arr.length) {
				arr.map((el, idx) => {
					if (el.id === id) {
						return el.count += 1
					}
				})
				const obj = arr.some(el => el.id === id)
				if (!obj) {
					arr.push({ id, count: 1 })
				}
			} else {
				arr.push({ id, count: 1 })
			}
			let date = new Date()
			date.setYear(date.getFullYear() + 1)
			let json_str = JSON.stringify(arr)
			document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(json_str) + '; expires=' + date.toUTCString() + ';path' + '=' + '/'
			dataApp.setBasketLength(arr.length)
			dataApp.setBasketArr(arr)
		}
	}

	const minusList = (key, id) => {
		let value_cookie = JSON.parse(getCookie(key))

		value_cookie.map(el => {
			if (el.id === id) {
				if (el.count > 0) {
					return el.count--
				}
			}
		})
		let date = new Date()
		date.setYear(date.getFullYear() + 1)
		let json_str = JSON.stringify(value_cookie)
		document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(json_str) + '; expires=' + date.toUTCString() + ';path' + '=' + '/'
		dataApp.setBasketLength(value_cookie.length)
		dataApp.setBasketArr(value_cookie)
	}

	const deleteOneList = (key, id) => {
		let value_cookie = JSON.parse(getCookie(key))
		const newArr = value_cookie.filter(el => el.id !== id)
		let date = new Date()
		date.setYear(date.getFullYear() + 1)
		let json_str = JSON.stringify(newArr)
		document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(json_str) + '; expires=' + date.toUTCString() + ';path' + '=' + '/'
		dataApp.setBasketLength(newArr.length)
		dataApp.setBasketArr(newArr)
	}
	const deleteAllList = (key, id) => {
		let value_cookie = JSON.parse(getCookie(key))
		value_cookie = []


		let date = new Date()
		date.setYear(date.getFullYear() + 1)
		let json_str = JSON.stringify(value_cookie)
		document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(json_str) + '; expires=' + date.toUTCString() + ';path' + '=' + '/'
		dataApp.setBasketLength(value_cookie.length)
		dataApp.setBasketArr(value_cookie)
	}

	return { addList, minusList, deleteOneList, deleteAllList }
}
export { useCookieList }

