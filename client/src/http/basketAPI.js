import { $authHost} from "./index"
export const addBasketUserOneProduct = async (id) => {
	const { data } = await $authHost.post('api/basket/add/' + id)
	return data
}
export const plusBasketUserOneProduct = async (id) => {
	const { data } = await $authHost.post('api/basket/add/plus/' + id)
	return data
}
export const minusBasketUserOneProduct = async (id) => {
	const { data } = await $authHost.post('api/basket/minus/' + id)
	return data
}
export const deleteBasketUserOneProduct = async (id) => {
	const { data } = await $authHost.delete('api/basket/delete/' + id)
	return data
}
export const deleteAllProductBasketUser = async (id) => {
	const { data } = await $authHost.delete('api/basket/delete/all/' + id)
	return data
}
export const getAllBasketUser = async () => {
	const { data } = await $authHost.get('api/basket')
	return data
}












