var express = require('express');

var router = express.Router();

var request = require('request');
var collections_backend_api_url = 'http://ec2-35-163-145-38.us-west-2.compute.amazonaws.com/collections';


/* GET /collections/find/:order_no via collections-backend-api */
router.get('/find/:order_no', function(req, res, next) {
request(collections_backend_api_url +"/"+ req.params.order_no, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body); // no need to convert body to json. use send instead
    }
  });
});

/* PUT /collections/process/:order_no via collections-backend-api */
router.put('/process/:order_no', function(req, res, next) {
var status_val = '' + req.query.status;
request({
    url: collections_backend_api_url + "/" + req.params.order_no,
    qs: {status: status_val},
    method: 'PUT'
},
function (error, response, body) {
    if (!error && response.statusCode == 200) {
         res.send(body); // no need to convert body to json. use send instead
    }
  });
});

//HTTP GET request to collections-backend-api.
router.get('/', function(req, res, next) {
request(collections_backend_api_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        res.send(body); // no need to convert body to json. use send instead
    }
  });
});

module.exports = router;