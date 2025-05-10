const Joi = require("joi");

const ParticipantValidation = Joi.object({
  fullName: Joi.string().trim().required(),
  sex: Joi.string().valid("homme", "femme").required(),
  MatriculeCnss: Joi.number().trim().required(),
  CIN: Joi.number().trim().required(), // Assuming CIN is a string, adjust if it's a number
  qualification: Joi.string().trim().required(),
  lieuAffectation: Joi.string().trim().required(),
});

module.exports = {
  trainingValidation,
};
