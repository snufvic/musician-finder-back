const router = require("express").Router();
const validateMusician = require("../models/musicians");
const musicianManager = require("../services/musiciansManager");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middlewares/auth");

router.get("/me", auth, async (req, res) => {
  //validate system
  const checkExist = await musicianManager.checkIfIdExists(req.musician.id);
  if (!checkExist) {
    res.status(400).send("Error matching user ID in server");
    return;
  }

  const musician = await musicianManager.getById(req.musician.id);

  // response OK
  res.send(
    _.pick(musician, [
      "id",
      "email",
      "first_name",
      "last_name",
      "age",
      "phone",
      "districts",
      "instruments",
      "is_card",
    ])
  );

  return;
});

router.get("/", async (req, res) => {
  const { id } = req.query;

  if (id) {
    //validate user's input
    const checkExist = await musicianManager.checkIfIdExists(id);
    //validate system
    if (!checkExist) {
      res.status(400).send("no such musician id");
      return;
    }
    //process
    const musician = await musicianManager.getById(id);
    // response OK
    res.send(_.pick(musician, ["id", "email"]));

    return;
  }

  //process
  const musician = await musicianManager.getAll();
  // response OK

  res.json(musician);

  return;
});

router.post("/", async (req, res) => {
  //validate user's input

  const { error } = validateMusician(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //validate system
  const checkExist = await musicianManager.checkIfEmailExists(req.body.email);
  if (checkExist) {
    res.status(400).send("this user email already exists in the database");
    return;
  }
  //process
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  const musician = await musicianManager.add(req.body);
  // response OK
  res.send(_.pick(musician, ["id", "email"]));
});

router.patch("/", auth, async (req, res) => {
  //validate user's input
  const { error } = validateMusician(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //validate system
  const checkExist = await musicianManager.checkIfEmailExists(req.body.email);
  if (checkExist) {
    res.status(400).send("this user email already exists in the Database");
    return;
  }
  //process && response OK
  res.send(await musicianManager.updateById(req.body));
});

router.delete("/", auth, async (req, res) => {
  const { id } = req.query;
  if (id) {
    //validate user's input
    const checkExist = await musicianManager.checkIfIdExists(id);
    //validate system
    if (!checkExist) {
      res.status(400).send("no such musician id");
      return;
    }

    //process && response OK
    res.send(await musicianManager.deleteById(id));

    return;
  }
  // response 400
  res.status(400).send("no id given to delete");
  return;
});

router.patch("/promote", auth, async (req, res) => {
  //process && response OK
  res.send(await musicianManager.promoteAdminById(req.body.id));
});

router.patch("/demote", auth, async (req, res) => {
  //process && response OK
  res.send(await musicianManager.demoteAdminById(req.body.id));
});

module.exports = router;
