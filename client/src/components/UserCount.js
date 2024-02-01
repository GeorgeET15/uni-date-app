import React from "react";
import "./UserCount.css";

const UserCount = ({ totalUsers }) => {
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
        <h2 className="title">Welcome to UniVerse!</h2>

        <p className="content">
          Thank you for joining UniVerse! Swipe cards will activate once we
          reach a minimum of 50 registered users. We appreciate your patience
          and look forward to enhancing your UniVerse experience.
        </p>

        <p className="spread-word">
          Spread the word! Let your friends know about UniVerse and help us grow
          our community. 🌐
        </p>
        <h2 className="total-users">
          Total Registered Users:{" "}
          <span style={{ color: "#ffac41" }}>{totalUsers}</span> 🌟
        </h2>
      </div>
    </div>
  );
};

export default UserCount;
