import React, { useState } from "react";
import "./style.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    let formIsValid = true;
    const errors = {};

    //Username validation
    if (!username.trim()) {
      errors.username = "Username is required.";
      formIsValid = false;
    } else if (!/[A-Z]/.test(username)) {
      errors.username = "Username must contain at least one uppercase letter.";
      formIsValid = false;
    }
    //Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    if (!password) {
      errors.password = "Password is required.";
      formIsValid = false;
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, and one number.";
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      //Reset Form Data and navigate
      setTimeout(() => {
        setUsername("");
        setPassword("");
        navigate("/employee-view");
      }, 1000);
      console.log("Form submitted successfully");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className="container-fluid">
      <div className="row gy-5">
        <div className="col-6 ps-0">
          <div className="homepage"></div>
        </div>
        <div className="col-6 d-flex flex-column justify-content-center align-items-center gap-2">
          <div className="w-75 fw-semibold">
            <h5 className="mb-5">Welcome Back !</h5>
            <h3 className="home-title">Sign in to</h3>
            <p className="mb-5">Lorem Ipsum is simply</p>
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-column gap-2 mb-4">
                <label htmlFor="username">User name</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your User name"
                  className={`p-2 px-3 form-control${
                    errors.username ? " text-danger border-danger" : ""
                  }`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <p className="text-danger">{errors.username}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="mb-2">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    placeholder="Enter your Password"
                    className={`form-control form-control-pass p-2 px-3${
                      errors.password ? " text-danger border-danger" : ""
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="input-group-text"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer", background: "transparent" }}
                  >
                    {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-danger">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-success w-100 mt-4 login-btn p-3 border-0 fs-5"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
