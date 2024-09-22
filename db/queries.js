const pool = require('./pool')

async function getAllMessagesNoNames() {
  const { rows } = await pool.query('SELECT title, time, text FROM messages')
  return rows
}

async function checkUsernameExists({ username }) {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [
    username,
  ])
  return rows.length > 0
}

async function createNewUser({ name, surname, username, password }) {
  const query =
    'INSERT INTO users (name, surname, username, password) VALUES ($1, $2, $3, $4)'

  await pool.query(query, [name, surname, username, password])
}

module.exports = {
  getAllMessagesNoNames,
  checkUsernameExists,
  createNewUser,
}
