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
	}

	return { addList }
}
export { useCookieList }

