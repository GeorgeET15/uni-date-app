import React, { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./Chat";
import ChatInput from "./ChatInput";
import { Skeleton } from "@mui/material";

const ChatDisplay = ({ user, clickedUser }) => {
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;
  const [usersMessages, setUsersMessages] = useState(null);
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const usersMessagesResponse = await axios.get(
        "https://uni-date-app.onrender.com/messages",
        { params: { userId, correspondingUserId: clickedUserId } }
      );
      setUsersMessages(usersMessagesResponse.data);

      const clickedUsersMessagesResponse = await axios.get(
        "https://uni-date-app.onrender.com/messages",
        { params: { userId: clickedUserId, correspondingUserId: userId } }
      );
      setClickedUsersMessages(clickedUsersMessagesResponse.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Set up interval to fetch messages every 5 seconds
    const intervalId = setInterval(fetchMessages, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [userId, clickedUserId]); // Add dependencies to ensure the effect runs when user IDs change

  const messages = [];

  usersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = user?.first_name;
    formattedMessage["img"] = user?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  clickedUsersMessages?.forEach((message) => {
    const formattedMessage = {};
    formattedMessage["name"] = clickedUser?.first_name;
    formattedMessage["img"] = clickedUser?.url;
    formattedMessage["message"] = message.message;
    formattedMessage["timestamp"] = message.timestamp;
    messages.push(formattedMessage);
  });

  const descendingOrderMessages = messages?.sort((a, b) =>
    a.timestamp.localeCompare(b.timestamp)
  );

  return (
    <>
      {loading ? (
        <div className="skeleton-container">
          <Skeleton
            variant="rectangular"
            animation="wave"
            height={50}
            style={{ marginBottom: 16 }}
          />
        </div>
      ) : (
        <Chat descendingOrderMessages={descendingOrderMessages} />
      )}
      <ChatInput
        user={user}
        clickedUser={clickedUser}
        getUserMessages={fetchMessages}
        getClickedUsersMessages={fetchMessages}
      />
    </>
  );
};

export default ChatDisplay;
