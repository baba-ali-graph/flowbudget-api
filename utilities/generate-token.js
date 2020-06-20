const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = ({_id, username, email }) => {
    let secret = process.env.SECRET
    let token = jwt.sign({_id, username, email}, secret, {expiresIn:'2h'})
    return token
}