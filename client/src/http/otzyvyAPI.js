import { $authHost} from "./index"


export const otzyvRatingUser= async (obj) => {
	const { data } = await $authHost.post('api/otzyvy', obj)
	return data
}
export const otzyvRatingProduct= async (id) => {
	const { data } = await $authHost.get('api/otzyvy/'+ id)
	return data
}
export const otzyvRatinOneUserProduct= async (id) => {
	const { data } = await $authHost.get('api/otzyvy/user/'+ id)
	return data
}
