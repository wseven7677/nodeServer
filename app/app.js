import express from 'express'
import mongo from './mongo'

var app = express();

app.get('/api/history', function (req, res) {
   res.send([{"title": "自然地理","content": "hello from node~自-然-地-理"}]);
});

app.get('/api/pictures', function (req, res) {
   res.send([{"img": "imgIndexShow_1.jpg","title": "hello from node~"}]);
});

app.get('/api/members', function (req, res) {
   res.send([{"img": "imgIndexShow_1.jpg","title": "hello from node~"}]);
});


app.listen(8080,'localhost', function () {
   console.log('service is on.');
});
