const path = require('path')
const DataStore = require('nedb')
let filename = path.resolve(process.cwd(), '/database/3rdParty/budgets.db')
let Budgets =  new DataStore({filename, autoload:true})
module.exports = Budgets 