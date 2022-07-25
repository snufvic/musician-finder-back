const router = require("express").Router();
const path = require("path");
const validateMusicianCard = require("../models/muaicianCard");
const musicianCardManager = require("../services/musicianCardManager");
const musicianManager = require("../services/musiciansManager");
const _ = require("lodash");
const auth = require("../middlewares/auth");

router.get("/me", auth, async (req, res) => {
  const musician = await musicianManager.getById(req.musician.id);
  if (!musician) {
    res.status(400).send("Did not find such musician");
    return;
  }
  // response OK
  res.send(musician);

  return;
});

router.patch("/uploadfile", auth, async (req, res) => {
  const fileName = req.files.myFile;
  const extention = path.extname(fileName.name);

  const myPath = path.resolve(
    __dirname,
    "../images/profileImages/" + "musician_" + req.musician.id + extention
  );

  fileName.mv(myPath, async (error) => {
    if (error) {
      console.error(error);
      res.writeHead(500, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ status: "error", message: error }));
      return;
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.send(
      await musicianCardManager.updateImageById(
        "/profileImages/musician_" + req.musician.id + extention,
        req.musician.id
      )
    );
  });

  return null;
});

router.get("/", auth, async (req, res) => {
  const { id } = req.query;

  if (id) {
    //validate user's input
    const checkExist = await musicianManager.checkIfIdExists(id);
    //validate system
    if (!checkExist) {
      res.status(400).send("No such musician id");
      return;
    }
    //process
    const musician = await musicianManager.getById(id);
    // response OK
    res.send(_.pick(musician, ["id", "email"]));

    return;
  }

  //process
  const musicians = await musicianCardManager.getAll(req.musician.id);

  // response OK
  res.json(musicians);

  return;
});

router.post("/items", auth, async (req, res) => {
  const tableName = "musician_" + req.query.route;

  //validate system
  const id = req.body[0].m_id;

  if (!id) {
    res.status(400).send("Did not recieve items to update");
    return;
  }

  //process
  await musicianCardManager.deleteItemsById(id, tableName);
  await musicianCardManager.addItems(req.body, tableName);

  // response OK
  res.send("updated successfully");
  return;
});

router.patch("/remove", auth, async (req, res) => {
  //process && response OK
  res.send(await musicianCardManager.removeCard(req.body.cardId));
});

router.patch("/", auth, async (req, res) => {
  //validate user's input

  const { error } = validateMusicianCard(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //process && response OK
  res.send(await musicianCardManager.updateById(req.body));
});

module.exports = router;
