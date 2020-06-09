const logger = require('../logger/index')
const userDB = require('./3rdParty/user.js')

class DatabaseModel {
    constructor(){
        logger.log(` A new db instance has been initiated`)
    }
    
     registerUser(payload) {
         userDB.insert(payload, (err, newUser) => {
             if(err) return false
             return newUser
         })
     }

     updateUser(ID, payload) {
         userDB.update({id:ID}, { set: {payload}}, (err, updatedUser) => {
             if(err) return false
             return updatedUser
         })
     }
     deleteUser() {}
     fetchUser() {}
     
     createBudget() {}
     updateBudget() {}
     deleteBudget() {}
     fetchBudget() {}


}

const db = new DatabaseModel()
module.exports = db