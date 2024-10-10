const pool = require('./pool')

async function getAllMessagesNoNames() {
  // TODO: I think will need to fix later to get everything
  // and change the display logic on the page already
  const { rows } = await pool.query('SELECT title, time, text FROM messages')
  return rows
}

async function checkUsernameExists({ username }) {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [
    username,
  ])
  return rows.length > 0
}

async function getUserByUsername(username) {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [
    username,
  ])
  return rows[0]
}

async function createNewUser({ name, surname, username, password }) {
  const query =
    'INSERT INTO users (name, surname, username, password) VALUES ($1, $2, $3, $4)'

  await pool.query(query, [name, surname, username, password])
}

async function createNewMessage({ title, text, author_name, author_id }) {
  const query =
    'INSERT INTO messages (title, text,  author_name, author_id) VALUES ($1, $2, $3, $4)'

  try {
    await pool.query(query, [title, text, author_name, author_id])
  } catch (err) {
    console.error('Error inserting new message:', err)
    throw err
  }
}

async function updateMembership({ username }) {
  const query = 'UPDATE users SET membership = $1 WHERE username = $2'

  try {
    await pool.query(query, [true, username])
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
  updateMembership,
  getUserByUsername,
}
