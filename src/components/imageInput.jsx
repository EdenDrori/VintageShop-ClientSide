import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../service/firebase";
import { v4 as uuidv4 } from "uuid";
import { Button, Container, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const ImageUpload = forwardRef((url, ref) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [currentURL, setCurrentURL] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);

  const firebaseRef = storageRef(storage, "images/");
  useEffect(() => {
    
    setPreviewURL(url.url);
  }, []);
  console.log(url);
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
        //maxWidth: "500px",
        padding: "20px",
        // textAlign: "center",
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
          //disabled={isImageUploaded}
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

      <Container sx={{ paddingLeft: 0 }}>
        {previewURL && (
          <img
            src={previewURL}
            alt="Preview"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        )}
      </Container>

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

export default ImageUpload;
