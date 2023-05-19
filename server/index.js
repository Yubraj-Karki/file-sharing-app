const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

app.get("/", (req, res) => {
  res.send("Hello from the swiftDrop!");
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file was uploaded.");
  }
  console.log(req.file);
  res.send("File uploaded");
});
const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
