const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb } = require("pdf-lib");
const Attestation = require("../models/attestationModel");

exports.generateAttestation = async (req, res) => {
  try {
    const { participantName, trainerName, trainingTitle, date } = req.body;

    const templatePath = path.resolve("templates/attestation-template.pdf");
    const templateBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);
    const page = pdfDoc.getPages()[0];

    const fontSize = 14;

    page.drawText(`Participant: ${participantName}`, {
      x: 50,
      y: 550,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Trainer: ${trainerName}`, {
      x: 50,
      y: 520,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Training: ${trainingTitle}`, {
      x: 50,
      y: 490,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    page.drawText(`Date: ${date}`, {
      x: 50,
      y: 460,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    // Create file name
    const fileName = `${participantName.replace(/ /g, "_")}_${Date.now()}.pdf`;
    const filePath = path.join("uploads/attestations", fileName);

    fs.writeFileSync(filePath, pdfBytes);

    // Save metadata to DB
    const newAttestation = new Attestation({
      participantName,
      trainerName,
      trainingTitle,
      date,
      filePath,
    });

    await newAttestation.save();

    res.status(200).json({
      msg: "Attestation generated and saved",
      downloadLink: `/api/attestations/download/${fileName}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to generate attestation" });
  }
};

exports.downloadAttestation = (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.resolve(`uploads/attestations/${fileName}`);
  if (!fs.existsSync(filePath)) return res.status(404).send("File not found");
  res.download(filePath);
};
