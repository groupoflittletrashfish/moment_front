import {
	http
} from "@/service/index.js";

export function uploadFile(path, data) {
	return http.upload('/upload', path, data)
}