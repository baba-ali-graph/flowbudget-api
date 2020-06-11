const jwt = require('jsonwebtoken')
const ERRORS = require('../errors/index')

module.exports = (req, res, next) => {
    let token = req.headers["x-access-token"]
    let verified = jwt.verify(token, process.env.SECRET)
    if(verified)
        return next()
    else
        res.json(ERRORS.auth_err)
}