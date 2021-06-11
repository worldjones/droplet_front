import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../providers/ProvideAuth";

export const SignIn = () => {
	const auth = useAuth();
	const history = useHistory();
	const expectedData = ["username", "password"];
	const [data, setData] = useState({});

	const handleChange = (e) => {
		const target = e.target;
		setData({ ...data, [target.name]: target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (expectedData.every((key) => data.hasOwnProperty(key) && data[key])) {
			try {
				await auth.login(data);
				toast("Successfully signed in.");
				history.push("/");
			} catch (_error) {
				const error = _error.response?.data;
				toast.error(error?.message || "Unknown error occured. Try again later.");
			}
		}
	};

	return (
		<div className="container form-container">
			<div className="content">
				<h1>Sign in</h1>
				<form onChange={handleChange} onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="username" className="required">
							Username
						</label>
						<input className="form-control" type="text" required name="username" id="username" />
					</div>
					<div className="form-group">
						<label htmlFor="password" className="required">
							Password
						</label>
						<input className="form-control" type="password" required name="password" id="password" />
					</div>
					<div className="form-group d-flex align-items-center">
						<Link to="/sign-up">Create account</Link>
						<button type="submit" className="btn btn-primary ml-auto">
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export const SignUp = () => {
	const auth = useAuth();
	const history = useHistory();
	const expectedData = ["username", "password", "passwordConfirm"];
	const [data, setData] = useState({});

	const refPasswordConfirm = useRef(null);

	const handleChange = (e) => {
		const target = e.target;
		setData({ ...data, [target.name]: target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (expectedData.every((key) => data.hasOwnProperty(key) && data[key])) {
			try {
				await auth.register(data);
				toast("Account successfully registered.");
				history.push("/");
			} catch (_error) {
				const error = _error.response?.data;
				toast.error(error?.message || "Unknown error occured. Try again later.");
			}
		}
	};

	useEffect(() => {
		const setMatchedPasswordValidate = () => {
			if (data.password !== data.passwordConfirm) refPasswordConfirm.current.setCustomValidity("Passwords do not match.");
			else refPasswordConfirm.current.setCustomValidity("");
		};
		setMatchedPasswordValidate();
	}, [data]);

	return (
		<div className="container form-container">
			<div className="content">
				<h1>Create your account</h1>
				<form onChange={handleChange} onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="username" className="required">
							Username
						</label>
						<input className="form-control" type="text" required name="username" id="username" />
					</div>
					<div className="form-group">
						<div className="form-row row-eq-spacing-sm">
							<div className="col-sm">
								<label htmlFor="password" className="required">
									Password
								</label>
								<input className="form-control" type="password" required name="password" id="password" />
							</div>
							<div className="col-sm">
								<label htmlFor="password_confirm" className="required">
									Confirm
								</label>
								<input className="form-control" ref={refPasswordConfirm} type="password" required name="passwordConfirm" id="passwordConfirm" />
							</div>
						</div>
						<p className="form-text">We recommend using 8 or more characters with a mix of letters, numbers & symbols</p>
					</div>

					<div className="form-group d-flex align-items-center">
						<Link to="/sign-in">Sign in instead</Link>
						<button type="submit" className="btn btn-primary ml-auto">
							Create account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
