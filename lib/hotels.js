var qs = require('qs');
var request = require('request')
var _ = require('lodash')

module.exports = function(config) {

  function getList(data,callback) {
    url = config.ean.hotelList+"?"+qs.stringify(config.settings)+"&"+qs.stringify(data)
    request.get(url,function(err,response,body){
     console.log(body)
      if(!JSON.parse(body).HotelListResponse.EanWsError){
        data = JSON.parse(body).HotelListResponse.HotelList;
        data['cacheKey'] = JSON.parse(body).HotelListResponse.cacheKey;
        data['cacheLocation'] = JSON.parse(body).HotelListResponse.cacheLocation;
        callback(null,data)
        }
      else{
      callback({error:'error'},null)
      }
    })
  }

  return {
    "getList" : getList
  }

};
