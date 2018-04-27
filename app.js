var express = require('express'),
    mongodb = require('mongodb');

var app = express();

app.get('/api/members', function (req, res) {
   res.send([{"img": "imgIndexShow_1.jpg","title": "hello from node~"}]);
});

app.listen(8080,'localhost', function () {
   // console.log('service is on port xxxx.');
});
