import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const UserCount = ({ totalUsers }) => {
  const navigate = useNavigate();
  const styles = `
    @property --rotate {
      syntax: "<angle>";
      initial-value: 132deg;
      inherits: false;
    }

    :root {
      --card-height: 65vh;
      --card-width: calc(var(--card-height) / 1.5);
    }

    body {
      min-height: 100vh;
      background: #212534;
      display: flex;
      align-items: center;
      justify-content: center; /* Center content horizontally */
      flex-direction: column;
      padding-top: 2rem;
      padding-bottom: 2rem;
      box-sizing: border-box;
    }

    .card {
      background: #191c29;
      width: var(--card-width);
      height: 550px;
      padding: 3px;
      position: relative;
      border-radius: 6px;
      justify-content: center;
      align-items: center;
      text-align: center;
      display: flex;
      flex-direction: column; /* Stack child elements vertically */
      font-size: 1.5em;
      color: #fff;
      cursor: pointer;
      font-family: cursive;
    }

    .card:hover {
      color: #58c7fa;
      transition: color 1s;
    }

    .card:hover:before,
    .card:hover:after {
      animation: none;
      opacity: 0;
    }

    .card::before {
      content: "";
      width: 104%;
      height: 102%;
      border-radius: 8px;
      background-image: linear-gradient(
        var(--rotate),
        #75fcce, #a7fde0 43%, #5c1df4
      );
      position: absolute;
      z-index: -1;
      top: -1%;
      left: -2%;
      animation: spin 2.5s linear infinite;
    }

    .card::after {
      position: absolute;
      content: "";
      top: calc(var(--card-height) / 6);
      left: 0;
      right: 0;
      z-index: -1;
      height: 100%;
      width: 100%;
      margin: 0 auto;
      transform: scale(0.8);
      filter: blur(calc(var(--card-height) / 6));
      background-image: linear-gradient(
        var(--rotate),
        #5ddcff, #3c67e3 43%, #4e00c2
      );
      opacity: 1;
      transition: opacity .5s;
      animation: spin 2.5s linear infinite;
    }

    @keyframes spin {
      0% {
        --rotate: 0deg;
      }
      100% {
        --rotate: 360deg;
      }
    }

    a {
      color: #212534;
      text-decoration: none;
      font-family: sans-serif;
      font-weight: bold;
      margin-top: 2rem;
    }
  `;

  // Create a style element and set its content to the styles
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;

  // Append the style element to the document's head
  document.head.appendChild(styleElement);

  const navigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "20px",
        }}
      >
        <h2
          style={{
            color: "#5c1df4",
            marginBottom: "20px",
            fontSize: "25px",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Welcome to UniVerse!
        </h2>

        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "16px",
          }}
        >
          Thank you for joining UniVerse! Swipe cards will activate once we
          reach a minimum of 50 registered users. We appreciate your patience
          and look forward to enhancing your UniVerse experience.
        </p>

        <p
          style={{
            textAlign: "center",
            color: "#58c7fa",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Spread the word! Let your friends know about UniVerse and help us grow
          our community. 🌐
        </p>
        <h2
          style={{
            color: "#5c1df4",
            marginBottom: "20px",
            fontSize: "25px", // Increase font size
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            paddingBottom: "10px", // Add some space below the heading
          }}
        >
          Total Registered Users:{" "}
          <span style={{ color: "#ffac41" }}>{totalUsers}</span> 🌟
        </h2>
      </div>
      <Button
        onClick={navigateToProfile}
        variant="outlined"
        sx={{ color: "#5c1df4", marginBottom: "30px" }}
      >
        Profile
      </Button>
    </div>
  );
};

export default UserCount;
