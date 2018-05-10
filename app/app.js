import express from 'express'
import mongo from './mongo'
import bodyparser from 'body-parser'
import multer from 'multer'

var app = express(),
    nodePort = 8080,
    rs = ['users', 'history', 'pictures', 'members'], // 需手动添加数据库中的collcetions，后续改自动识别。
    upload = multer({
      dest: '/var/www/aptxwslmbjs.tk/static/img/'
 //     filename: function(req,file,cb){
 //       cb(null,'uploadpic-'+Date.now()+'.png');
 //     }
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

app.listen(nodePort, 'localhost', function() {
  console.log('service is on.');
});
