const Joi = require("joi");

const trainingValidation = Joi.object({
  ref: Joi.string().trim().required(),
  status: Joi.string()
    .valid("pending", "confirmed", "completed", "cancelled")
    .required(),
  theme: Joi.string().trim().optional(),
  title: Joi.string().trim().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")).required(),
  trainer: Joi.string().optional(),
  trainerPhone: Joi.string().trim().optional(),
  CIN: Joi.string().trim().optional(),
  client: Joi.string().required(),
  clientPhone: Joi.string().trim().required(),
  participants: Joi.array().items(Joi.string()).default([]),
});

module.exports = {
  trainingValidation,
};
