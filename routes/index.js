const { Router } = require('express')

const indexRouter = Router()

const indexController = require('../controllers/indexController')

indexRouter.get('/', indexController.getHome)
indexRouter.get('/sign-up', indexController.getSignUp)
module.exports = indexRouter
