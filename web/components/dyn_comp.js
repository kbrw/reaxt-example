var App = require("./app")
// dynamic component and props example
module.exports = {
  reaxt_server_render: function(arg,callback){
    // useful for instance to use here react-router
    // call callback(FindedComponent,FindedProps)
    callback(App,arg,"toto")
  },
  reaxt_client_render: function(props,elemid,param){
    console.log(param)
    React.render(React.createElement(App,props),document.getElementById(elemid))
  }
}
