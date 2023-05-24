import axios from "axios";
import { useRef, useState } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileLink, setFileLink] = useState("");
  const [fileUploadProgress, setFileUploadProgress] = useState();

  const fileInputRef = useRef(null);

  const resetState = () => {
    setSelectedFile(null);
    setFileLink("");
    setFileUploadProgress();
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
          <p className="selectedFile">
            {selectedFile
              ? "Selected file: " + selectedFile.name
              : "Browse file and upload"}
          </p>

          <label onClick={resetState} htmlFor="myFile" className="browseButton">
            Browse file
          </label>
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
        {fileUploadProgress && (
          <div className="fileUploadProgress">
            {fileUploadProgress < 100 ? (
              <span>Uploading..{fileUploadProgress}% </span>
            ) : (
              <span>Upload completed</span>
            )}
            <div id="myProgress">
              <div style={{ width: `${fileUploadProgress}%` }} id="myBar"></div>
            </div>
          </div>
        )}

        {fileLink && (
          <div className="downloadLinkArea">
            <p>Copy the link for the file below. Link expires in 10 hour.</p>
            <div className="downloadLink">
              <a href={fileDownloadLink}>{fileDownloadLink}</a>
            </div>
          </div>
        )}

        <button
          disabled={!selectedFile}
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
