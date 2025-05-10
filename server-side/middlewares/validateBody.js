// This middleware function validates the request body against a given Joi schema.
// If the validation fails, it sends a 400 response with the error message.
// If it passes, it calls the next middleware in the stack.

module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
