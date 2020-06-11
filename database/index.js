const logger = require('../logger/index')
const userDB = require('./3rdParty/users.js')

class DatabaseModel {
    constructor(){
        logger.log(` A new db instance has been initiated`)
    }
    
     registerUser(payload) {
         return new Promise((resolve, reject) => {
            return userDB.insert({...payload}, (err, newUser) => {
                if(err) return reject(err)
                return resolve(newUser)
            })
         })
     }

     updateUser(ID, payload,) {
       return new Promise((resolve, reject) => {
        return  userDB.find({_id:ID}, (err, existingUser) => {
            if(err) return reject(err)
            let user = {...existingUser, ...payload}
          return userDB.update({_id:ID}, {...user}, (err, updatedUser) => {
                if(err) return reject(err)
                return resolve(updatedUser)
            })
        })
       })
     }
     deleteUser(ID) {
            return new Promise((resolve,reject) => {
                return userDB.remove({_id:ID}, {},(err, deletedUser) => {
                    if(err) return reject(err)
                    return resolve(deletedUser)
                })
            })
     }
     fetchUser(ID) {
         return new Promise((resolve, reject) => {
             return userDB.find(ID, (err, existingUser) => {
                 if(err) return reject(err)
                 return resolve(existingUser)
             })
         })
     }
     
     createBudget(payload) {
         return new Promise((resolve, reject) => {
             return budgetDB.insert({...payload}, (err, newBudget) => {
                 if(err) return reject(err)
                 return resolve(newBudject)
             })
         })
     }
     updateBudget(ID, payload) {
         return new Promise((resolve, reject) => {
             return budgetDB.find({_id:ID}, (err, existingBudget) => {
                 let budget = {...existingBudget, ...payload}
                 return budgetDB.update({_id:ID}, {...budget}, (err, updatedBudget) => {
                     if(err) return reject(err)
                     return resolve(updatedBudget)
                 } )
             })
         })
     }
     deleteBudget(ID) {
        return new Promise((resolve, reject) => {
            return budgetDB.remove({_id:ID}, {}, (err, deletedBudget) => {
                if(err) return reject(err)
                return resolve(deletedBudget)
            })
        })
    }
     fetchBudget(ID) {
        return new Promise((resolve, reject) => {
            return budgetDB.find(ID, (err, existingBudget) => {
                if(err) return reject(err)
                return resolve(existingUser)
            })
        })
     }


}

const db = new DatabaseModel()
module.exports = db