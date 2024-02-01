import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  function calculateTimeRemaining() {
    const now = new Date();
    const targetTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      11,
      0
    ); // 11:11 PM

    let difference = targetTime - now;
    if (difference < 0) {
      difference += 24 * 60 * 60 * 1000; // add 24 hours if the target time has passed
    }

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <h2
        style={{
          color: "#5c1df4",
          fontSize: "36px",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        UniDate Launch Countdown
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div style={digitStyle}>
          <span style={numberStyle}>{timeRemaining.hours}</span>
          <span style={labelStyle}>Hours</span>
        </div>
        <span style={{ fontSize: "30px", margin: "0 10px" }}>:</span>
        <div style={digitStyle}>
          <span style={numberStyle}>{timeRemaining.minutes}</span>
          <span style={labelStyle}>Minutes</span>
        </div>
        <span style={{ fontSize: "30px", margin: "0 10px" }}>:</span>
        <div style={digitStyle}>
          <span style={numberStyle}>{timeRemaining.seconds}</span>
          <span style={labelStyle}>Seconds</span>
        </div>
      </div>
      <p style={{ color: "#7f4ef6", fontSize: "18px", marginTop: "20px" }}>
        Get ready for the launch! 🚀
      </p>
    </div>
  );
};

const digitStyle = {
  background: "#5c1df4",
  color: "#fff",
  padding: "10px",
  borderRadius: "8px",
  margin: "0 5px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const numberStyle = {
  fontSize: "36px",
  fontWeight: "bold",
};

const labelStyle = {
  fontSize: "14px",
  marginTop: "5px",
};

export default CountdownTimer;
