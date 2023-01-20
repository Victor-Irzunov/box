import { $authHost } from "./index"

export const deleteOneGroup = async (id) => {
	const { data } = await $authHost.delete('api/group/'+ id)
	return data
}