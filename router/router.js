const db = require('../database/index')
const router = require('express').Router()
const routes = require('./routes')
const {budgetController, userController} = require('../controllers/index')
const authProvider = require('../security/auth')
// protection
router.use('api/v1', authProvider)

// // routes: budget
// router.post(routes.createBudget, budgetController.createBudget)
// router.put(routes.editBudget, budgetController.editBudget)
// router.get(routes.retrieveBudget, budgetController.retrieveBudget)

// routes: user
router.post(routes.registerUser, userController.registerUser)
router.post(routes.loginUser, userController.loginUser)
router.post(routes.forgetPassword, userController.forgetPassword)
router.post(routes.resetPassword, userController.resetPassword)

module.exports = router