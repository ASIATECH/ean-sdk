/**
 * A NodeJS module for interfacing with EAN api.
 * @module ean-sdk
 * @version 0.0.0
 * @author Halid Rian
 */

var qs = require('querystring'),
    sys = require("util"),
    defaultConfig = require("./config-default");

function mergeDefaults(o1, o2) {
  for(var p in o2) {
    try {
      if(typeof o2[p] == "object") {
        o1[p] = mergeDefaults(o1[p], o2[p]);
      } else if(typeof o1[p] == "undefined") {
        o1[p] = o2[p];
      }
    } catch(e) {
      o1[p] = o2[p];
    }
  }

  return o1;
}

module.exports = function(config) {

  function configure(config) {
    config = config || {};
    mergeDefaults(config, defaultConfig);
    return config;
  }

  config = configure(config);

  return {
    "hotels" : require("./hotels")(config),
    "rooms" : require("./rooms")(config),

  	}
};