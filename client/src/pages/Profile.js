import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
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

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isMilestonesDialogOpen, setMilestonesDialogOpen] = useState(false);
  const userId = cookies.UserId;
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://uni-date-app.onrender.com/user",
        {
          params: { userId },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    removeCookie("UserId");
    removeCookie("AuthToken");
    navigate("/");
    window.location.reload();
  };
  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        "https://uni-date-app.onrender.com/delete-user",
        {
          data: { userId }, // Send the userId in the request body
        }
      );

      if (response.data.success) {
        // The user has been deleted successfully, perform necessary actions
        console.log("User deleted successfully");

        // You may want to navigate the user to the login page or perform other actions
      } else {
        // Handle deletion failure
        console.error("Error deleting user:", response.data.error);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      removeCookie("UserId");
      removeCookie("AuthToken");
      navigate("/");
      window.location.reload();
    }
  };

  const handleOpenMilestonesDialog = () => {
    setMilestonesDialogOpen(true);
  };

  const handleCloseMilestonesDialog = () => {
    setMilestonesDialogOpen(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        marginTop: 4,
        backgroundColor: "#ffff",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {loading ? (
          <Skeleton
            variant="circular"
            width={100}
            height={100}
            animation="wave"
            sx={{ marginBottom: 2 }}
          />
        ) : (
          <Avatar
            src={user?.url}
            alt="profile"
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
        )}

        {loading ? (
          <Skeleton variant="text" width={120} height={32} animation="wave" />
        ) : (
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            {user?.first_name + " " + user?.last_name}
          </Typography>
        )}

        {loading ? (
          <Skeleton variant="text" width={200} animation="wave" />
        ) : (
          <Typography variant="body1" gutterBottom>
            Email: {user?.email}
          </Typography>
        )}

        {loading ? (
          <Skeleton variant="text" width={150} animation="wave" />
        ) : (
          <Typography variant="body1" gutterBottom>
            Gender: {user?.gender_identity}
          </Typography>
        )}

        {loading ? (
          <Skeleton variant="text" width={100} animation="wave" />
        ) : (
          <Typography variant="body1" gutterBottom>
            Age: {2024 - user?.dob_year}
          </Typography>
        )}
        <Button
          startIcon={<LogoutIcon />}
          onClick={logout}
          variant="outlined"
          sx={{ color: "#5c1df4" }}
        >
          Logout
        </Button>

        {loading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={80}
            animation="wave"
            sx={{
              marginTop: 2,
              borderRadius: 8,
            }}
          />
        ) : (
          <Typography
            sx={{
              backgroundColor: "lightblue",
              padding: 2,
              borderRadius: 8,
              opacity: 0.8,
              marginTop: 2,
            }}
          >
            <strong>About:</strong> {user?.about}
          </Typography>
        )}

        <div style={{ marginTop: "auto", paddingTop: "43px" }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleOpenMilestonesDialog}
          >
            Delete My Account
          </Button>
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
                Are you sure you want to delete your account? Once deleted, you
                won't be able to retrieve your account.
              </Typography>
            </DialogContent>

            <DialogActions style={{ justifyContent: "center" }}>
              <Button variant="contained" color="error" onClick={deleteUser}>
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
      </CardContent>
    </Card>
  );
};

export default Profile;
