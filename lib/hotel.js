var qs = require('qs')
module.exports = function(config) {

  function getList() {
  	console.log(qs.parse('field=a,b,c'));
  }

  return {
    "getList" : getList
  }

};