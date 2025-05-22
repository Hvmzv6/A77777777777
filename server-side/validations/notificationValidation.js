const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);
const NotificationValidation = Joi.object({
  sender: Joi.string().hex().length(24).required(),
  receiver: Joi.string().hex().length(24).required(),
  title: Joi.string().trim().min(1).max(255).required(),
  message: Joi.string().trim().min(1).max(1000).required(),
  isRead: Joi.boolean(),
  type: Joi.string().valid("info", "warning", "success", "error"),
});

module.exports = {
  NotificationValidation,
};
