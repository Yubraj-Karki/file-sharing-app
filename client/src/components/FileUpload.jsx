import axios from "axios";
import { useRef, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileLink, setFileLink] = useState("");
  const [fileUploadProgress, setFileUploadProgress] = useState(0);

  const fileInputRef = useRef(null);

  const resetState = () => {
    setSelectedFile(null);
    setFileLink("");
    setFileUploadProgress(0);
  };

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
          formData,
          {
            onUploadProgress: (event) => {
              setFileUploadProgress(
                Math.round((event.loaded * 100) / event.total)
              );
            },
          }
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

  console.log(
    "selected file here: ",
    selectedFile ? selectedFile.name : "empty"
  );

  const fileDownloadLink = fileLink
    ? `http://localhost:3001/download/${fileLink}`
    : "";

  const CopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fileDownloadLink);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  console.log("file download link: ", fileDownloadLink);
  return (
    <>
      <form className="uploadForm">
        <header>
          <h1>Upload</h1>
          <p>
            Upload, Share, and Download! Seamlessly share files with others.
          </p>
        </header>
        <div className="uploadArea">
          <CircularProgressbar
            value={fileUploadProgress}
            text={`${fileUploadProgress}%`}
          />

          <label onClick={resetState} htmlFor="myFile" className="browseButton">
            <u>Click to browse file</u>
          </label>

          <p className="selectedFile">
            {selectedFile
              ? "Selected file: " + selectedFile.name
              : "Browse file and upload"}
          </p>
          <input
            className="browseFile"
            onChange={handleFileChange}
            type="file"
            id="myFile"
            name="file"
            ref={fileInputRef}
          />
        </div>
      </form>
      <div>
        <div className="downloadLinkArea">
          {fileLink ? (
            <p>Copy the link for the file below. Link expires in 10 hour.</p>
          ) : (
            <p>Download link will appear below once you upload the file</p>
          )}
          <div className="downloadLink">
            <a href={fileDownloadLink}>{fileDownloadLink}</a>
            {fileLink && (
              <button className="copyBtn" onClick={CopyToClipboard}>
                Copy
              </button>
            )}
          </div>
        </div>

        <button
          disabled={!selectedFile || fileUploadProgress == 100}
          className="uploadButton"
          onClick={handleFileUpload}
        >
          Upload File
        </button>
      </div>
    </>
  );
};

export default FileUpload;
