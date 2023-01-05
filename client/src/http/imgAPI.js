import { $host } from "./index"

export const getSliderImg = async () => {
	const { data } = await $host.get('api/img')
	return data
}