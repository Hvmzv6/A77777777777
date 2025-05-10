const multer = require("multer");

// Set up storage for CVs and images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "cv") cb(null, "uploads/cvs/");
    else if (file.fieldname === "image") cb(null, "uploads/images/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Filter for allowed file types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = {
    cv: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    image: ["image/jpeg", "image/png"],
  };

  if (file.fieldname === "cv" && allowedMimeTypes.cv.includes(file.mimetype))
    cb(null, true);
  else if (
    file.fieldname === "image" &&
    allowedMimeTypes.image.includes(file.mimetype)
  )
    cb(null, true);
  else cb(new Error("Unsupported file type"), false);
};

const uploadTrainerFiles = multer({ storage, fileFilter });

module.exports = { uploadTrainerFiles };
