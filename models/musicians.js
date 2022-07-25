const Joi = require("joi");

function validateMusician(musician) {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .max(50)
      .email({ tlds: { allow: false } })
      .required(),
    phone: Joi.string()
      .min(9)
      .max(10)
      .regex(/^0(\d{1,2}).*(\d{7})$/)
      .allow(""),
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
    first_name: Joi.string().min(2).max(20).allow(""),
    last_name: Joi.string().min(2).max(20).allow(""),
  });
  return schema.validate(musician);
}

module.exports = validateMusician;
