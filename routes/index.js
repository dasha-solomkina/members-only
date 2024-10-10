const { Router } = require('express')

const indexRouter = Router()
const { body } = require('express-validator')
const indexController = require('../controllers/indexController')

const validateSignUp = [
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password')
    }
    return true
  }),
]

indexRouter.get('/', indexController.getHome)
indexRouter.get('/sign-up', indexController.getSignUp)
indexRouter.post('/sign-up', validateSignUp, indexController.postSignUp)

indexRouter.get('/log-in', indexController.getLogIn)
indexRouter.get('/request-membership', indexController.getRequestMembership)
indexRouter.post('/request-membership', indexController.postRequestMembership)
indexRouter.get('/new-message', indexController.getNewMessage)
indexRouter.post('/new-message', indexController.postNewMessage)

module.exports = indexRouter
