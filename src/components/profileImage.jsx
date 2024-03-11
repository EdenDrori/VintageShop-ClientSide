import React, { useEffect, useImperativeHandle, useState } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  listAll,

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

  
  const handleDeleteImage =  () => {
    try {
      const fileInput = document.getElementById("file-input");
      if (fileInput) {
        fileInput.value = null;
      }

 setCurrentURL(
        ""
      );
      console.log("current", currentURL);
      setPreviewURL(null);
      setIsImageUploaded(false);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };


  const loadInitialImages = async () => {
    try {
      const response = await listAll(firebaseRef);
      const urls = await Promise.all(
        response.items.map(async (item) => await getDownloadURL(item))
      );
  
    } catch (error) {
      console.error("Error loading initial images:", error);
    }
  };

  
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
