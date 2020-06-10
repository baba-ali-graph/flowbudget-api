const DataStore = require('nedb')
let Budgets =  new DataStore({filename:"./budgets.db", autoload:true})
module.exports = Budgets 