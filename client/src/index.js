import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CountdownTimer from "./components/CountdownTimer";
import UserCount from "./components/UserCount";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <div
      style={{
        display: "flex",
        flexDirection: "column",

        height: "100vh",
      }}
    >
      <CountdownTimer />
    </div> */}
    <App />
  </React.StrictMode>
);
