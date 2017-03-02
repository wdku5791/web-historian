var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, (err, data) => {
    if (err) {
      console.error(err);
    }
    // console.log('--------data-------------');
    // console.log(data.toString());
    var results = data.toString().split('\n');
    // console.log('---------results---------');
    // console.log(results);
    
    callback(results);
  });
};

exports.isUrlInList = function(url, callback) {
  // var listIncludesUrl = exports.readListOfUrls(callback);
  // console.log('------------------------');
  // console.log(listIncludesUrl);

  exports.readListOfUrls((list) => { callback(list.indexOf(url) > -1); });

};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(archive.paths.list, requestURL + '\n', (err) => {
    if (err) { console.error(err); }  
  });
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
