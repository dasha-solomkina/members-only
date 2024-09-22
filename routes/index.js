const { Router } = require('express')

const indexRouter = Router()

const indexController = require('../controllers/indexController')

indexRouter.get('/', indexController.getHome)
indexRouter.get('/sign-up', indexController.getSignUp)
indexRouter.post('/sign-up', indexController.postSignUp)
module.exports = indexRouter

//  bring the password to a separate file
