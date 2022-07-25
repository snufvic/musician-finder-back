const mysql = require("mysql2/promise");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "musician_finder_DB",
});
console.log("connected to SQL");

function getConnection() {
  return connection;
}

module.exports = { getConnection };
