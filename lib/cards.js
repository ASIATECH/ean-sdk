var qs = require('qs');
var request = require('request')
var _ = require('lodash')

module.exports = function(config) {

  function getCards(data,callback) {
  	url = config.ean.paymentInfo+"?"+qs.stringify(config.settings)+"&"+qs.stringify(data)
  	request.get(url,function(err,response,body){
  		data = JSON.parse(body).HotelListResponse.HotelList
  		callback(null,data)
  	})
  }

  return {
    "getCards" : getCards
  }

};