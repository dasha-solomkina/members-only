const { Router } = require('express')

const indexRouter = Router()

const indexController = require('../controllers/indexController')

indexRouter.get('/', indexController.getHome)
indexRouter.get('/sign-up', indexController.getSignUp)
indexRouter.post('/sign-up', indexController.postSignUp)

indexRouter.get('/log-in', indexController.getLogIn)
indexRouter.get('/request-membership', indexController.getRequestMembership)
indexRouter.get('/new-message', indexController.getNewMessage)
indexRouter.post('/new-message', indexController.postNewMessage)

module.exports = indexRouter
