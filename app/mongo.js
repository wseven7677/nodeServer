import mongodb from 'mongodb'

var mongoClient = mongodb.MongoClient,
    dbName = 'ycjxc',
    dbPort = '27017',
    dbUrl = 'mongodb://localhost:' + dbPort + '/';

const mongo = function (collect, data, callback) {
    mongoClient.connect(dbUrl, function (err, db) {
      if(err) {
        throw err;
      }
      console.log('database connected.');

      var onedb = db.db(dbName),
          oneCollection = onedb.collection(collect);

      if (data.demand === 'm') { // --修改项目内容--
        oneCollection.update({
          'title': data.extitle
        },{
          $set: {
            'title': data.title
          }
        });

        callback(true);

      }else if(data.demand === 'd'){ // --删除项目--
        oneCollection.find({
          'title': data.title // 查询是否有这一项
        }).toArray(function (err, rst) {
          if(err) {
            throw err;
          }

            oneCollection.remove({ // 如果有 去删除
              'title': data.title
            },{justOne: true}); // 仅删除一个项目

        });
      }else if (data.demand === 'a') { // --增加项目--
        oneCollection.insert({
          'img': 'logo.png',
          'title': '请键入标题'
        });
      } else {
        oneCollection.find().toArray(function (err, rst) { // --查询项目--
          if(err) {
            throw err;
          }

          callback(rst); // 返回数据处
        });
      }

      db.close();
      console.log('database closed.');
    });
};

export default mongo;
