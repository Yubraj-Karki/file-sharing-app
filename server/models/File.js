const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("File", FileSchema);
