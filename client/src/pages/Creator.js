import React, { useState } from "react";
import Confetti from "react-confetti";

const Creator = () => {
  const [revealSecret, setRevealSecret] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const revealSecretMessage = () => {
    // Create an audio element
    const audio = new Audio(
      "https://gnonbgjivjlnzejovgaw.supabase.co/storage/v1/object/sign/Images/midnight%20city%20m83.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJJbWFnZXMvbWlkbmlnaHQgY2l0eSBtODMubXAzIiwiaWF0IjoxNzA2ODIzNTMzLCJleHAiOjIwMjIxODM1MzN9.L1A3GW8D_qFKnWTDUFnHgYvUcxpPWaZ9b13kc9ycPPw&t=2024-02-01T21%3A38%3A54.287Z"
    );

    // Play the audio
    audio.play();

    // Set revealSecret and confetti state
    setRevealSecret(true);
    setConfetti(true);

    // Reset confetti and pause audio after a short delay
    setTimeout(() => {
      setConfetti(false);
      setRevealSecret(false);
      audio.pause();
    }, 13000);
  };

  // Styles
  const styles = `
    @property --rotate {
      syntax: "<angle>";
      initial-value: 132deg;
      inherits: false;
    }

    :root {
      --card-height: 65vh;
      --card-width: calc(var(--card-height) / 1.5);
      --primary-color: #191c29;
      --secondary-color: #58c7fa;
    }

    body {
      min-height: 100vh;
      background: #212534;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding-top: 2rem;
      padding-bottom: 2rem;
      box-sizing: border-box;
      margin: 0;
    }

    .card {
      background: var(--primary-color);
      width: var(--card-width);
      height: var(--card-height);
      padding: 3px;
      position: relative;
      border-radius: 12px;
      justify-content: center;
      align-items: center;
      text-align: center;
      display: flex;
      flex-direction: column;
      font-size: 1.5em;
      color: #fff;
      cursor: pointer;
      font-family: cursive;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease-in-out;
    }

    .card:hover {
      color: var(--secondary-color);
      transform: scale(1.02);
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
      border-radius: 12px;
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
      transition: opacity 0.5s;
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
      color: var(--secondary-color);
      text-decoration: none;
      font-family: sans-serif;
      font-weight: bold;
      margin-top: 1rem;
      transition: color 0.3s;
    }

    a:hover {
      color: #4fa2d1;
    }

    .confetti-container {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
    }

    .hidden-message {
      cursor: pointer;
      padding: 12px;
      background: var(--secondary-color);
      color: #fff;
      border-radius: 8px;
      margin-top: 2rem;
      font-weight: bold;
      transition: background 0.5s;
    }

    .hidden-message:hover {
      background: #4fa2d1;
    }

    .secret-message {
      margin-top: 20px;
      font-size: 1.2em;
      color: #75fcce;
    }
  `;

  // Create a style element and set its content to the styles
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;

  // Append the style element to the document's head
  document.head.appendChild(styleElement);

  return (
    <div className="card">
      {confetti && (
        <div className="confetti-container">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
      <h1>The Mysterious Creator</h1>
      <p>Unveiling the enigmatic mind behind UniVerse...</p>
      <div
        className={`hidden-message ${revealSecret ? "hidden" : ""}`}
        onClick={revealSecretMessage}
      >
        Don't Click
      </div>
      {revealSecret && (
        <div className="secret-message">
          🔮 The magic happens in the shadows...
        </div>
      )}
      {revealSecret && (
        <a
          href="https://github.com/GeorgeET15"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          Visit my GitHub profile
        </a>
      )}
    </div>
  );
};

export default Creator;
