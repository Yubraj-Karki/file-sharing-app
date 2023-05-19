const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
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

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file was uploaded.");
  }
  console.log(req.file);
  res.send("File uploaded");
});
const port = 3000;

const connectDB = require("./dbConnection");

connectDB();

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
