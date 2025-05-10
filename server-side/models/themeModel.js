const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Theme = mongoose.model("Theme", themeSchema);

module.exports = Theme;
