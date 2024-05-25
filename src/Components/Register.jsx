import React, { useState } from "react";
import Header from "./Other/Header";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

const Register = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		password: "",
		role: "Buyer",
	});
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [userExist, setUserExist] = useState(false);
	const authContext = useAuth();

	const handleChange = (e) => {
		const { name, value } = e.target; //name : firstName, email etc and value its input value
		setFormData({ ...formData, [name]: value });
	};

	const validate = () => {
		const newErrors = {};
		if (
			!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
		) {
			newErrors.email = "Invalid email address";
		}
		if (formData.password.length < 4) {
			newErrors.password = "Password must be at least 4 characters long";
		}
		if (!formData.phone.match(/^[0-9]{10}$/)) {
			newErrors.phone = "Phone number must be 10 digits long";
		}
		return newErrors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validate();
		if (Object.keys(validationErrors).length === 0) {
			authContext
				.register(
					formData.firstName,
					formData.lastName,
					formData.email,
					formData.phone,
					formData.password,
					formData.role
				)
				.then(() => {
					navigate("/");
				})
				.catch((response) => {
					setUserExist(true);
					console.log("Network error ", response.status);
				})
				.finally(setUserExist(false));
			setErrors({});
			console.log("Form submitted", formData);
		} else {
			setErrors(validationErrors);
		}
	};

	return (
		<div>
			<Header />
			<div className="sign-in__wrapper">
				<div className="sign-in__backdrop"></div>
				<form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
					<div className="text-center">
						<h3>Register Here</h3>
					</div>
					<div className="row mb-3">
						<div className="col">
							<label>First Name</label>
							<input
								type="text"
								name="firstName"
								className="form-control"
								placeholder="First Name"
								value={formData.firstName}
								onChange={handleChange}
							/>
						</div>
						<div className="col">
							<label>Last Name</label>
							<input
								type="text"
								name="lastName"
								className="form-control"
								placeholder="Last Name"
								value={formData.lastName}
								onChange={handleChange}
							/>
						</div>
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
						<label>Phone</label>
						<input
							type="number"
							name="phone"
							className="form-control"
							placeholder="Enter mobile no"
							value={formData.phone}
							onChange={handleChange}
						/>
						{errors.phone && <div className="text-danger">{errors.phone}</div>}
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
						{errors.password && (
							<div className="text-danger">{errors.password}</div>
						)}
					</div>
					<div className="form-group mb-3">
						<label className="mb-2" htmlFor="role">
							Are you a property seller?
						</label>
						<select
							className="form-control"
							id="role"
							name="role"
							value={formData.role}
							onChange={handleChange}
						>
							<option value="Seller">Yes</option>
							<option value="Buyer">No</option>
						</select>
					</div>
					<div className="d-grid">
						<button type="submit" className="btn btn-warning">
							Submit
						</button>
					</div>
					<p className="d-flex justify-content-end text-muted mt-3">
						Existing User? Login <a href="/login">Here</a>
					</p>
					{userExist && (
						<div className="text-danger text-center mt-5">
							User already existed, please login.
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default Register;
