const db = require('./database/index')
const router = require('express').Router()
const route = require('./route')
const {budgetController, userController} = require('../controllers/index')
const authProvider = require('../security/auth')
// protection
router.use(routes.private, authProvider)

// routes: budget
router.post(route.createBudget, budgetController.createBudget)
router.put(route.editBudget, budgetController.editBudget)
router.get(routes.getBudget, budgetController.getBudget)

// routes: user
router.post(routes.registerUser, userController.registerUser)
router.post(routes.loginUser, userController.loginUser)
router.post(routes.forgetPassword, userController.forgetPassword)
router.post(routes.resetPassword, userController.resetPassword)


