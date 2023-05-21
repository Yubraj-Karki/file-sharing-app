const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const mongoose = require("mongoose");
const File = require("./models/File");
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
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
  };

  const file = await File.create(fileData);

  console.log(file);

  res.send(file.originalName);
});
const port = 3001;

const connectDB = require("./dbConnection");

connectDB();

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
