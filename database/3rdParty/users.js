const DataStore = require('nedb')
let Users  =  new DataStore({filename:"./users.db", autoload:true})
module.exports = Users 