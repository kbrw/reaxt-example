var App = require("./app")
// dynamic component and props example
module.exports = function(arg,callback){
  // useful for instance to use here react-router
  // call callback(FindedComponent,FindedProps)
  callback(App,arg)
}
