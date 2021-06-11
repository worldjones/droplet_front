import { useState, useEffect } from "react";
import { API_MAIN } from "../utils/api";

export const Authentication = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const getUser = async () => {
		if (localStorage.getItem("token")) {
			// Set axios requests token header, if it wasn't set already..
			// This is not inside the login method, as a request to (ex: /match) would not call Login, but still call getUser
			// if they're logged in.
			if (!API_MAIN.defaults.headers.hasOwnProperty("x-access-token")) {
				API_MAIN.defaults.headers = {
					...API_MAIN.defaults.headers,
					"x-access-token": localStorage.getItem("token"),
				};
			}

			try {
				const response = await API_MAIN.get("me");
				const _user = response.data;
				return _user;
			} catch (error) {
				console.log(error);
				// On error, expired token? Log them out...
				logout();
			}
		}
	};

	const login = async ({ username, password }) => {
		try {
			const response = await API_MAIN.post("authentication/login", { username, password });
			localStorage.setItem("token", response.data.token);

			setUser(await getUser());
			return true;
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		localStorage.clear("token");
		// Remove axios requests token header.
		delete API_MAIN.defaults.headers["x-access-token"];

		setUser(null);
	};

	const register = async ({ username, password, passwordConfirm }) => {
		try {
			const response = await API_MAIN.post("authentication/register", { username, password, passwordConfirm });
			localStorage.setItem("token", response.data.token);

			setUser(await getUser());
			return true;
		} catch (error) {
			throw error;
		}
	};

	const update = async (props) => {
		await API_MAIN.put("user", { ...props });
		setUser(await getUser());
	};

	useEffect(() => {
		const doAsynchronousCalls = async () => {
			setLoading(true);

			setUser(await getUser());

			setLoading(false);
		};
		doAsynchronousCalls();
	}, []);

	return {
		user,
		loading,
		login,
		logout,
		register,
		update,
	};
};
