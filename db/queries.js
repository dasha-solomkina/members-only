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

async function createNewMessage({
  title,
  text,
  author_name = 'testName',
  author_id = '5',
}) {
  const query =
    'INSERT INTO messages (title, text,  author_name, author_id) VALUES ($1, $2, $3, $4)'

  try {
    await pool.query(query, [title, text, author_name, author_id])
  } catch (err) {
    console.error('Error inserting new message:', err)
    throw err
  }
}

module.exports = {
  getAllMessagesNoNames,
  checkUsernameExists,
  createNewUser,
  createNewMessage,
}
