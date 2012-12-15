var qs = require('qs');
var request = require('request')
var _ = require('lodash')

module.exports = function(config) {

  function getAvailability(data,callback) {
    url = config.ean.roomAvailability+"?"+qs.stringify(config.settings)+"&"+qs.stringify(data)
    request.get(url,function(err,response,body){
      if (JSON.parse(body).HotelRoomAvailabilityResponse.EanWsError){
        callback({error:'error'},null)      
      } 
      else{
        data = JSON.parse(body).HotelRoomAvailabilityResponse.HotelRoomResponse
        var arr = []
        _.each(data,function(d){
          arr.push(_.omit(d,'taxRate','CancelPolicyInfoList','deepLink','supplierType','rateChange','nonRefundable','guaranteeRequired','depositRequired','immediateChargeRequired') )      
        })

        callback(null,arr)      
      }
    
    })
  }

  return {
    "getAvailability" : getAvailability
  }

};