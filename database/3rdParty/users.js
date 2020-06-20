const path = require('path')
const DataStore = require('nedb')
let filename = path.resolve(process.cwd(), './database/3rdParty/users.db')
let Users  =  new DataStore({filename, autoload:true})
module.exports = Users