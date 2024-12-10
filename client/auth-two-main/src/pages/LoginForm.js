import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginFetch } from "../api/loginFetch";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
	const { user,setUser } = useContext(AuthContext);
	/* 
	datos del formulario
   */
	const [formData, setFormData] = useState({
		email: 'tomas@test.com',
		password: '123456',
	});

	/* 
	validacion de formulario y navegacion entre las rutas
   */
	const [error, setError] = useState(null);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	/* 
	obtener los datos del formulario de login
   */
	//const navigate = useNavigate();

	const handleSubmit  = async (e) => {
		e.preventDefault();
		try {
			const {access} = await loginFetch(formData);
			//login(access);
            //localStorage.setItem("access", access);
			 if (access) {

			   setUser({
			     firstname: "jonathan",
			     lastname: "cabrera",
			     email: "jona@test.static.com",
			   });
			   console.log(user)
			}
			setError("");
			//navigate("/home");
		  } catch (error) {
			console.log(error);
			setError("Error de servidor");
		  }
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>
			<div>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleInputChange}
				/>
			</div>
			<div>
				<input
					type="password"
					name="password"
					placeholder="Contraseña"
					value={formData.password}
					onChange={handleInputChange}
				/>
			</div>
			{error && <p className="alert alert-danger">{error}</p>}
			<button type="submit">Login</button>
			<p>
				¿No tienes una cuenta? <Link to="/">Regístrate</Link>
			</p>
		</form>
	);
};

export default LoginForm;
