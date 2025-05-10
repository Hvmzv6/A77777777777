const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);

const ParticipantValidation = Joi.object({
  fullName: Joi.string().trim().required(),
  sex: Joi.string().valid("homme", "femme").required(),
  matriculeCnss: Joi.string().trim().required(),
  CIN: Joi.string().trim().required(), // Assuming CIN is a string, adjust if it's a number
  qualification: Joi.string().trim().required(),
  lieuAffectation: Joi.string().trim().required(),
  clientId: JoiObjectId().required(),
});

module.exports = {
  ParticipantValidation,
};
