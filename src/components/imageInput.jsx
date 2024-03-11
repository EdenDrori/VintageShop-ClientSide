import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  listAll
} from "firebase/storage";
import { storage } from "../service/firebase";
import { v4 as uuidv4 } from "uuid";
import { Button, Container, Box, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

const ImageUpload = forwardRef((url, ref) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [currentURL, setCurrentURL] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);
  const firebaseRef = storageRef(storage, "images/");
  useEffect(() => {
    if (url.url) {
      setPreviewURL(url.url);
      setCurrentURL(url.url);
    }
  }, [url.url]);

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
    const imageRef = storageRef(storage, `images/${uuid}_${imageUpload.name}`);

    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      setCurrentURL(url);
      setIsImageUploaded(true);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDeleteImage = async () => {
    try {

      const fileInput = document.getElementById("file-input");
      if (fileInput) {
        fileInput.value = null;
      }
      setCurrentURL("");
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
        padding: { xs: 0, md: "20px" },
        paddingBottom: { xs: "10px", md: "auto" },
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          padding: 0,
        }}
      >
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
          variant="outlined"
          disabled={isImageUploaded}
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: 1,
            display: imageUpload ? "block" : "none",
            width: { xs: "50vw", md: "9vw" },
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

      <Container sx={{ paddingLeft: 0, position: "relative" }}>
        {previewURL && (
          <>
            <img
              src={previewURL}
              alt="Preview"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <IconButton
              aria-label="delete"
              onClick={handleDeleteImage}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bgcolor: "rgba(255, 255, 255, 0.7)",
                borderRadius: "50%",

                marginRight: { xs: 0, sm: 5, md: 15, lg: 20, xl: 25 },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Container>
    </Container>
  );
});

export default ImageUpload;
