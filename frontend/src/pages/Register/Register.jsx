// Register.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileText, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import "./Register.css";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const toast = ({ title, description, variant }) => {
    // Simulate toastModel functionality
    const toastModel = ({ title, description, variant }) => {
      console.log(`${title}: ${description} ${variant ? `(${variant})` : ""}`);
    };

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!name || !email || !password || !confirmPassword) {
        toast.error("Please fill in all fields", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      if (!agreeTerms) {
        toast.warning("You must agree to the terms and conditions", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      const formData = new FormData();
      formData.append("username", name);
      formData.append("email", email);
      formData.append("password", password);
      setIsLoading(true);
      const response = await axios.post(apiUrl + "users/create/", formData);
      setIsLoading(true);

      try {
        await axios.post(apiUrl + "users/create/", formData);

        setTimeout(() => {
          setIsLoading(false);
          setSuccess(true);
          toast.success("Your account has been successfully created!", {
            position: "top-right",
            autoClose: 3000,
          });

          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }, 1500);
      } catch (error) {
        setIsLoading(false);
        toast.error("Registration failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };
  };

  const getPasswordStrength = () => {
    if (!password) return null;

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return (
      <div className="password-strength">
        <div className="strength-bars">
          <div className={`strength-bar ${strength >= 1 ? "weak" : ""}`}></div>
          <div
            className={`strength-bar ${strength >= 2 ? "medium" : ""}`}
          ></div>
          <div
            className={`strength-bar ${strength >= 3 ? "strong" : ""}`}
          ></div>
          <div
            className={`strength-bar ${strength >= 4 ? "very-strong" : ""}`}
          ></div>
        </div>
        <p className="strength-text">
          {strength === 0 && "Very weak"}
          {strength === 1 && "Weak"}
          {strength === 2 && "Medium"}
          {strength === 3 && "Strong"}
          {strength === 4 && "Very strong"}
        </p>
      </div>
    );
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} className="back-arrow" />
          <span>Back to Home</span>
        </Link>

        <div className="register-wrapper">
          <div className="register-form">
            <div className="logo-section">
              <Link to="/" className="logo-link">
                <div className="logo-icon">
                  <FileText size={20} />
                </div>
                <span className="logo-text">LegiFy</span>
              </Link>
            </div>

            <div className="card">
              {success ? (
                <div className="success-message">
                  <div className="success-icon">
                    <CheckCircle2 size={36} />
                  </div>
                  <h2 className="success-title">Registration Successful!</h2>
                  <p className="success-text">
                    Your account has been created successfully. You're being
                    redirected to the dashboard.
                  </p>
                  <div className="success-button">
                    <Link to="/dashboard">
                      <button className="btn">Continue to Dashboard</button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="card-header">
                    <h2 className="card-title">Create an account</h2>
                    <p className="card-description">
                      Enter your information to get started
                    </p>
                  </div>
                  <div className="card-content">
                    <form onSubmit={handleSubmit} className="form">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          id="name"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="new-password"
                          required
                        />
                        {getPasswordStrength()}
                      </div>
                      <div className="form-group">
                        <label htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={
                            confirmPassword && password !== confirmPassword
                              ? "error"
                              : ""
                          }
                          autoComplete="new-password"
                          required
                        />
                        {confirmPassword && password !== confirmPassword && (
                          <p className="error-text">Passwords do not match</p>
                        )}
                      </div>
                      <div className="checkbox-group">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                        />
                        <label htmlFor="terms">
                          I agree to the{" "}
                          <Link to="/terms" className="terms-link">
                            terms and conditions
                          </Link>
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="submit-btn"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="loading">
                            <Loader2 size={16} className="spinner" />
                            Creating account...
                          </span>
                        ) : (
                          "Create account"
                        )}
                      </button>
                    </form>

                    <div className="login-link">
                      <p>
                        Already have an account?{" "}
                        <Link to="/login" className="login">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
