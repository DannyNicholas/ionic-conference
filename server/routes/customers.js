var https = require('https');

var options = {
  protocol: 'https:',
  host: 'bristol-stage.community-currency.org',
  path: '/cyclos/sandbox01/web-rpc/users/search',
  method: 'POST',
  headers: {'content-type': 'application/json'},
  auth: 'test1:testing123',
  body:  JSON.stringify({
      'operation': 'search',
      'params': {
          'keywords': 'user',
          'groups': 'consumers',
          'pageSize': 5
      }
  }),

};

exports.getCustomers = function (req, res, next) {
  console.log('request...');
  console.log('requesting...')

  // create request and provide callback
  var httpReq = https.request(options, function(httpRes) {
    console.log('res :'  + httpRes);
    console.log('STATUS: ' + httpRes.statusCode);
    console.log('HEADERS: ' + JSON.stringify(httpRes.headers));

    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    var body;
    httpRes.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    })
    .on('end', function() {
      body = Buffer.concat(bodyChunks);
      const bodyObject = JSON.parse(body);
      const pageItems = JSON.stringify(bodyObject.result.pageItems);
      console.log('BODY: ' +  pageItems);
      // ...and/or process the entire body here.

      // send back results
      res.send(pageItems);
    })

  //  console.log(res);
    // send back results
    //res.send(body);
  })

  // error handling
  httpReq.on('error', function(e) {
   console.log('ERROR: ' + e.message);
  });

  // request body
  httpReq.write( JSON.stringify({
    'operation': 'search',
    'params': {
        'keywords': 'user',
        'groups': 'consumers',
        'pageSize': 5
    }
  }));

  // required to send request
  httpReq.end();
 }
