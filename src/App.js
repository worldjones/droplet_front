import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from "./components/ui/Navbar";
import { NotFound } from "./pages/errors/NotFound";
import { useAuth } from "./providers/ProvideAuth";
import { routes } from "./routes/routes";

const App = () => {
	const auth = useAuth();

	if (auth.loading) return "Loading...";

	return (
		<BrowserRouter>
			<div className="page-wrapper with-navbar">
				<ToastContainer />
				<Navbar />
				<div className="content-wrapper">
					<Switch>
						{routes.map((route, index) => {
							return route.protected ? <ProtectedRoute key={index} {...route} /> : <Route key={index} {...route} />;
						})}
						<Route path="*" component={NotFound} />
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
