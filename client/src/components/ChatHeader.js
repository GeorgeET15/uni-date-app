import React from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

function ChatHeader({ user, onCloseDrawer }) {
  let navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="chat-container-header">
      <div className="profile">
        <div className="img-container">
          <img src={user.url} alt="photo" onClick={navigateToProfile} />
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <CloseIcon
        onClick={onCloseDrawer}
        sx={{ marginRight: "20px", color: "white" }}
      />
    </div>
  );
}

export default ChatHeader;
