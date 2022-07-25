const router = require("express").Router();
const validateDistrict = require("../models/instruments");
const district = require("../services/districtManager");
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
  //process
  const districts = await district.getAll();

  if (!district) {
    res.status(400).send("No districts found in database");
  }

  // response OK
  res.send(districts);
  return;
});

router.post("/", auth, async (req, res) => {
  //validate user's input
  const { error } = validateDistrict(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //validate system
  const checkExist = await district.checkIfNameExists(req.body.item);
  if (checkExist) {
    res.status(400).send("this district already exists in the Database");
    return;
  }
  //process && response OK
  res.send(await district.add(req.body.item));
});

router.delete("/", auth, async (req, res) => {
  //validate user's input
  const { id } = req.query;
  if (id) {
    const checkExist = await district.checkIfIdExists(id);
    //validate system
    if (!checkExist) {
      res.status(400).send("no such district id");
      return;
    }

    //process && response OK
    res.send(await district.deleteById(id));

    return;
  }
  // response 400
  res.status(400).send("no id given to delete");
  return;
});

module.exports = router;
