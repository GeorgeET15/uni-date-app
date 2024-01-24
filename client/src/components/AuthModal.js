import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const img = "../images/bw.png";

const AuthModal = ({ setShowModal, isSignUp }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  let navigate = useNavigate();

  console.log(email, password, confirmPassword);

  const handleClick = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // if (!email.endsWith("@rajagiri.edu.in")) {
      //   setError("Please use a valid email ending with @rajagiri.edu.in");
      //   return;
      // }

      if (isSignUp && password !== confirmPassword) {
        setError("Passwords need to match!");
        return;
      }

      const response = await axios.post(
        `https://tinder-clone-test-a0p4.onrender.com/${
          isSignUp ? "signup" : "login"
        }`,
        { email, password }
      );

      setCookie("AuthToken", response.data.token);
      setCookie("UserId", response.data.userId);

      const success = response.status === 201;
      if (success && isSignUp) navigate("/onboarding");
      if (success && !isSignUp) navigate("/dashboard");

      window.location.reload();
    } catch (error) {
      console.log(error);
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
        <a style={{ color: "" }} href="https://www.github.com">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a style={{ color: "" }} href="https://www.github.com">
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
          <input
            type="password"
            id="password-check"
            name="password-check"
            placeholder="confirm password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
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
