import React, { useState } from "react";
import Nav from "../components/Nav";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Skeleton, Backdrop, CircularProgress } from "@mui/material";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";

const OnBoarding = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    last_name: "",
    branch: "",
    current_year: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    url: "",
    about: "",
    matches: [],
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        "https://tinder-clone-test-a0p4.onrender.com/user",
        {
          formData,
        }
      );
      console.log(response);
      const success = response.status === 200;
      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = async (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const storageRef = ref(
        storage,
        `profile-photos/${formData.user_id}/${file.name}`
      );

      try {
        // Read the file as a Data URL
        const reader = new FileReader();

        reader.onload = async (e) => {
          const dataURL = e.target.result;

          // Upload the Data URL to Firebase Storage
          await uploadString(storageRef, dataURL, "data_url");

          // Retrieve the download URL
          const downloadURL = await getDownloadURL(storageRef);

          // Update the formData with the photo URL
          setFormData((prev) => ({ ...prev, url: downloadURL }));

          // Set the photo preview
          setPhotoPreview(downloadURL);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
  };
  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />

      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              type="text"
              name="last_name"
              placeholder="Name"
              required={true}
              value={formData.last_name}
              onChange={handleChange}
            />
            <label htmlFor="branch">Branch</label>
            <input
              id="branch"
              type="text"
              name="branch"
              placeholder="Branch"
              required={true}
              value={formData.branch}
              onChange={handleChange}
            />
            <label htmlFor="current_year">Current Year</label>
            <input
              id="current_year"
              type="text"
              name="current_year"
              placeholder="Year"
              required={true}
              value={formData.current_year}
              onChange={handleChange}
            />

            <label>Birthday</label>
            <div className="dob">
              <input
                id="dob_day"
                type="number"
                name="dob_day"
                placeholder="DD"
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />

              <input
                id="dob_month"
                type="number"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />

              <input
                id="dob_year"
                type="number"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === "man"}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === "woman"}
              />
              <label htmlFor="woman-gender-identity">Woman</label>
              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === "more"}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>

            <label htmlFor="show-gender">Show Gender on my Profile</label>

            <input
              id="show-gender"
              type="checkbox"
              name="show_gender"
              onChange={handleChange}
              checked={formData.show_gender}
            />

            <label>Show Me</label>

            <div className="multiple-input-container">
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                value="man"
                onChange={handleChange}
                checked={formData.gender_interest === "man"}
              />
              <label htmlFor="man-gender-interest">Man</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_interest === "woman"}
              />
              <label htmlFor="woman-gender-interest">Woman</label>
              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender_interest"
                value="everyone"
                onChange={handleChange}
                checked={formData.gender_interest === "everyone"}
              />
              <label htmlFor="everyone-gender-interest">Everyone</label>
            </div>

            <label htmlFor="about">About me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            />

            <input type="submit" />
          </section>

          <section style={{ height: "20px" }}>
            <label htmlFor="profile-photo">Profile Photo</label>
            <div className="custom-file-input-container">
              <button
                className="custom-file-input-button"
                type="button"
                onClick={handleButtonClick}
              >
                Upload Image
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="fileInput"
                style={{ display: "none" }}
              />
            </div>
            <div className="photo-container">
              {formData.url && !loading ? (
                <img
                  src={formData.url}
                  alt="Profile Preview"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              ) : (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={200}
                  animation="wave"
                />
              )}
            </div>
          </section>
        </form>
        {isSubmitting && (
          <Backdrop
            sx={{
              color: "#ffff", // Custom color for the Backdrop
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={isSubmitting}
          >
            <CircularProgress style={{ color: "#a27ef8" }} />{" "}
          </Backdrop>
        )}
      </div>
    </>
  );
};

export default OnBoarding;
