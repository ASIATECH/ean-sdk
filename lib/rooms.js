var qs = require('qs');
var request = require('request')
var _ = require('lodash')

module.exports = function(config) {

// getAvailability : Request Hotel Room Availability
// Finds all available rooms at a specific hotel that are available for booking.
// Required prior to placing a reservation request in order to obtain the rate key.

// hotelId=338861
// arrivalDate=11/11/2012
// departureDate=11/13/2012
// includeDetails=true
// includeRoomImages=true
// room1=2,5,7 == 1 Room with 2 Children Ages 5 and 7
// supplierType=E

// rateKey
// rateCode
// roomTypeCode

// includeDetails
//Optionally include the cancellation policy, bed type choices or smoking preference choices 
//for every room in the list rather than sending individual requests later.

// includeRoomImages

// HOTEL_DETAILS  
// ROOM_TYPES	 
// ROOM_AMENITIES	
// PROPERTY_AMENITIES 
// HOTEL_IMAGES 
  function getAvailability(data,callback) {
  	url = config.ean.roomAvailability+"?"+qs.stringify(config.settings)+"&"+qs.stringify(data)
  	request.get(url,function(err,response,body){
	  	
  		data = JSON.parse(body).HotelRoomAvailabilityResponse.HotelRoomResponse
  		var arr = []
  		_.each(data,function(d){
		  		arr.push(_.omit(d,'taxRate','CancelPolicyInfoList','deepLink','supplierType','rateChange','nonRefundable','guaranteeRequired','depositRequired','immediateChargeRequired') )			
  		})

	  	callback(null,arr)  		
  	})
  }

  return {
    "getAvailability" : getAvailability
  }

};