import React, { useEffect, useImperativeHandle, useState } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { storage } from "../service/firebase";
import { v4 as uuidv4 } from "uuid";
import { Button, Container, Avatar, Box, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

const ProfileImage = React.forwardRef((props, ref) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [currentURL, setCurrentURL] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);
  // Referring to storageRef as firebaseRef to avoid naming conflicts
  const firebaseRef = storageRef(storage, "images/profile/");
  useEffect(() => {
    if (props.url) {
      setPreviewURL(props.url);
      setCurrentURL(props.url);
    }
  }, [props.url]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImageUpload(file);
      setIsImageUploaded(false);
      const previewURL = URL.createObjectURL(file);
      setPreviewURL(previewURL);
    }
  };

  // Function to upload the file
  const uploadFile = async () => {
    if (imageUpload == null) return;
    const uuid = uuidv4();
    const imageRef = storageRef(
      storage,
      `images/profile/${uuid}_${imageUpload.name}`
    );

    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      setCurrentURL(url);
      setIsImageUploaded(true);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Function to delete the image and reset to default
  const handleDeleteImage =  () => {
    try {
      //  await deleteObject(storageRef(storage, "images/profile/default.jpg"));
      const fileInput = document.getElementById("file-input");
      if (fileInput) {
        fileInput.value = null;
      }

 setCurrentURL(
        // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbddmDRu7qROC6lOLN74P8ga_CHUewnn9m6g&usqp=CAU"
        //"https://i.pinimg.com/550x/a8/fb/57/a8fb57f5bbc581b53dd717303d6df98e.jpg"
        ""
      );
      console.log("current", currentURL);
      setPreviewURL(null);
      setIsImageUploaded(false);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // Load initial images
  const loadInitialImages = async () => {
    try {
      const response = await listAll(firebaseRef);
      const urls = await Promise.all(
        response.items.map(async (item) => await getDownloadURL(item))
      );
      // Handle the URLs as needed (e.g., update state)
    } catch (error) {
      console.error("Error loading initial images:", error);
    }
  };

  // Call loadInitialImages directly instead of using useEffect
  loadInitialImages();

  useImperativeHandle(ref, () => ({
    getChildState: () => currentURL,
  }));

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        padding: "20px",
      }}
    >
      {previewURL ? (
        <Box sx={{ position: "relative" }}>
          <IconButton
            aria-label="delete"
            onClick={handleDeleteImage}
            sx={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              zIndex: 1,
              bgcolor: "white",
              borderRadius: "50%",
              boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.5)",
            }}
          >
            <DeleteIcon />
          </IconButton>
          <Avatar
            sx={{
              m: 1,
              width: "130px",
              height: "130px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={previewURL}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Avatar>
        </Box>
      ) : (
        <AccountCircle sx={{ fontSize: 70 }} />
      )}
      <Button
        component="label"
        htmlFor="file-input"
        variant="outlined"
        sx={{ marginBottom: 1, width: { xs: "50vw", md: "9vw" } }}
      >
        Choose file
        <input
          id="file-input"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Button>
      <Button
        onClick={uploadFile}
        disabled={isImageUploaded}
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: 1,
          display: imageUpload ? "block" : "none",
          width: "auto",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {isImageUploaded ? "Image Chosen" : "Upload Image"}
          <CheckIcon
            sx={{
              color: "green",
              ml: 1,
              display: isImageUploaded ? "block" : "none",
            }}
          />
        </Box>
      </Button>
    </Container>
  );
});

export default ProfileImage;
