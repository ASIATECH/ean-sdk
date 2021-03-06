var qs = require('qs');
var request = require('request')
var _ = require('lodash')

module.exports = function (config) {

  function getList (data,callback) {
    url = config.ean.hotelList+"?"+qs.stringify(data)+"&"+qs.stringify(config.settings);
    // console.log(url)
    request.get(url, {'timeout': 6 * 1000}, function (err, response, body) {
      if(err || !body) {
          console.log(Date() + ' err from ' + url + '\n' + err + '\nres: ' + response);
          callback({error:'error'}, null);
      } else {
        var tmp = body.match('HotelListResponse');
        if( tmp && !JSON.parse(body).HotelListResponse.EanWsError) {
          data = JSON.parse(body).HotelListResponse.HotelList;
          if(data['@size'] == 1)
            data['HotelSummary'] = [data.HotelSummary];
          data['cacheKey'] = JSON.parse(body).HotelListResponse.cacheKey;
          data['cacheLocation'] = JSON.parse(body).HotelListResponse.cacheLocation;
          data['moreResultsAvailable'] = JSON.parse(body).HotelListResponse.moreResultsAvailable;
          callback(null, data);
        } else {
          callback({error:'error'}, null);
        }
      }
    });
  }

  return {
    "getList" : getList
  }

};
