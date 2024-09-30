import {
	http
} from "@/service/index.js";


export function login(data) {
	return http.post('/login', data)
}

export function logout() {
	return http.post('/logout')
}

export function getUserInfo() {
	return http.get('/user/getUserInfo')
}

export function uptNeteaseCloud(data) {
	return http.post('/user/bindNeteaseCLoud', data)
}