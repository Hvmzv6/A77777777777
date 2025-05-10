const Joi = require("joi");

const userCreateValidation = Joi.object({
  fullName: Joi.string().trim().required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("admin", "trainer", "client").required(),
  mustChangePassword: Joi.boolean().optional(), // Optional since Mongoose provides default
  cvPath: Joi.string().optional(), // Optional field for CV
  profileImagePath: Joi.string().optional(), // Optional field for profile image
  expertise: Joi.string().optional(), // Optional field for expertise
});

const userUpdateValidation = Joi.object({
  fullName: Joi.string().trim().optional(),
  email: Joi.string().trim().lowercase().email().optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid("admin", "trainer", "client").optional(),
  mustChangePassword: Joi.boolean().optional(),
  cvPath: Joi.string().optional(), // Optional field for CV
  profileImagePath: Joi.string().optional(), // Optional field for profile image
  expertise: Joi.string().optional(), // Optional field for expertise
});

module.exports = {
  userCreateValidation,
  userUpdateValidation,
};
