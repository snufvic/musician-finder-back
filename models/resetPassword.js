const Joi = require("joi");

function validateToResetPassword(email) {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .max(50)
      .email({ tlds: { allow: false } })
      .required(),
  });
  return schema.validate(email);
}

function validateToUpdatePassword(verificationCode, password) {
  const schema = Joi.object({
    verificationCode: Joi.string().length(8).required(),
    password: Joi.string()
      .min(8)
      .max(255)
      .regex(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]{4,})(?=.*[-_^@$#!%*&])[A-Za-z0-9-_^@$#!%*&]{8,}/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Must have one lowercase letter, one capital letter, at least 4 digits, and at least one of the *_-&^%$#@! signs",
      }),
  });
  return schema.validate(verificationCode, password);
}

module.exports = { validateToResetPassword, validateToUpdatePassword };
