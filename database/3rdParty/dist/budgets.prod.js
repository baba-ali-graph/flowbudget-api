"use strict";var path=require("path"),DataStore=require("nedb"),filename=path.resolve(process.cwd(),"/database/3rdParty/budgets.db"),Budgets=new DataStore({filename:filename,autoload:!0});module.exports=Budgets;