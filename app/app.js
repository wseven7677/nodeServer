import express from 'express'
import mongo from './mongo'

var app = express(),
    nodePort = 8080,
    rs = ['history','pictures','members'];// 需手动添加数据库中的collcetions，后续改自动识别。

rs.forEach(function (value, index) {
  app.get('/api/' + value, function (req, res) {

    // 后端验证：

    // 取数据，发数据：
    mongo(value,function (resd) {
      res.send(resd);
    });
  });
});

app.listen(nodePort,'localhost', function () {
   console.log('service is on.');
});
