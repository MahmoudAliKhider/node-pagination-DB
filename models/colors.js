const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const colorsSchema = new mongoose.Schema(
  {
    color: []
  })
module.exports = mongoose.model("color", colorsSchema);
