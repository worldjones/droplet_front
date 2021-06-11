import React, { useContext, createContext } from "react";
import { Authentication } from "./auth";
const authContext = createContext();

// We're building a global react context that will track our user items.
export const ProvideAuth = ({ children }) => {
	const auth = Authentication();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
	return useContext(authContext);
};
