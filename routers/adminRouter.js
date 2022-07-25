const router = require("express").Router();
const adminService = require("../services/adminManager");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {
  const { tableName } = req.query;

  if (tableName) {
    const payload = await adminService.getTable(tableName);
    //validate system
    if (!payload) {
      res.status(400).send("No such table");
      return;
    }

    // response OK
    res.send(payload);

    return;
  }

  res.status(400).send("Could not find table");
  return;
});

module.exports = router;
