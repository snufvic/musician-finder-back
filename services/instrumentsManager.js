const { getConnection } = require("./sql");

async function getAll() {
  const connection = await getConnection();
  const [allInst] = await connection.query("SELECT * from instruments");
  return allInst;
}

async function getById(id) {
  const connection = await getConnection();
  const [instId] = await connection.query(
    `SELECT * FROM instruments WHERE id=?`,
    [id]
  );
  return instId[0];
}

async function updateById(id, instrument) {
  const connection = await getConnection();
  await connection.query(`UPDATE instruments SET name = ? WHERE id=?`, [
    instrument,
    id,
  ]);

  return await getById(id);
}

async function add(instrument) {
  const connection = await getConnection();
  const [addInst] = await connection.query(
    `INSERT INTO instruments (name) VALUES (?)`,
    [instrument]
  );
  return await getById(addInst.insertId);
}

async function deleteById(id) {
  const connection = await getConnection();
  await connection.query(`DELETE FROM instruments WHERE id=?`, [id]);

  return await getAll();
}

async function checkIfNameExists(instrument) {
  const connection = await getConnection();
  const [existInst] = await connection.query(
    `SELECT * FROM instruments WHERE name=?`,
    [instrument]
  );
  if (existInst[0]) {
    return 1;
  }
  return null;
}

async function checkIfIdExists(id) {
  const connection = await getConnection();
  const [existInst] = await connection.query(
    `SELECT * FROM instruments WHERE id=?`,
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
  updateById,
  add,
  deleteById,
  checkIfIdExists,
  checkIfNameExists,
};
