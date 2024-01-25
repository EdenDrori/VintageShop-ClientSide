import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../service/firebase";
import { v4 as uuidv4 } from "uuid";
import { Button, Container, Avatar } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";

const ProfileImage = forwardRef((url, ref) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [currentURL, setCurrentURL] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);
  // Referring to storageRef as firebaseRef to avoid naming conflicts
  const firebaseRef = storageRef(storage, "images/profile/");
  useEffect(() => {
    console.log(url);
    setPreviewURL(url.url);
    console.log(imageUpload, "imafgj");
  }, []);

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
    console.log(uuid);
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
        //maxWidth: "500px",
        padding: "20px",
        // textAlign: "center",
      }}
    >
      {/* <Container sx={{ paddingLeft: 0 ,alignItems:"center"}}> */}
      {previewURL ? (
        <Avatar
          sx={{
            m: 1,
            width: "130px",
            height: "130px",
            overflow: "hidden",
          }}
        >
          <img
            src={previewURL}
            alt="Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Avatar>
      ) : (
        <AccountCircle sx={{ fontSize: 70 }} />
      )}
      {/* </Container> */}
      {/* <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 0,
        }}
      > */}
      <Button
        component="label"
        htmlFor="file-input"
        variant="outlined"
        //disabled={isImageUploaded}
        sx={{ marginBottom: 1 }}
      >
       "Choose file"
        <input
          id="file-input"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Button>
      <Button
        onClick={uploadFile}
        variant="outlined"
        sx={{
          marginTop: 1,
          display: imageUpload ? "block" : "none",
          width: "20%",
          justifyContent:"center"
        }}
      >
        {isImageUploaded ? "Image Chosen" : "Upload Image"}
        <CheckIcon
          sx={{
            
            color: "green",
            display: isImageUploaded ? "block" : "none",
          }}
        />
      </Button>
      {/* </Container> */}

      {/* {isImageUploaded && (
        <Container sx={{ marginLeft: 1 }}>
          <Typography variant="subtitle1">Image Preview:</Typography>
          <img
            src={currentURL}
            alt="Preview"
            style={{ maxWidth: "100px", maxHeight: "100px", marginTop: "10px" }}
          />
        </Container>
      )} */}
    </Container>
  );
});

export default ProfileImage;
