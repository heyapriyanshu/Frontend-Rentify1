import React, { useState } from "react";
import Header from "./Other/Header";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const authContext = useAuth();
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [userExist, setUserExist] = useState(true);
	const [passNotMatch, setPassNotMatch] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const validate = () => {
		const newErrors = {};
		if (
			!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
		) {
			newErrors.email = "Invalid email address";
		}

		return newErrors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validate();

		if (Object.keys(validationErrors).length === 0) {
			authContext
				.login(formData.email, formData.password)
				.then((isAuthenticated) => {
					if (isAuthenticated) {
						navigate("/");
						setPassNotMatch(false);
						setUserExist(true);
					} else {
						console.log("wrong pass");
						setPassNotMatch(true);
					}
				})
				.catch((error) => {
					setUserExist(false);
					console.log("Network error ", error);
				});
			setErrors({});
			console.log("Form submitted", formData);
		} else {
			setErrors(validationErrors);
		}
	};

	return (
		<div>
			<Header />
			{/* <div className="container d-flex justify-content-center align-items-center min-vh-100 " > */}
			<div className="sign-in__wrapper">
				{/* Overlay */}
				<div className="sign-in__backdrop"></div>
				<form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
					<div className="text-center">
						<h3>Sign In</h3>
					</div>
					<div className="mb-3">
						<label>Email address</label>
						<input
							type="email"
							name="email"
							className="form-control"
							placeholder="Enter email"
							value={formData.email}
							onChange={handleChange}
						/>
						{errors.email && <div className="text-danger">{errors.email}</div>}
					</div>
					<div className="mb-3">
						<label>Password</label>
						<input
							type="password"
							name="password"
							className="form-control"
							placeholder="Enter password"
							value={formData.password}
							onChange={handleChange}
						/>
						{passNotMatch && (
							<div className="text-danger">Password doesn't match</div>
						)}
					</div>
					<div className="d-grid">
						<button type="submit" className="btn btn-warning">
							Submit
						</button>
					</div>
					<p className="d-flex justify-content-end text-muted mt-3">
						New User? <a href="/register">Register</a>
					</p>
					{!userExist && (
						<div className="text-danger text-center mt-5">
							User doesn't exist, please register.
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default Login;
