import {
	http
} from "@/service/index.js";


export function publish(data) {
	return http.post('/moment/publish', data)
}


export function queryAllMoment() {
	return http.get('/moment/queryAllMoment')
}