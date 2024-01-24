import React from "react";

const ChatMessage = ({ message, isSentByMe }) => (
  <div className={`chat-message ${isSentByMe ? "sent-by-me" : "received"}`}>
    <div className="img-container">
      <img src={message.img} alt={`${message.name} profile`} />
    </div>
    <div className="message-content">
      <p className="user-name">{message.name}</p>
      <p>{message.message}</p>
    </div>
  </div>
);

const Chat = ({ descendingOrderMessages }) => (
  <div className="chat-display">
    {descendingOrderMessages.map((message, index) => (
      <ChatMessage
        key={index}
        message={message}
        isSentByMe={message.sentByMe}
      />
    ))}
  </div>
);

export default Chat;
