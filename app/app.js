import express from 'express'

import mongo from './mongo'
import mongoBook from './mongoBook'
import mongoUser from './mongoUser'

import bodyparser from 'body-parser'
import multer from 'multer'

var app = express(),
    nodePort = 8080,
    rs = ['history', 'pictures', 'members','news'], // 需手动添加数据库中的collcetions，后续改自动识别。
    storage = multer.diskStorage({
        destination: '/var/www/ycjxc.com/static/img/',
        filename(req, file, cb) {
            cb(null, 'uploadpic-' + Date.now() + '.png');
        }
    }),
    upload = multer({
        storage
    });

app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

function handleUploadPic(req) {
    var rst = req.body;
    rst.img = req.file.filename;
    rst.demand = 'pic';

    return rst;
}
function handleUploadNews(req) {
    var rst = req.body,
        tmpDate = new Date();
    rst.img = req.file.filename;
    rst.demand = 'news';
    rst.time = tmpDate.toString();

    return rst;
}

// === GET & cardCollection post ===

rs.forEach(function(value, index) {

    // ---get:---
    app.get('/api/' + value, function(req, res) {

        // 后端验证：

        // 取数据，发数据：
        mongo(value, req.query, function(resd) {
            res.send(resd);
        });
    });

    // ---post:---
    app.post('/api/' + value, function(req, res) {
        // 后端验证：

        // 取数据，发数据：
        mongo(value, req.body, function(resd) {
            res.send(resd);
        });
    });
});

// ---upload pictures---

app.post('/api/members2uploadpic/', upload.single('imgObj'), function(req, res) {
    // 取数据，发数据：
    mongo('members', handleUploadPic(req), function(resd) {
        res.send(resd);
    });
});
app.post('/api/pictures2uploadpic/', upload.single('imgObj'), function(req, res) {
    // 取数据，发数据：
    mongo('pictures', handleUploadPic(req), function(resd) {
        res.send(resd);
    });
});
app.post('/api/news2uploadpic/', upload.single('imgObj'), function(req, res) {
    // 取数据，发数据：
    mongo('news', handleUploadNews(req), function(resd) {
        res.send(resd);
    });
});

// ----- handle BookCollection post ------

app.post('/api/book4/history', (req, res) => {
    // 取数据，发数据：
    mongoBook('history', req.body, resd => {
        res.send(resd); // true
    });
});

// ----- user validate ------

app.post('/api/users', (req, res) => {
    // 取数据，发数据：
    mongoUser('users', req.body, resd => {
        res.send(resd); // true
    });
});

// ----- handle BookCollection post ------

app.post('/api/book4/history', (req, res) => {
  // 取数据，发数据：
  mongoBook('history', req.body, resd => {
    res.send(resd); // true
  });
});

app.listen(nodePort, 'localhost', function() {
    console.log('service is on.');
});
