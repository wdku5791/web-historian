var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var url = require('url');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify3
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!


exports.readListOfUrls = function readListOfUrls (callback) {
  fs.readFile(exports.paths.list, (err, data) => {
    if (err) {
      console.error(err);
    }
    // console.log('--------data-------------');
    // console.log(data.toString());
    var results = data.toString().split('\n');
    // console.log('---------results---------');
    callback(results);
  });
};

exports.isUrlInList = function isUrlInList (url, callback) {
  // var listIncludesUrl = exports.readListOfUrls(callback);
  // console.log('------------------------');
  // console.log(listIncludesUrl);

  exports.readListOfUrls((list) => { callback(list.indexOf(url) > -1); });

};

exports.addUrlToList = function addUrlToList (url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', (err) => {
    if (err) { console.error(err); }
    callback(url);
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.access(exports.paths.archivedSites + '/' + url, function(err) {
    if (err) { 
      callback(false);
    }
    callback(true);
  });
};

exports.downloadUrls = function(urls) {
  // general outline
  // urls.forEach(function (url) {
  //   getRequst(
  //     url,
  //     data,
  //     success = function (data) {
  //       archive(data);
  //     }
  //     error: go error yourself
  // })
  for (var j = 0; j < urls.length; j++) {
    http.get('http://' + urls[j], (res) => {
      var statusCode = res.statusCode;

      var error;
      if (statusCode !== 200) {
        error = new Error(`Request Failed. \n` + `Status Code: ${statusCode}`);
      }

      if (error) {
        console.error(error);
        // res.resume();
      }

      var rawData = '';
      res.on('data', (chunk) => {
        console.log('----------chunk---------');
        console.log(chunk);
        rawData += chunk; 
      });
      res.on('end', () => {
        console.log('-----------Raw Data----------', res);
        console.log(rawData);
        // res.end(rawData);
        
      }).on('error', (err) => {
        console.error(err);
      });


    });
    
  }
  

};


// archive.downloadUrls(archive.readListOfUrls())



