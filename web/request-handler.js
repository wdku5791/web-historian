var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var qs = require('querystring'); 
// require more modules/folders here!
var fs = require('fs');
var helpers = require('./http-helpers');
var headers = helpers.headers;





exports.handleRequest = function (req, res) {
  var method = req.method;
  var url = req.url;
  var body = '';

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
        if (err) { 
          res.writeHead(404, headers);
          res.end();
        } else {
          res.end(data);
        }
      });
    }
  }

  //POST Method

  if (req.method === 'POST') {


    // var siteIsArchived = fs.stat(archive.paths.archivedSites + url, (err, stats) => {
    //   if (err) { return false; }
    //   console.log('------stats------', stats);
    // });

    req.on('error', function(err) {
      console.error(err);
    });
    req.on('data', function(chunk) {
      body += chunk.toString();
    });
    req.on('end', function() {

      console.log('-------------------------------------');
      // console.log('body', body); 
      var requestURL = body.slice(4);
      // console.log('request url', requestURL);
      // create variable for the path to the requested site
      var pathToRequestedSiteFile = archive.paths.archivedSites + '/' + requestURL;
      // attempt to read that file
      fs.appendFile(archive.paths.list, requestURL + '\n', (err) => {
        if (err) { console.error(err); }
        fs.readFile(pathToRequestedSiteFile, (err, data) => {
          console.log('----------data---------------------');
          console.log(data);
          if (err) {
            // helpers.sendLoadingPath(res);
          } else {
            res.writeHead(302, headers);
            res.write(data);
            res.end();
          }
        });
      });


      // if error
      // append url to sites.txt (for later processing)
      // send to loading page


      // console.log('request url', requestURL);
     
      

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
