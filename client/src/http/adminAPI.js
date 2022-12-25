import { $authHost } from "./index"


export const createProduct = async (product) => {
	const { data } = await $authHost.post('api/product', product)
	return data
}

export const updateOneProduct = async (id, product) => {
	const { data } = await $authHost.put('api/product/' + id, product)
	return data
}
export const deleteOneProduct = async (id) => {
	const { data } = await $authHost.delete('api/product/' + id)
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

export const getDateOrders = async (date) => {
	const { data } = await $authHost.get('api/order/date', {
		params: {
			date
		}
	})
	return data
}
export const changeStatusOrder = async ({id, status}) => {
	const { data } = await $authHost.get('api/order/change/status', {
		params: {
			id, status
		}
	} )
	return data
}
export const getOneOrder = async (id) => {
	const { data } = await $authHost.get('api/order/'+ id )
	return data
}





export const getDateOrdersCourier = async (date) => {
	const { data } = await $authHost.get('api/order/courier/date', {
		params: {
			date
		}
	})
	return data
}
export const changeStatusOrderCourier = async ({id, status}) => {
	const { data } = await $authHost.get('api/order/courier/change/status', {
		params: {
			id, status
		}
	} )
	return data
}
export const getOneOrderCourier = async (id) => {
	const { data } = await $authHost.get('api/order/courier/'+ id )
	return data
}

