var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var qs = require('querystring'); 
// require more modules/folders here!
var fs = require('fs');




exports.handleRequest = function (req, res) {
  var method = req.method;
  var url = req.url;
  var body = [];

  var indexPath = path.join(__dirname, '../web/public/index.html');
  console.log(url);
  if (req.method === 'GET') {
    if (url.length <= 1) {
      fs.readFile(indexPath, (err, data) => {
        if (err) { throw (err); }
        res.end(data);
      });
    } else {
      fs.readFile(archive.paths.archivedSites + url, (err, data) => {
        if (err) { console.log(err); }
        // console.log(data);
        res.end(data);
      });
    }
  }

  //POST Method

  if (req.method === 'POST') {

    var siteIsArchived = fs.stat(archive.paths.archivedSites + url, (err, stats) => {
      if (err) { return false; }
      console.log('------stats------', stats);
    });

    req.on('error', function(err) {
      console.error(err);
    });
    req.on('data', function(chunk) {
      body.push(chunk.toString());
    });
    req.on('end', function() {
      console.log('-------------------------------------');
      console.log('body', body); 
      console.log('url', url);
    });

    // fs.write()

    var loadingPage = archive.paths.siteAssets + '/loading.html';
    fs.readFile(loadingPage, (err, data) => {
      if (err) { console.error(err); }
      res.end(data);
    });
  }

  // requeston.on('error', function(err) {
  //   console.error(err);
  // }).on('data', function(chunk) {
  //   body.push(chunk);
  // }).on('end', function(err) {
  //   body = Buffer.concat(body).toString();

  //   response.on
  // })

  // res.end(path.join(__dirname, '../web/public/index.html'));
  // res.end(archive.paths.list);
};
