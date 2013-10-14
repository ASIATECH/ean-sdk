var qs = require('qs');
var request = require('request');
module.exports = function(config) {

// getReservation : Book an Expedia Collect or Hotel Collect Hotel Reservation
// Places a hotel reservation and prepays for an Expedia Collect hotel booking OR holds a reservation (guarantees) with a credit card for a Hotel Collect hotel booking. All API bookings require the credit card submissions to be processed through EAN's connection with Expedia's payment processing. The alternative is to use a Hybrid process of passing the user to the white label template to complete the booking process.
// hotelId:338861
// arrivalDate:11/11/2013
// departureDate:11/13/2013
// supplierType:E
// rateKey:ba2d6e43-75d6-4403-aa34-dfb561e0e383
// rateCode: 1684436,
// roomTypeCode: 459436,

//chargeableRate:149.5
//optional max 36 char string to prevent double booking
//affiliateConfirmationId

//Any line breaks or carriage returns will cause an unrecoverable error in the booking process.
//Strip any line breaks or carriage returns from the string before submitting.
//specialInformation

//payment user info
// firstName:"Test Booking"
// lastName:"Test Booking"
// homePhone
// address1:travelnow
// city

// US/CA/AU, for others leave blank
//stateProvinceCode

//countryCode
//postalCode

//credit card info
//creditCardType:"Mastercard"
//creditCardNumber:"5401999999999999"
//creditCardIdentifier:"123"
//creditCardExpirationMonth:03
//creditCardExpirationYear:2014
//in case of a reorder this stuff is needed
//itineraryId

  function sendOrder(data, callback) {
  	url = config.ean.bookReservation+"?"+qs.stringify(data)+"&"+qs.stringify(config.orderSettings)
    console.log(url);
  	request.post(url,function(err,response,body){
  		data = JSON.parse(body)
	  	callback(null,data)
  	})
  }


// itineraryId
// email
// confirmationNumber
  function cancelOrder(data, callback) {
    url = config.ean.cancelReservation+"?"+qs.stringify(data)+"&"+qs.stringify(config.orderSettings)
    console.log(url);
    request.get(url,function(err,response,body){
      data = JSON.parse(body)
      callback(null,data)
    })
  }

//return facade
  return {
    "sendOrder" : sendOrder,
    "cancelOrder": cancelOrder,
  }

};
