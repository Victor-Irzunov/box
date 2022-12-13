import { $authHost, $host } from "./index"



//_add basket
export const addBasketUserOneProduct = async (id) => {
	const { data } = await $host.post('api/basket/add/' + id)
	return data
}

//_getAll basket
export const getAllBasketUser = async () => {
	const { data } = await $authHost.get('api/basket')
	return data
}












