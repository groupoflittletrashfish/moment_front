import {
	http
} from "@/service/index.js";


export function publish(data) {
	return http.post('/moment/publish', data)
}


export function queryAllMoment(data) {
	return http.get('/moment/queryAllMoment',data)
}

export function queryAllTags() {
	return http.get('/moment/queryAllTags')
}


export function addTag(data) {
	return http.post('/moment/addTag', data)
}