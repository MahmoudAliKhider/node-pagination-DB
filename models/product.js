const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    colors: [],
    sizes: []
  },
  { timeseries: true }
).set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("product", productSchema);
