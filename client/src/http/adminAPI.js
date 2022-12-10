import { $authHost } from "./index"


export const createProduct = async (device) => {
	const { data } = await $authHost.post('api/product', device)
	return data
}




export const createType = async type => {
	const { data } = await $authHost.post('api/type', type)
	return data
}
export const deleteeType = async id => {
	const { data } = await $authHost.delete('api/type/' + id)
	return data
}

export const createInfoTitle = async type => {
	const { data } = await $authHost.post('api/infotitle', type)
	return data
}
export const deleteeInfoTitle = async id => {
	const { data } = await $authHost.delete('api/infotitle/' + id)
	return data
}





export const createInfo = async arr => {
	const { data } = await $authHost.post('api/info', arr)
	return data
}
export const deleteInfo = async id => {
	const { data } = await $authHost.delete('api/info/' + id)
	return data
}


export const createCategory = async arr => {
	const { data } = await $authHost.post('api/category', arr)
	return data
}
export const deleteCategory = async id => {
	const { data } = await $authHost.delete('api/category/' + id)
	return data
}

