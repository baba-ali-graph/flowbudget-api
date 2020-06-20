"use strict";

var db = require('../database/index');

var router = require('express').Router();

var routes = require('./routes');

var _require = require('../controllers/index'),
    budgetController = _require.budgetController,
    userController = _require.userController;

var authProvider = require('../security/auth'); // protection


router.use('api/v1', authProvider); // // routes: budget
// router.post(routes.createBudget, budgetController.createBudget)
// router.put(routes.editBudget, budgetController.editBudget)
// router.get(routes.retrieveBudget, budgetController.retrieveBudget)
// routes: user

router.post(routes.registerUser, userController.registerUser);
router.post(routes.loginUser, userController.loginUser);
router.post(routes.forgetPassword, userController.forgetPassword);
router.post(routes.resetPassword, userController.resetPassword);
module.exports = router;