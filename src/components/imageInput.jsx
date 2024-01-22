import { forwardRef, useImperativeHandle, useState } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../service/firebase";
import { v4 as uuidv4 } from 'uuid';
 // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
const ImageUpload = forwardRef((props, ref) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [currentURL, setCurrentURL] = useState("");

  // Referring to storageRef as firebaseRef to avoid naming conflicts
  const firebaseRef = storageRef(storage, "images/");

  // Function to upload the file
  const uploadFile = async () => {
    if (imageUpload == null) return;
    const uuid = uuidv4();
    
    const imageRef = storageRef(storage, `images/${uuid}_${imageUpload.name}`);

    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      setCurrentURL(url);
      
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
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
    </div>
  );
});

export default ImageUpload;
