const { getConnection } = require("./sql");

async function getTable(tableName) {
  const connection = await getConnection();
  const [body] = await connection.query(`SELECT * FROM ${tableName} `);
  return body[0] ? body : null;
}

module.exports = {
  getTable,
};
