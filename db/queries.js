const pool = require('./pool')

async function getAllMessagesNoNames() {
  const { rows } = await pool.query('SELECT title, time, text FROM messages')
  return rows
}

async function createNewUser({ name, surname, username, password }) {
  const { rows } = await pool.query('SELECT title, time, text FROM messages')

  // check if there is no user with the same username
  return rows
}

module.exports = {
  getAllMessagesNoNames,
}
