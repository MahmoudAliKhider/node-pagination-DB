const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true, minlength: 3, maxlength: 200 },
    price: { type: Number, required: true },
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
