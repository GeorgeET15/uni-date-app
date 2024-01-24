import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import Skeleton from "@mui/material/Skeleton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const MatchesDisplay = ({ matches, setClickedUser }) => {
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [selectedUser, setSelectedUser] = useState(null); // Track the selected user
  const [openDialog, setOpenDialog] = useState(false);
  const [isMilestonesDialogOpen, setMilestonesDialogOpen] = useState(false);

  const matchedUserIds = matches.map(({ user_id }) => user_id);
  const userId = cookies.UserId;

  const getMatches = async () => {
    try {
      const response = await axios.get(
        "https://tinder-clone-test-a0p4.onrender.com/users",
        {
          params: { userId: JSON.stringify(matchedUserIds) },
        }
      );
      setMatchedProfiles(response.data);
    } catch (error) {
      console.log(error);
      setMatchedProfiles([]);
    }
  };

  useEffect(() => {
    getMatches();
  }, [matches]);

  // Check if matchedProfiles is undefined or null
  if (!matchedProfiles) {
    return <p>Loading...</p>;
  }

  const filteredMatchedProfiles = matchedProfiles.filter(
    (matchedProfile) =>
      matchedProfile.matches.filter((profile) => profile.user_id === userId)
        .length > 0
  );

  const handleImageClick = (user) => {
    setSelectedUser(user); // Set the selected user when image is clicked
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleRemoveClick = async (matchUserId) => {
    try {
      const response = await axios.post(
        "https://tinder-clone-test-a0p4.onrender.com/remove-match",
        {
          userId,
          matchUserId,
        }
      );

      if (response.data.success) {
        console.log("Match removed successfully");
        getMatches();
        window.location.reload();
      } else {
        console.error("Failed to remove match");
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  const handleOpenMilestonesDialog = () => {
    setMilestonesDialogOpen(true);
  };

  const handleCloseMilestonesDialog = () => {
    setMilestonesDialogOpen(false);
  };

  return (
    <div className="matches-display">
      {filteredMatchedProfiles.length === 0 ? (
        <p>No matches yet</p>
      ) : (
        filteredMatchedProfiles.map((match, index) => (
          <div key={index} className="match-card">
            <div
              className="img-container"
              onClick={() => handleImageClick(match)}
            >
              <img src={match?.url} alt={match?.first_name + " profile"} />
            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>Profile Image</DialogTitle>
              <DialogContent>
                <img
                  className="profile-image"
                  src={selectedUser?.url}
                  alt={selectedUser?.first_name + " profile"}
                />
              </DialogContent>
            </Dialog>
            <h3 onClick={() => setClickedUser(match)}>{match?.first_name}</h3>
            <button
              className="remove-button"
              onClick={handleOpenMilestonesDialog}
            >
              remove
            </button>
            <Dialog
              open={isMilestonesDialogOpen}
              onClose={handleCloseMilestonesDialog}
            >
              <DialogTitle>
                <Typography variant="h5" color="error">
                  WARNING !!
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Typography variant="body1">
                  Are you sure you want to remove {match?.first_name} from your
                  matches? This action is irreversible and cannot be undone.
                </Typography>
              </DialogContent>

              <DialogActions style={{ justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveClick(match.user_id)}
                >
                  YES
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCloseMilestonesDialog}
                >
                  NO
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        ))
      )}
    </div>
  );
};

export default MatchesDisplay;
