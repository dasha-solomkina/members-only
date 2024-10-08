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
    res.render('sign-up', { error: false, formData: req.body })
  } catch (error) {
    res.status(500).send('Server error')
  }
}

async function getLogIn(req, res) {
  try {
    res.render('log-in')
  } catch (error) {
    res.status(500).send('Server error')
  }
}

async function getRequestMembership(req, res) {
  try {
    res.render('request-membership')
  } catch (error) {
    res.status(500).send('Server error')
  }
}

async function getNewMessage(req, res) {
  try {
    res.render('new-message')
  } catch (error) {
    res.status(500).send('Server error')
  }
}

async function postSignUp(req, res, next) {
  const { username } = req.body
  try {
    const userExists = await db.checkUsernameExists({ username })
    if (userExists) {
      return res.render('sign-up', {
        error: 'Username already taken. Please choose another one.',
        formData: req.body,
      })
    }

    await db.createNewUser(req.body)

    res.redirect('/')
  } catch (err) {
    return next(err)
  }
}

async function postNewMessage(req, res, next) {
  const { title, text } = req.body
  try {
    await db.createNewMessage(req.body)

    res.redirect('/')
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getHome,
  getSignUp,
  postSignUp,
  getLogIn,
  getRequestMembership,
  getNewMessage,
  postNewMessage,
}
