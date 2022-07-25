const router = require("express").Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const musiciansManager = require("../services/musiciansManager");

router.post("/", async (req, res) => {
  //validate user's input
  const { error } = validateMusician(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //validate system
  const checkExist = await musiciansManager.checkIfEmailExists(req.body.email);
  if (!checkExist) {
    res.status(400).send("invalid email or password");
    return;
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    checkExist.password
  );
  if (!isValidPassword) {
    res.status(400).send("invalid email or password");
    return;
  }
  //process
  const token = musiciansManager.generateToken(
    checkExist.id,
    checkExist.email,
    checkExist.access_level
  );

  //   response ok
  res.json({
    token,
  });
});

function validateMusician(musician) {
  const schema = Joi.object({
    email: Joi.string().min(2).max(50).email().required(),
    password: Joi.string()
      .min(8)
      .max(255)
      .regex(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]{4,})(?=.*[-_^@$#!%*&])[A-Za-z0-9-_^@$#!%*&]{8,}/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Must have one lowercase letter, one capital letter, at least 4 digits, and at least one of the -_^#@$!%*& signs",
      }),
  });
  return schema.validate(musician);
}

module.exports = router;
