import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axiosClient from "./axiosClient";
import showToast from "./components/notification/ShowtToast";

function App() {
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axiosClient.post(`video/upload`, formData);

      if (response) {
        showToast("Video Uploaded", "success");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      showToast("Video Upload Faild", "error");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
