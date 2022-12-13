import { $authHost, $host } from "./index"


export const orderNoUser = async (obj) => {
	const { data } = await $host.post('api/order/nouser',obj)
	return data
}














