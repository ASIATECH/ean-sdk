var qs = require('qs');
var request = require('request')
var _ = require('lodash')

module.exports = function(config) {

  function getList(data,callback) {
  	url = config.ean.hotelList+"?"+qs.stringify(config.settings)+"&"+qs.stringify(data)
  	request.get(url,function(err,response,body){
  		data = JSON.parse(body).HotelListResponse.HotelList
  		callback(null,data)
  	})
  }

  return {
    "getList" : getList
  }

};