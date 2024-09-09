import { http } from "@/service/index.js";


export function login(data) {
	return http.post('/login',data)
}
