// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting

var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var helpers = require('../web/http-helpers');


exports.htmlFetcher = function() {
  console.log('reached now');
  archive.readListOfUrls(function (urls) { 
    archive.downloadUrls(urls); 
  });
};


