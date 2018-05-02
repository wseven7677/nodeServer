import express from 'express'
import mongo from './mongo'

var app = express(),
    rs = ['users','history','pictures','members'];

rs.forEach(function (value, index) {
  app.get('/api/' + value, function (req, res) {
    mongo(value,function (resd) {
      res.send(resd);
    });
  });
});

app.listen(8080,'localhost', function () {
   console.log('service is on.');
});
