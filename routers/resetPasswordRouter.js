const router = require("express").Router();
const resetModel = require("../models/resetPassword");
const resetManager = require("../services/resetPasswordManager");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  //validate user's input
  const { error } = resetModel.validateToResetPassword(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //validate system
  const checkEmailExist = await resetManager.checkIfEmailExists(req.body.email);
  if (!checkEmailExist) {
    res.status(400).send("This e-mail does not exists in the database");
    return;
  }
  //process
  const tempPassword = await resetManager.generatePassword(req.body.email);
  await resetManager.sendEmail(req.body.email, tempPassword);
  //response OK
  res.send("Successfully sent e-mail");
  return;
});

router.patch("/", async (req, res) => {
  //validate user's input
  const email = req.body.email;
  delete req.body.email;

  const { error } = resetModel.validateToUpdatePassword(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //validate system
  const checkEmailExist = await resetManager.checkIfEmailExists(email);

  if (!checkEmailExist) {
    res.status(400).send("This e-email does not exists in the database");
    return;
  }

  if (checkEmailExist.password !== req.body.verificationCode) {
    res.status(400).send("Wrong verification code");
    return;
  }

  //process
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  //&& response OK
  res.send(
    await resetManager.updateEncryptedPassword(req.body.password, email)
  );
});

module.exports = router;
