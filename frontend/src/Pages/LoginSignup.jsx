import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle between Login and Signup
  const toggleState = () => {
    setState(state === "Login" ? "Signup" : "Login");
  };

  // Signup function
  const signup = async () => {
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('auth-token', data.token);
        navigate('/'); // Redirect to home page
      } else {
        alert(data.message || "Failed to sign up. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  // Login function
  const login = async () => {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('auth-token', data.token);
        navigate('/'); // Redirect to home page
      } else {
        alert(data.message || "Failed to log in. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state === "Signup") {
      await signup();
    } else {
      await login();
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            {state === "Signup" && (
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">{state === "Login" ? "Login" : "Continue"}</button>
        </form>
        <p className="loginsignup-login">
          {state === "Login" ? (
            <>
              Don't have an account?{" "}
              <span onClick={toggleState}>Sign up here</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={toggleState}>Login here</span>
            </>
          )}
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" id="agree" />
          <p>By continuing, I agree to the terms of use and privacy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
