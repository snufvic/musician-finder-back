const Joi = require("joi");

function validateMusicianCard(musician) {
  const schema = Joi.object({
    phone: Joi.string()
      .min(9)
      .max(10)
      .regex(/^0(\d{1,2}).*(\d{7})$/)
      .required(),
    first_name: Joi.string().min(2).max(20).required(),
    last_name: Joi.string().min(2).max(20).required(),
    age: Joi.string().min(1).max(3).required(),
    id: Joi.string().max(11).required(),
  });
  return schema.validate(musician);
}

module.exports = validateMusicianCard;
