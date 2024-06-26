import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import Drawer from "@mui/material/Drawer";
import TinderCard from "react-tinder-card";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ChatContainer from "../components/ChatContainer";
import colorImage from "../images/logo.png";
import UserCount from "../components/UserCount";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isChatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingD, setLoadingD] = useState(false);
  const [isMilestonesDialogOpen, setMilestonesDialogOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [maleUsers, setMaleUsers] = useState(0);
  const [femaleUsers, setFemaleUsers] = useState(0);

  const userId = cookies.UserId;

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch("https://uni-date-app.onrender.com/total-registered-users");
        const data = await response.json();
        if (response.ok) {
          setTotalUsers(data.totalRegisteredUsers);
          setMaleUsers(data.maleUsers);
          setFemaleUsers(data.femaleUsers);
          console.log(data);
        } else {
          console.error("Error fetching total registered users:", data.error);
        }
      } catch (error) {
        console.error("Error fetching total registered users:", error.message);
      }
    };

    fetchTotalUsers();
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getGenderedUsers();
    }
  }, [user]);

  const getUser = async () => {
    try {
      const response = await axios.get("https://uni-date-app.onrender.com/user", { params: { userId } });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get("https://uni-date-app.onrender.com/gendered-users", {
        params: { gender: user?.gender_interest },
      });
      const reversedUsers = response.data.slice().reverse();
      setGenderedUsers(reversedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMatches = async (matchedUserId, isLiked) => {
    try {
      await axios.put("https://uni-date-app.onrender.com/addmatch", {
        userId,
        matchedUserId,
        isLiked,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  const swiped = (direction, swipedUserId) => {
    if (direction === "right") {
      updateMatches(swipedUserId, true);
    } else if (direction === "left") {
      updateMatches(swipedUserId, false);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches?.map(({ user_id }) => user_id).concat(userId);

  const filteredGenderedUsers = genderedUsers?.filter(
    (genderedUser) =>
      !matchedUserIds.includes(genderedUser.user_id) &&
      user?.matches.every((match) => match.user_id !== genderedUser.user_id)
  );

  const toggleChatDrawer = () => {
    setChatDrawerOpen(!isChatDrawerOpen);
  };

  const handleOpenMilestonesDialog = () => {
    setMilestonesDialogOpen(true);
    setLoadingD(true);
    setTimeout(() => {
      setLoadingD(false);
    }, 3000);
  };

  const handleCloseMilestonesDialog = () => {
    setMilestonesDialogOpen(false);
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress style={{ color: "#a27ef8" }} />
        </div>
      )}

      {!loading && user && (
        <div className="dashboard">
          {isMobile ? (
            <>
              <div className="show-info-button">
                <InfoIcon onClick={handleOpenMilestonesDialog} />
              </div>
              <button className="show-matches-button" onClick={toggleChatDrawer}>
                Show Matches
              </button>
              <Drawer
                anchor="bottom"
                open={isChatDrawerOpen}
                onClose={toggleChatDrawer}
                PaperProps={{
                  style: {
                    width: "100%",
                    height: "100%",
                  },
                }}
              >
                <ChatContainer user={user} onCloseDrawer={toggleChatDrawer} />
              </Drawer>
            </>
          ) : (
            <ChatContainer user={user} />
          )}

          <div className="swipe-container">
            <div className="card-container">
              {filteredGenderedUsers && filteredGenderedUsers.length > 0 ? (
                filteredGenderedUsers.map((genderedUser) => (
                  <TinderCard
                    className="swipe"
                    key={genderedUser.user_id}
                    onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                    onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                  >
                    <Dialog
                      open={isMilestonesDialogOpen}
                      onClose={handleCloseMilestonesDialog}
                      BackdropProps={{
                        style: {
                          backgroundColor: "rgba(0, 0, 0, 0)",
                        },
                      }}
                    >
                      <DialogTitle>More Info</DialogTitle>
                      <DialogContent>
                        {loadingD ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100px",
                            }}
                          >
                            <CircularProgress style={{ color: "#a27ef8" }} />
                          </div>
                        ) : (
                          <>
                            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                              {genderedUser?.first_name + " " + genderedUser?.last_name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              Gender: {genderedUser?.gender_identity}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              Age: {2024 - genderedUser?.dob_year}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              Branch: {genderedUser?.branch}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              Year: {genderedUser?.current_year}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                              About: {genderedUser?.about}
                            </Typography>
                          </>
                        )}
                      </DialogContent>
                      <DialogActions>
                        <Button sx={{ color: "#7f4ef6" }} onClick={handleCloseMilestonesDialog}>
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <div
                      style={{ backgroundImage: `url(${genderedUser.url})` }}
                      className="card"
                    >
                      <h3>{genderedUser.first_name}, {2024 - genderedUser.dob_year}</h3>
                    </div>
                  </TinderCard>
                ))
              ) : (
                <div className="no-cards-message">
                  <img src={colorImage} alt="image" />
                  <p>No more cards to display</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
