import { useContext, useRef, useCallback } from 'react'
import { Context } from "../App"

export default function useDebounce(callback, delay) {
	const { dataProducts } = useContext(Context)
	const timer = useRef()

	const debounceCallback = useCallback((...args) => {
		if (timer.current) {
			clearTimeout(timer.current)
		}
		timer.current = setTimeout(() => {
			callback(...args).then(data => {
				dataProducts.setDataSearchProducts(data)
				dataProducts.setIsSpin(false)
			})
		}, delay)
	}, [callback, delay])

	return debounceCallback
}