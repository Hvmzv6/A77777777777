const Theme = require("../models/themeModel");

const createTheme = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Theme name is required" });
    }

    const newTheme = new Theme({
      name,
      description,
    });

    const savedTheme = await newTheme.save();
    res.status(201).json({
      message: "Theme created successfully",
      theme: savedTheme,
    });
  } catch (err) {
    console.error("Error creating theme:", err);
    res.status(500).json({ error: "Failed to create theme" });
  }
};

const getAllThemes = async (req, res) => {
  try {
    const themes = await Theme.find();
    res.json(themes);
  } catch (err) {
    console.error("Error fetching themes:", err);
    res.status(500).json({ error: "Failed to fetch themes" });
  }
};

const getTheme = async (req, res) => {
  try {
    const theme = await Theme.findById(req.params.id);

    if (!theme) return res.status(404).json({ error: "Theme not found" });
    res.json(theme);
  } catch (err) {
    console.error("Error getting theme:", err);
    res.status(500).json({ error: "Failed to get theme" });
  }
};

const updateTheme = async (req, res) => {
  try {
    const updatedTheme = await Theme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTheme)
      return res.status(404).json({ error: "Theme not found" });

    res.json(updatedTheme);
  } catch (err) {
    console.error("Error updating theme:", err);
    res.status(500).json({ error: "Failed to update theme" });
  }
};

const deleteTheme = async (req, res) => {
  try {
    const theme = await Theme.findByIdAndDelete(req.params.id);
    if (!theme) return res.status(404).json({ error: "Theme not found" });
    res.json({ message: "Theme deleted successfully" });
  } catch (err) {
    console.error("Error deleting theme:", err);
    res.status(500).json({ error: "Failed to delete theme" });
  }
};

module.exports = {
  createTheme,
  getAllThemes,
  getTheme,
  updateTheme,
  deleteTheme,
};
