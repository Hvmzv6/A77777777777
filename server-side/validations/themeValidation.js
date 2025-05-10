const Joi = require("joi");

const themeValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Theme name is required",
    "any.required": "Theme name is required",
  }),
  description: Joi.string().trim().optional().allow("").messages({
    "string.base": "Description must be a string",
  }),
});

module.exports = {
  themeValidation,
};
