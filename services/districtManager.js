const { getConnection } = require("./sql");

async function getAll() {
  const connection = await getConnection();
  const [allDistricts] = await connection.query("SELECT * from district");
  return allDistricts;
}

async function getById(id) {
  const connection = await getConnection();
  const [instId] = await connection.query(`SELECT * FROM district WHERE id=?`, [
    id,
  ]);
  return instId[0];
}

async function add(district) {
  const connection = await getConnection();
  const [addDistrict] = await connection.query(
    `INSERT INTO district (name) VALUES (?)`,
    [district]
  );
  return await getById(addDistrict.insertId);
}

async function deleteById(id) {
  const connection = await getConnection();
  await connection.query(`DELETE FROM district WHERE id=?`, [id]);

  return await getAll();
}

async function checkIfNameExists(district) {
  const connection = await getConnection();
  const [existDistrict] = await connection.query(
    `SELECT * FROM district WHERE name=?`,
    [district]
  );
  if (existDistrict[0]) {
    return 1;
  }
  return null;
}

async function checkIfIdExists(id) {
  const connection = await getConnection();
  const [existInst] = await connection.query(
    `SELECT * FROM district WHERE id=?`,
    [id]
  );
  if (existInst[0]) {
    return 1;
  }
  return null;
}

module.exports = {
  getAll,
  getById,
  add,
  deleteById,
  checkIfIdExists,
  checkIfNameExists,
};
