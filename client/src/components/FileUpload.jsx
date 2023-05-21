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
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    console.log("selectedFile in file Upload function: ", selectedFile);
    formData.append("file", selectedFile);

    console.log("Form data", formData);

    axios
      .post("http://localhost:3001/upload", formData)
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
      <input onChange={handleFileChange} type="file" id="myFile" name="file" />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
