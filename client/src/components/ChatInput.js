import { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = ({
  user,
  clickedUser,
  getUserMessages,
  getClickedUsersMessages,
}) => {
  const [textArea, setTextArea] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const userId = user?.user_id;
  const clickedUserId = clickedUser?.user_id;

  const addMessage = async () => {
    // Check if the textarea is empty
    if (textArea.trim() === "") {
      return; // Do nothing if it's empty
    }

    const message = {
      timestamp: new Date().toISOString(),
      from_userId: userId,
      to_userId: clickedUserId,
      message: textArea,
    };

    try {
      setLoading(true);
      await axios.post("https://uni-date-app.onrender.com/message", {
        message,
      });
      getUserMessages();
      getClickedUsersMessages();
      setTextArea("");
    } catch (error) {
      console.error("Error adding message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-input">
      <textarea
        placeholder="Type your message..."
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <button className="send-button" onClick={addMessage} disabled={loading}>
        {loading ? <CircularProgress size={20} color="inherit" /> : <>send</>}
      </button>
    </div>
  );
};

export default ChatInput;
