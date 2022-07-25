const Joi = require("joi");

function validateInst(instrument) {
  const schema = Joi.object({
    item: Joi.string().min(2).max(30).required(),
    id: Joi.string().max(11),
  });
  return schema.validate(instrument);
}

module.exports = validateInst;
