const dbInstance = require('../database/index')
const validation = require('../utilities/validation/index')
const generateToken = require('../utilities/generate-token')
const generateResetLink = require('../utitlities/generate-reset-link')
const emailer = require('../external/emailer/index')
const ERRORS = require('../errors/index')
const (AUTH_STATUS_FAIL, MAIL_STATUS_FAIL, SUCCESS) = require('../utilities/statuses')


exports.registerUser = async (req,res) => {
    let user = req.body
    let validatedUser = validation.user(user)
    if(validatedUser){
        let sanitizedUser = sanitize(validatedUser)
        let savedUser = dbInstance.registerUser(sanitizedUser)
        if(savedUser){
            let token = generateToken(savedUser)
            let budgets = dbInstance.fetchBudget(savedUser._id)
            res.status(SUCCESS).json({token, budgets})
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
            let hashPassword = passwordCheck(retrieved.password, sanitizedUser.password)
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
    let email = sanitize({req.params.email})
    let existingEmail = await dbInstance.fetchUser(email)
    if(existingEmail){
        let resetLink = generateResetLink(dbInstance, existingEmail)
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


