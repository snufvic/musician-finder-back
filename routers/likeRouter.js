const router = require("express").Router();
const auth = require("../middlewares/auth");
const likeManager = require("../services/likeManager");

router.get("/", auth, async (req, res) => {
  const { cardId } = req.query;

  //process && response OK
  res.send(await likeManager.getAllLikes(cardId));
  return;
});

router.delete("/", auth, async (req, res) => {
  //validate user's input
  const { cardId } = req.query;
  // remove
  const delLike = await likeManager.removeLikes(req.musician.id, cardId);
  if (!delLike) return res.status(404).send("Server error reading Like");
  res.send(delLike);
});

router.put("/", auth, async (req, res) => {
  //validate user's input
  //add
  const addLike = await likeManager.addLikes(req.musician.id, req.body.cardId);
  if (!addLike) return res.status(404).send("Server error reading Like");
  res.send(addLike);
});

module.exports = router;
