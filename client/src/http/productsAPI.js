import { $host } from "./index"


// export const fetchProducts = async () => {
//     const { data } = await $host.get('products?limit=100')
//     return data
// }

export const fetchProducts = async (page, limit = 10, categoryId, typeId, priceFrom, priceBefore) => {
	const { data } = await $host.get('api/product', {
		params: {
			page,
			limit,
			categoryId,
			typeId,
			priceFrom,
			priceBefore,
		}
	})
	return data
}
export const fetchOneProduct = async (id) => {
	const { data } = await $host.get('api/product/' + id)
	return data
}
export const fetchProductsPohozhie = async (id) => {
	// console.log('💊------id:', id)
	const { data } = await $host.get('api/product/pohozhie/' + id)
	return data
}

//: search
// export const searchProducts = async (query = 0) => {
//     const { data } = await $host.get('products/search?q=' + query)
//     return data
// }


export const fetchType = async () => {
	const { data } = await $host.get('api/type',)
	return data
}

export const fetchInfo = async () => {
	const { data } = await $host.get('api/info',)
	return data
}
export const fetchCategory = async () => {
	const { data } = await $host.get('api/category',)
	return data
}

export const fetchInfoTitle = async () => {
	const { data } = await $host.get('api/infotitle',)
	return data
}

export const categoryType = async () => {
	const { data } = await $host.get('api/categorytype',)
	return data
}








