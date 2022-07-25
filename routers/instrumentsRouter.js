const router = require("express").Router();
const validateInst = require("../models/instruments");
const inst = require("../services/instrumentsManager");
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
  //process
  const instruments = await inst.getAll();
  if (!instruments) {
    res.status(400).send("No instruments found in database");
  }

  //response OK
  res.send(instruments);
  return;
});

router.post("/", auth, async (req, res) => {
  //validate user's input
  console.log(req.body.item);
  const { error } = validateInst(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //validate system
  const checkExist = await inst.checkIfNameExists(req.body.item);
  if (checkExist) {
    res.status(400).send("this instrument already exists in the Database");
    return;
  }
  //process && response OK
  res.send(await inst.add(req.body.item));
});

router.patch("/", async (req, res) => {
  //validate user's input
  const { error } = validateInst(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //validate system
  const checkExist = await inst.checkIfNameExists(req.body.inst_name);
  if (checkExist) {
    res.status(400).send("this instrument already exists in the Database");
    return;
  }

  //process && response OK
  res.send(await inst.updateById(req.body.id, req.body.inst_name));
});

router.delete("/", auth, async (req, res) => {
  const { id } = req.query;
  //validate user's input
  if (id) {
    const checkExist = await inst.checkIfIdExists(id);
    //validate system
    if (!checkExist) {
      res.status(400).send("no such instrument id");
      return;
    }

    //process && response OK
    res.send(await inst.deleteById(id));

    return;
  }
  // response 400
  res.status(400).send("no id given to delete");
  return;
});

module.exports = router;
