import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../providers/ProvideAuth";
export const ProtectedRoute = ({ component: Component, admin, ...rest }) => {
	const auth = useAuth();

	return (
		<Route
			{...rest}
			render={(props) => {
				if (auth.user) {
					// If trying to access admin page without admin (but logged in)
					if (admin && !auth.user.roles.includes("admin")) {
						return <h1>ACCESS DENIED</h1>;
					}
					return <Component {...props} />;
				} else return <Redirect to={{ pathname: "/sign-in", state: { from: props.location } }} />;
			}}
		/>
	);
};
