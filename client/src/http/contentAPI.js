import { $authHost, $host } from "./index"

export const getContentPage = async ({ categoryId, typeId }) => {
	const { data } = await $host.get('api/content/', {
		params: {
			categoryId,
			typeId
		}
	})
	return data
}
export const editContentPage = async (obj) => {
	const { data } = await $authHost.post('api/content/', obj)
	return data
}