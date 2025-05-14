import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

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
      const response = await fetch("http://localhost:5000/video/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Upload successful:", result);
        alert("File uploaded successfully!");
      } else {
        console.error("Upload failed:", response.statusText);
        alert("File upload failed!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file!");
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
