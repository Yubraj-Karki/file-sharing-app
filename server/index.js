const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const mongoose = require("mongoose");
const File = require("./models/File");
const path = require("path");
const upload = multer({ dest: "./uploads" });

// Enable CORS
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send("Hello from the swiftDrop!");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file was uploaded.");
  }

  // console.log(req.file);

  try {
    // Process the uploaded file
    const fileData = {
      path: req.file.path,
      originalName: req.file.originalname,
    };

    // Save the file data to MongoDB using Mongoose
    const file = new File(fileData);

    const response = await file.save();

    const identifier = response._id;

    console.log(identifier);

    res.send({ fileLink: identifier });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file.");
  }
});

app.get("/download/:identifier", async (req, res) => {
  const { identifier } = req.params;
  try {
    const file = await File.findOne({ _id: identifier });
    if (!file) {
      return res.status(404).send("File not found");
    }
    const filePath = file.path;
    const fileName = file.originalName;

    // Trigger the file download with res.download()
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).send("Error downloading file.");
      }
    });
  } catch (error) {
    console.error(error);
  }
});

const port = 3001;

const connectDB = require("./dbConnection");

connectDB();

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
