const db = require('../db/queries')
const bcrypt = require('bcryptjs')

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
  console.log(req.user)
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
  try {
    const userExists = await db.checkUsernameExists({ username })

    if (userExists) {
      return res.render('sign-up', {
        error: 'Username already taken. Please choose another one.',
        formData: req.body,
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await db.createNewUser({ ...req.body, password: hashedPassword })

    // await db.createNewUser(req.body)

    res.redirect('/')
  } catch (err) {
    return next(err)
  }
}

// async function postRequestMembership(req, res, next) {
//   const { code } = req.body
//   console.log(code)
//   console.log(req.user)

//   try {
//     if (req.isAuthenticated()) {
//       console.log('inside')
//       return next()
//     }

//     res.redirect('/')
//   } catch (err) {
//     return next(err)
//   }
// }

async function postRequestMembership(req, res, next) {
  const { code } = req.body
  const { username } = req.user

  // if (code === 'BUGFIX') {
  //   db.updateMembership(username)
  //   res.redirect('/')
  // }
  // res.render('request-membership', {
  //   error: 'Incorrect code, please try again.',
  // })
  if (code === 'BUGFIX') {
    await db.updateMembership(username) // Ensure you await the database operation if it's async
    return res.redirect('/') // Return here to prevent further execution
  }

  // If the code is incorrect, render the page with an error message
  return res.render('request-membership', {
    error: 'Incorrect code, please try again.',
  })
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
  postRequestMembership,
}

// undersatnd why it is not updated in the DB
