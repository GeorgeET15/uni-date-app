import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openVerificationDialog, setOpenVerificationDialog] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerificationDialogClose = () => {
    setOpenVerificationDialog(false);
  };

  const handleVerificationDialogSubmit = async () => {
    try {
      const response = await axios.post(
        `https://uni-date-app.onrender.com/verify`,
        { email, verificationCode }
      );

      if (response.data.success) {
        setCookie("AuthToken", response.data.token);
        setCookie("UserId", response.data.userId);

        const success = response.status === 201;
        if (success && isSignUp) navigate("/onboarding");
        if (success && !isSignUp) navigate("/dashboard");

        window.location.reload();
      } else {
        setError("Verification failed. Please check the code and try again.");
      }
    } catch (error) {
      setError("An error occurred during verification.");
    } finally {
      setOpenVerificationDialog(false);
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (email === "reveal@creator" && password === "123") {
        setError("Please use a valid RSET email id");
        navigate("/creator");
      }

      if (!email.endsWith("@rajagiri.edu.in")) {
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
        { email, password }
      );
      console.log("Login API Response:", response);
      if (isSignUp) {
        setOpenVerificationDialog(true);
      } else {
        // Move the login logic outside of the 'else' block
        if (response.data.success) {
          setCookie("AuthToken", response.data.token);
          setCookie("UserId", response.data.userId);
          console.log(cookies);

          const success = response.status === 201;
          if (success) navigate("/dashboard");

          window.location.reload();
        } else {
          setError(
            response.data.error || "An error occurred during authentication."
          );
        }
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

      <Dialog
        open={openVerificationDialog}
        onClose={handleVerificationDialogClose}
      >
        <DialogTitle sx={{ color: "#a27ef8" }}>
          Account Verification
        </DialogTitle>
        <DialogContent>
          <p>Please enter the verification code sent to your email.</p>
          <input
            type="text"
            id="verification-code"
            name="verification-code"
            placeholder="Enter Verification Code"
            onChange={handleVerificationCodeChange}
            style={{
              padding: "8px",
              margin: "8px",
              fontSize: "17px",
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleVerificationDialogClose}>
            Cancel
          </Button>
          <Button
            sx={{ color: "#5c1df4" }}
            variant="outlined"
            onClick={handleVerificationDialogSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AuthModal;
