import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { TbLockPassword } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { FaEye, FaEyeSlash, FaGraduationCap } from "react-icons/fa";

const ROLE_CREDENTIALS = {
  admin: { id: "admin@fyp.edu", password: "admin123" },
  judge: { id: "judge@fyp.edu", password: "judge123" },
};

function Login({ role, setRole }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role) {
      setError("Please select a role first.");
      return;
    }

    if (!name.trim() || !password) {
      setError("Please fill in both fields.");
      return;
    }

    const required = ROLE_CREDENTIALS[role];
    const idMatches = name.trim().toLowerCase() === required.id.toLowerCase();
    const passwordMatches = password === required.password;

    if (!idMatches || !passwordMatches) {
      setError(`Incorrect ID/email or password for ${role === "admin" ? "Admin" : "Judge"}.`);
      return;
    }

    setError("");
    navigate("/admin-dashboard");
  };

  return (
    <div className="Login-container">
      <div className="Left-container">
        <div className="seal">
          <FaGraduationCap className="seal-icon" />
        </div>
        <h3>Academic Nexus</h3>
        <h1>Final Year Project Evaluation System</h1>
        <p>
          Review, evaluate and manage university projects efficiently with our
          precision-engineered evaluation tool.
        </p>
      </div>

      <div className="right-container">
        <div className="form-card">
          <h3>Welcome back</h3>
          <p>Please sign in to access your portal</p>

          <div className="role-switch">
            <button
              type="button"
              className={role === "admin" ? "role-option active-role-btn" : "role-option"}
              onClick={() => {
                setRole("admin");
                setError("");
              }}
            >
              Admin
            </button>
            <button
              type="button"
              className={role === "judge" ? "role-option active-role-btn" : "role-option"}
              onClick={() => {
                setRole("judge");
                setError("");
              }}
            >
              Judge
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="login-id">
              {role === "admin"
                ? "Admin ID or email"
                : "Judge ID or email"}
            </label>

            <div className="name-container">
              <CiUser className="name-icon" />
              <input
                id="login-id"
                placeholder={role === "admin" ? "e.g. admin@fyp.edu" : "e.g. judge@fyp.edu"}
                type="text"
                className="name-input"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <label htmlFor="login-password">Password</label>
            <div className="password-container">
              <TbLockPassword className="password-icon" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                className="password-input"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {showPassword ? (
                <FaEyeSlash
                  className="right-icon"
                  onClick={() => setShowPassword(false)}
                  aria-label="Hide password"
                />
              ) : (
                <FaEye
                  className="right-icon"
                  onClick={() => setShowPassword(true)}
                  aria-label="Show password"
                />
              )}
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="sign-in-btn">
              Sign in as {role === "admin" ? "Admin" : "Judge"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;