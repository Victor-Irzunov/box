import { $host } from "./index"

export const getAllInfoPages = async () => {
	const { data } = await $host.get('api/info/page')
	return data
}
export const getOneInfoPages = async ({ link }) => {
	const { data } = await $host.get('api/info/page/one', {
		params: {
			link
		}
	})
	return data
}
