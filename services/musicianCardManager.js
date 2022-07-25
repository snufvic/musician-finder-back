const { getConnection } = require("./sql");
const config = require("config");

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

async function addItems(updateItemsArr, tableName) {
  const connection = await getConnection();

  for (let i = 0; i < updateItemsArr.length; i++) {
    // const [addMusician] =
    const m_id = updateItemsArr[i].m_id;
    const id = updateItemsArr[i].id;

    await connection.query(`INSERT INTO ${tableName} (m_id, id) VALUES (?,?)`, [
      m_id,
      id,
    ]);
  }

  return null;
}

async function getAll(id) {
  const connection = await getConnection();
  const [allMusician] = await connection.query(
    `SELECT id, email, first_name, last_name, age, phone, profileImage from musicians WHERE is_card<>0 AND id<>${id}`
  );

  if (allMusician.length) {
    for (let i = 0; i < allMusician.length; i++) {
      // get instruments fields
      const [instruments] = await connection.query(
        "SELECT instruments.name, instruments.id FROM instruments INNER JOIN musician_instrument ON musician_instrument.id=instruments.id WHERE musician_instrument.m_id=?",
        [allMusician[i].id]
      );

      // get districts fields
      const [districts] = await connection.query(
        "SELECT district.name, district.id FROM district INNER JOIN musician_district ON musician_district.id=district.id WHERE musician_district.m_id=?",
        [allMusician[i].id]
      );

      const [allLikes] = await connection.query(
        "SELECT * FROM favorites WHERE favorite_id=?",
        [allMusician[i].id]
      );

      let timesLiked = allLikes.length;
      let likedByConnected = false;
      if (timesLiked) {
        for (let j = 0; j < timesLiked; j++) {
          if (id === allLikes[j].m_id) {
            likedByConnected = true;
            break;
          }
        }
      } else {
        likedByConnected = false;
        timesLiked = "";
      }

      allMusician[i].selected_districts = districts;
      allMusician[i].selected_instruments = instruments;
      allMusician[i].likedByConnected = likedByConnected;
      allMusician[i].timesLiked = timesLiked;

      if (allLikes.length) {
        allMusician[i].allLikes = allLikes;
      } else {
        allMusician[i].allLikes = null;
      }
    }
  }
  return allMusician;
}

async function getById(id) {
  const connection = await getConnection();
  const [musicianId] = await connection.query(
    "SELECT * FROM musicians WHERE id=?",
    [id]
  );
  return musicianId[0];
}
async function getItemsById(id, tableName) {
  const connection = await getConnection();
  const [musicianItems] = await connection.query(
    `SELECT * FROM ${tableName} WHERE m_id=?`,
    [id]
  );
  return musicianItems[0];
}

async function updateById({
  id,
  phone,
  age,
  first_name,
  last_name,
  is_card = 1,
}) {
  const connection = await getConnection();
  await connection.query(
    "UPDATE musicians SET first_name=?, last_name=?, age=?, phone=?, is_card=? WHERE id=?",
    [first_name, last_name, age, phone, is_card, id]
  );

  return await getById(id);
}

async function deleteItemsById(id, tableName) {
  const connection = await getConnection();
  const checkExists = await getItemsById(id, tableName);

  if (checkExists) {
    await connection.query(`DELETE FROM ${tableName} WHERE m_id=?`, [id]);
  }
  return null;
}

async function updateImageById(path, id) {
  const connection = await getConnection();
  await connection.query("UPDATE musicians SET profileImage=? WHERE id=?", [
    path,
    id,
  ]);
}

async function removeCard(cardId) {
  const connection = await getConnection();
  await connection.query("UPDATE musicians SET is_card=0 WHERE id=?", [cardId]);
}

module.exports = {
  getAll,
  getById,
  updateById,
  addItems,
  deleteItemsById,
  checkIfEmailExists,
  checkIfIdExists,
  updateImageById,
  removeCard,
};
