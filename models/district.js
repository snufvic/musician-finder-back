const Joi = require("joi");

function validateDistrict(district) {
  const schema = Joi.object({
    item: Joi.string().min(2).max(30).required(),
    id: Joi.string().max(11),
  });
  return schema.validate(district);
}

module.exports = validateDistrict;
