import axios from "axios";

export const API_MAIN = axios.create({
	baseURL: "http://worldjones.dk/startcode/api/",
	headers: {
		"Content-type": "application/json",
		Accept: "application/json",
	},
});
