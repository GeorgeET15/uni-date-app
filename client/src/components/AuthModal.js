import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (
        !email.endsWith("@rajagiri.edu.in") ||
        !email.startsWith("u") ||
        !email.startsWith("U")
      ) {
        setError("Please use a valid RSET email id");
        return;
      }

      if (password.length < 7) {
        throw new Error("Password must be at least 7 characters long.");
      }

      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (!hasNumber || !hasSpecialChar) {
        throw new Error(
          "Password must include at least one number and one special character."
        );
      }

      if (isSignUp && password !== confirmPassword) {
        throw new Error("Passwords need to match!");
      }

      const response = await axios.post(
        `https://uni-date-app.onrender.com/${isSignUp ? "signup" : "login"}`,
        { email, password, verificationCode }
      );

      if (response.data.success) {
        setCookie("AuthToken", response.data.token);
        setCookie("UserId", response.data.userId);

        const success = response.status === 201;
        if (success && isSignUp) navigate("/onboarding");
        if (success && !isSignUp) navigate("/dashboard");

        window.location.reload();
      } else {
        setError(
          response.data.error || "An error occurred during authentication."
        );
      }
    } catch (error) {
      setError(error.message || "An error occurred during authentication.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-modal">
      <div className="close-icon" onClick={handleClick}>
        ⓧ
      </div>

      <h2 style={{ color: "#a27ef8" }}>
        {isSignUp ? "CREATE ACCOUNT" : "LOG IN"}
      </h2>
      <p style={{ color: "#a27ef8" }}>
        By clicking Log In, you agree to our terms. Learn how we process your
        data in our{" "}
        <a style={{ color: "" }} href="privacypolicy">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a style={{ color: "" }} href="cookiepolicy">
          Cookie Policy
        </a>
        .
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <>
            <input
              type="password"
              id="password-check"
              name="password-check"
              placeholder="confirm password"
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="email"
              id="verification-code"
              name="verification-code"
              placeholder="verification code"
              required={true}
              onChange={handleVerificationCodeChange}
            />
          </>
        )}
        <div>
          <input
            type="submit"
            className={`secondary-button ${isSubmitting && "disabled"}`}
            disabled={isSubmitting}
          />

          {isSubmitting && (
            <Backdrop
              sx={{
                color: "#ffff", // Custom color for the Backdrop
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={isSubmitting}
            >
              <CircularProgress style={{ color: "#a27ef8" }} />{" "}
            </Backdrop>
          )}
        </div>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default AuthModal;
