import { $host, $authHost } from "./index"

export const createQuestionUser = async (obj) => {
	const { data } = await $host.post('api/question', obj)
	return data
}
export const postResponseAdmin = async (obj) => {
	const { data } = await $authHost.post('api/question/response', obj)
	return data
}
export const getQuestionResponse = async (id) => {
	const { data } = await $host.get('api/question/'+ id)
	return data
}
export const getAllQuestionResponseAdmin = async () => {
	const { data } = await $authHost.get('api/question')
	return data
}