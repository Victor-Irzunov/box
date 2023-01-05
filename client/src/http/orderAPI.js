import { $authHost, $host } from "./index"


export const orderUser = async (obj) => {
	const { data } = await $host.post('api/order/user',obj)
	return data
}
export const getAllOrderUser = async () => {
	const { data } = await $authHost.get('api/order/user',)
	return data
}
export const isBuyThisProductUser = async (id) => {
	const { data } = await $authHost.get('api/order/user/'+ id)
	return data
}














