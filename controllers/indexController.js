const db = require('../db/queries')

async function getHome(req, res) {
  try {
    const messages = await db.getAllMessagesNoNames()
    res.render('index', { messages: messages })
  } catch (error) {
    res.status(500).send('Server error')
  }
}

async function getSignUp(req, res) {
  try {
    res.render('sign-up')
  } catch (error) {
    res.status(500).send('Server error')
  }
}

module.exports = {
  getHome,
  getSignUp,
}
