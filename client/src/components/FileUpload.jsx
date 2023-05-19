import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    try {
      setSelectedFile(e.target.files[0]);
    } catch (error) {
      console.error("Error selecting file:", error);
    }
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    console.log("Form data", formData);

    axios
      .post("/upload", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log("selected file: ", selectedFile);

  return (
    <div>
      <input
        onChange={handleFileChange}
        type="file"
        id="myFile"
        name="filename"
      />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
