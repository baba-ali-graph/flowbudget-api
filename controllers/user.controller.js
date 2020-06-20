const phash = require('password-hash')
const dbInstance = require('../database/index')
const validation = require('../utilities/validation/index')
const generateToken = require('../utilities/generate-token')
const sanitize = require('../utilities/sanitize')
const generateResetLink = require('../utilities/generate-reset-link')
const emailer = require('../emailer/index')
const ERRORS = require('../errors/index')
const {AUTH_STATUS_FAIL, MAIL_STATUS_FAIL, SUCCESS} = require('../utilities/statuses')


exports.registerUser = async (req,res) => {
    let user = req.body
    let validated = validation.user(user)
    if(validated){
        let sanitizedUser = sanitize(user)
        sanitizedUser = {...sanitizedUser, password: phash.generate(sanitizedUser.password, {saltLength:10})}
        let savedUser = await dbInstance.registerUser(sanitizedUser)
        if(savedUser){
            let token = generateToken(savedUser)
            let budgets = await dbInstance.fetchBudget(savedUser._id)
            if(budgets)
                res.status(SUCCESS).json({token, budgets})
            else
                 res.status(AUTH_STATUS_FAIL).json(ERRORS.database_err)
        } else {
            res.status(AUTH_STATUS_FAIL).json(ERRORS.database_err)
        }
    } else {
        res.status(AUTH_STATUS_FAIL).json(ERRORS.validation_err)
    }
    
}

exports.loginUser = async (req,res) => {
    let validatedUser = validation.user(req.body)
    if(validatedUser){
        let sanitizedUser = sanitized(validatedUser)
        let retrieved = await dbInstance.fetchUser(sanitizedUser)
        if(retrieved){
            let hashPassword = phash.verify(retrieved.password, sanitizedUser.password)
            if(hashPassword) {
                let token = generateToken(retrieved)
                let budget = await dbInstance.fetchBudget(retrieved._id)
                res.status(SUCCESS).json({token, budget})
            } else {
                res.status(AUTH_STATUS_FAIL).json(ERROR.password_err)
            }
        } else {
            res.status(AUTH_STATUS_FAIL).json(ERROR.database_err)
        }
    } else {
        res.status(AUTH_STATUS_FAIL).json(ERROR.validation_err)
    }
}

exports.forgetPassword = async (req, res) => {
    let email = sanitize({email: req.params.email})
    let existingEmail = await dbInstance.fetchUserWithKey(email)
    if(existingUser){
        let resetLink = await generateResetLink(dbInstance, existingUser)
        let emailSent = await emailer.mail(resetLink)
        if(emailSent) {
            let response = {done:true}
            res.status(SUCCESS).json(response)
        } else {
            res.status(MAIL_STATUS_FAIL).json(ERROR.email_err)
        }
        
    } else {
        res.status(AUTH_STATUS_FAIL).json(ERROR.database_err)
    }
}


exports.resetPassword = async (req, res) => {
    let {resetLink, password} = req.body
    password = phash.generate(password, {saltLength:10})
}