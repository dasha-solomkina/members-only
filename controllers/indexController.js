const db = require('../db/queries')

async function getHome(req, res) {
  try {
    res.render('index')
  } catch (error) {
    res.status(500).send('Server error')
  }
}

module.exports = {
  getHome,
}
