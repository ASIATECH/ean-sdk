var qs = require('qs');
var request = require('request')
var _ = require('lodash')

module.exports = function(config) {

  function getList(data,callback) {
    url = config.ean.hotelList+"?"+qs.stringify(data)+"&"+qs.stringify(config.settings)
    console.log(url)
    request.get(url,function(err,response,body){
      var tmp = body.match('HotelListResponse');
      if( tmp && !JSON.parse(body).HotelListResponse.EanWsError){
        data = JSON.parse(body).HotelListResponse.HotelList;
        if(data['@size'] == 1)
            data['HotelSummary'] = [data.HotelSummary];
        data['cacheKey'] = JSON.parse(body).HotelListResponse.cacheKey;
        data['cacheLocation'] = JSON.parse(body).HotelListResponse.cacheLocation;
        data['moreResultsAvailable'] = JSON.parse(body).HotelListResponse.moreResultsAvailable;
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
