const config = require("config");
const jwt = require("jsonwebtoken");
const { getConnection } = require("./sql");

async function checkIfEmailExists(email) {
  const connection = await getConnection();
  const [existInst] = await connection.query(
    `SELECT * FROM musicians WHERE email=?`,
    [email]
  );

  return existInst[0] ? existInst[0] : null;
}

async function checkIfIdExists(id) {
  const connection = await getConnection();
  const [existInst] = await connection.query(
    `SELECT * FROM musicians WHERE id=?`,
    [id]
  );
  if (existInst[0]) {
    return 1;
  }
  return null;
}

async function add({
  email,
  password,
  phone = null,
  first_name = null,
  age = null,
  last_name = null,
  profileImage = "/profileImages/default.webp",
  access_level = 2,
  is_card = 0,
}) {
  const connection = await getConnection();
  const [addMusician] = await connection.query(
    `INSERT INTO musicians (email, password, phone, first_name, last_name, age, profileImage, access_level, is_card) VALUES (?,?,?,?,?,?,?,?,?)`,
    [
      email,
      password,
      phone,
      first_name,
      last_name,
      age,
      profileImage,
      access_level,
      is_card,
    ]
  );
  return await getById(addMusician.insertId);
}

async function getAll() {
  const connection = await getConnection();
  const [allMusician] = await connection.query("SELECT * from musicians");
  return allMusician;
}

async function getById(id) {
  // get input fields
  const connection = await getConnection();
  const [musicianId] = await connection.query(
    "SELECT * FROM musicians WHERE id=?",
    [id]
  );

  // get instruments fields
  const [instruments] = await connection.query(
    "SELECT instruments.name, instruments.id FROM instruments INNER JOIN musician_instrument ON musician_instrument.id=instruments.id WHERE musician_instrument.m_id=?",
    [id]
  );

  // get districts fields
  const [districts] = await connection.query(
    "SELECT district.name, district.id FROM district INNER JOIN musician_district ON musician_district.id=district.id WHERE musician_district.m_id=?",
    [id]
  );

  // get Likes fields
  const [allLikes] = await connection.query(
    "SELECT * FROM favorites WHERE favorite_id=?",
    [id]
  );

  let timesLiked = allLikes.length;
  let likedByConnected = false;
  if (timesLiked) {
    for (let i = 0; i < timesLiked; i++) {
      if (id === allLikes[i].m_id) {
        likedByConnected = true;
        break;
      }
    }
  } else {
    likedByConnected = false;
    timesLiked = "";
  }

  const allMusicianInfo = {
    ...musicianId[0],
    instruments,
    districts,
    likedByConnected,
    timesLiked,
  };
  return allMusicianInfo;
}

async function updateById({ id, email, phone, password }) {
  const connection = await getConnection();
  await connection.query(
    "UPDATE musicians SET email=?, phone=?, password=? WHERE id=?",
    [email, phone, password, id]
  );

  return await getById(id);
}

async function deleteById(id) {
  const connection = await getConnection();
  await connection.query(`DELETE FROM musicians WHERE id=?`, [id]);

  return await getAll();
}

function generateToken(musicianId, musicianEmail, accessLevel) {
  return jwt.sign(
    {
      id: musicianId,
      email: musicianEmail,
      access_level: accessLevel,
    },
    config.get("jwtkey")
  );
}

async function promoteAdminById(id) {
  const connection = await getConnection();
  await connection.query("UPDATE musicians SET access_level=1 WHERE id=?", [
    id,
  ]);

  return await getById(id);
}

async function demoteAdminById(id) {
  const connection = await getConnection();
  await connection.query("UPDATE musicians SET access_level=2 WHERE id=?", [
    id,
  ]);

  return await getById(id);
}

module.exports = {
  getAll,
  getById,
  updateById,
  add,
  deleteById,
  checkIfEmailExists,
  checkIfIdExists,
  generateToken,
  promoteAdminById,
  demoteAdminById,
};
