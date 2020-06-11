const logger = require('../logger/index')
const userDB = require('./3rdParty/users.js')

class DatabaseModel {
    constructor(){
        logger.log(` A new db instance has been initiated`)
    }
    
     registerUser(payload) {
         return userDB.insert(payload, (err, newUser) => {
             if(err) return false
             return newUser
         })
     }

     updateUser(ID, payload,) {
       return  userDB.find({_id:ID}, (err, existingUser) => {
             if(err) return false
             let user = {...existingUser, ...payload}
           return userDB.update({_id:ID}, {user}, (err, updatedUser) => {
                 if(err) return false
                 return updatedUser
             })
         })
     }
     deleteUser(ID) {
            return userDB.remove({_id:ID}, {},(err, deletedUser) => {
                if(err) return false
                return deletedUser
            })
     }
     fetchUser(ID) {
         
     }
     
     createBudget() {}
     updateBudget() {}
     deleteBudget() {}
     fetchBudget() {}


}

const db = new DatabaseModel()
module.exports = db