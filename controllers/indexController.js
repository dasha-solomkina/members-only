const db = require('../db/queries')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const { format } = require('date-fns')

async function getHome(req, res) {
  try {
    const messages = await db.getAllMessagesNoNames()
    const formattedMessages = messages.map((message) => ({
      ...message,
      time: format(new Date(message.time), 'p MMMM d, yyyy'),
    }))

    res.render('index', { messages: formattedMessages })
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
    res.render('request-membership', { error: false })
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
  const { username, password } = req.body

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('errors')

    return res.render('sign-up', {
      error: errors
        .array()
        .map((error) => error.msg)
        .join(', '), // Collect error messages
      formData: req.body,
    })
  }

  try {
    const userExists = await db.checkUsernameExists({ username })

    console.log('userExists')
    if (userExists) {
      return res.render('sign-up', {
        error: 'Username already taken. Please choose another one.',
        formData: req.body,
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await db.createNewUser({ ...req.body, password: hashedPassword })

    res.redirect('/')
  } catch (err) {
    return next(err)
  }
}

async function postRequestMembership(req, res, next) {
  const { code } = req.body

  if (code === 'BUGFIX') {
    await db.updateMembership(req.user)
    return res.redirect('/')
  }

  return res.render('request-membership', {
    error: 'Incorrect code, please try again.',
  })
}

async function postNewMessage(req, res, next) {
  const { title, text } = req.body
  const { username } = req.user

  try {
    const currentUser = await db.getUserByUsername(username)

    await db.createNewMessage({
      title,
      text,
      author_name: currentUser.name,
      author_id: currentUser.id,
    })

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
  postRequestMembership,
}
