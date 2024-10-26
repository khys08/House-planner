import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import "./Auth.css";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loginData, setLoginData] = useState({ email: "", password: "", role: "" });
    const [signupData, setSignupData] = useState({
        email: "",
        role: "", 
        password: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setError(""); 
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/login/", {
            method: "POST",
            body: JSON.stringify({ ...loginData }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (response.ok) {
            const json = await response.json();
            console.log("Login successful:", json);
            
            if (json.role === "Architect") {
                navigate('/Build-house');
            } else if (json.role === "User") {
                navigate('/search-house');
            }
        } else {
            const json = await response.json();
            setError(json.error || "Login failed");
            console.log("Login failed:", json);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/signIn/", {
            method: "POST",
            body: JSON.stringify({ ...signupData }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (response.ok) {
            const json = await response.json();
            console.log("Signup successful:", json);
            setIsLogin(true); 
        } else {
            const json = await response.json();
            setError(json.error || "Signup failed");
            console.log("Signup failed:", json);
        }
    };

    return (
        <div className="auth-box">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            {error && <div className="error-message">{error}</div>} 
            {isLogin ? (
                <form onSubmit={handleLoginSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Role:</label>
                        <select
                            name="role"
                            value={loginData.role}
                            onChange={handleLoginChange}
                            required
                            className="form-control"
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="Architect">Architect</option>
                            <option value="User">User</option>
                        </select>
                    </div>
                    <button type="submit" className="primary-btn">Login</button>
                </form>
            ) : (
                <form onSubmit={handleSignupSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={signupData.email}
                            onChange={handleSignupChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={signupData.password}
                            onChange={handleSignupChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Role:</label>
                        <select
                            name="role"
                            value={signupData.role}
                            onChange={handleSignupChange}
                            required
                            className="form-control"
                        >
                            <option value="" disabled>Select your role</option>
                            <option value="Architect">Architect</option>
                            <option value="User">User</option>
                        </select>
                    </div>
                    <button type="submit" className="primary-btn">Sign Up</button>
                </form>
            )}
            <p className="toggle-link" onClick={toggleAuthMode}>
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </p>
        </div>
    );
};

export default Auth;
