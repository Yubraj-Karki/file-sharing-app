import axios from "axios";
import { useState } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileLink, setFileLink] = useState("");

  const handleFileChange = (e) => {
    try {
      setSelectedFile(e.target.files[0]);
    } catch (error) {
      console.error("Error selecting file:", error);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault(); // Prevent form submission behavior

    console.log("clicked");

    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    console.log("selectedFile in file Upload function: ", selectedFile);
    formData.append("file", selectedFile);

    if (formData) {
      console.log("formData: ", formData);
      try {
        const response = await axios.post(
          "http://localhost:3001/upload",
          formData
        );
        console.log(response);
        console.log(response.data.fileLink, "download link");

        setFileLink(response.data.fileLink);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("formData is empty");
    }
  };

  console.log("selected file: ", selectedFile);

  const fileDownloadLink = fileLink
    ? `http://localhost:3001/download/${fileLink}`
    : "";

  console.log("file download link: ", fileDownloadLink);
  return (
    <form>
      <input onChange={handleFileChange} type="file" id="myFile" name="file" />
      <button onClick={handleFileUpload}>Upload</button>
      {fileLink && (
        <div>
          Download link: <a href={fileDownloadLink}>Download File</a>
        </div>
      )}
    </form>
  );
};

export default FileUpload;
