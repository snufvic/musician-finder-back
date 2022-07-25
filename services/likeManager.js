const { getConnection } = require("./sql");

async function getAllLikes(cardId) {
  const connection = await getConnection();
  const [allLikes] = await connection.query(
    "SELECT * FROM favorites WHERE favorite_id=?",
    [cardId]
  );
  if (allLikes.length) {
    return allLikes;
  }
  return null;
}

async function removeLikes(connectedId, cardId) {
  const connection = await getConnection();
  const [deleteLike] = await connection.query(
    "DELETE FROM favorites WHERE m_id=? AND favorite_id=?",
    [connectedId, cardId]
  );

  return deleteLike;
}

async function addLikes(connectedId, cardId) {
  const connection = await getConnection();
  const [addLike] = await connection.query(
    "INSERT INTO favorites (m_id, favorite_id) VALUES (?,?)",
    [connectedId, cardId]
  );
  return addLike;
}

module.exports = { getAllLikes, removeLikes, addLikes };
