var qs = require('qs');
var request = require('request')
var _ = require('lodash');

module.exports = function(config) {

    function getAvailability(data,callback) {
        url = config.ean.roomAvailability+"?"+qs.stringify(data)+"&"+qs.stringify(config.settings)
        console.log(url)
        request.get(url,function(err,response,body){
            if(err || !body) {
              console.log('err from ' + url + '\n' + err + '\nres: ' + response);
              callback('No data');
            } else {
            var tmp = body.match('HotelRoomAvailabilityResponse');
            if( tmp && !JSON.parse(body).HotelRoomAvailabilityResponse.EanWsError){
                data = JSON.parse(body).HotelRoomAvailabilityResponse.HotelRoomResponse;

                if( data ){
                    var checkInInstructions = JSON.parse(body).HotelRoomAvailabilityResponse.checkInInstructions;
                    var HotelDetails = JSON.parse(body).HotelRoomAvailabilityResponse.HotelDetails;
                    // console.log(data);
                    var count = 0;
                    if( data.length>0 ){
                        count = data.length;
                    }else{
                        count = 1;
                        data = [data];
                    }

                    for( var i=0; i<data.length; i++ ){
                        if( checkInInstructions ) data[i]['checkInInstructions'] = checkInInstructions;
                        if( HotelDetails ) data[i]['HotelDetails'] = HotelDetails;
                    }

                    // console.log(JSON.parse(body.HotelRoomResponse));
                    var arr = []
                    _.each(data,function(d){
                    arr.push(_.omit(d,'deepLink','supplierType','rateChange','guaranteeRequired','depositRequired','immediateChargeRequired') )
                    // arr.push(_.omit(d,'taxRate','CancelPolicyInfoList','deepLink','supplierType','rateChange','nonRefundable','guaranteeRequired','depositRequired','immediateChargeRequired') )
                    })
                    // console.log(body);
                    callback(null,arr)
                }else{
                  callback('No data');
                }

            }else{
                callback('No data');
            }
        }
        });
    }

    return {
        "getAvailability" : getAvailability
    }

};
