import mongodb from 'mongodb'
import mongoKey from './mongoKey'

var mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;

const mongo = function (collect, data, callback) {
    mongoClient.connect(dbUrl, function (err, db) {
      if(err) {
        throw err;
      }
      console.log('database connected.');
      var onedb = db.db(dbName),
          oneCollection = onedb.collection(collect),
          trashpic = onedb.collection('trashpic');

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

          oneCollection.find({'title': data.title}).toArray((err, result) => {
              if(err) {throw err;}
              if(result.length > 0){
                  trashpic.insert({'title': result[0].img});
              }
          });

        oneCollection.remove({
          'title': data.title
        },{justOne: true}); // 仅删除一个项目


        callback(true);

      }else if (data.demand === 'a') { // --增加项目--
        oneCollection.insert({
          'img': 'default-error.png',
          'title': '请键入标题'+Math.round(Math.random()*10000)
        });

        callback(true);

      }else if (data.demand === 'pic') { // --替换图片--

          oneCollection.find({'title': data.title}).toArray((err, result) => {
              if(err) {throw err;}
              if(result.length > 0){
                  trashpic.insert({'title': result[0].img});
              }
          });

        oneCollection.update({
          'title': data.title
        },{
          $set: {
            'img': data.img
          }
        });

        callback(true);

    }else if(data.demand === 'news'){
        oneCollection.insert({
            'title': data.title,
            'time': data.time,
            'content': data.content,
            'img': data.img
        });

        callback(true);

    }else if(data.demand === 'd-news'){
        oneCollection.find({'time': data.time}).toArray((err, result) => {
            if(err) {throw err;}
            if(result.length > 0){
                trashpic.insert({'title': result[0].img});
            }
        });

        oneCollection.remove({
          'time': data.time
        },{justOne: true}); // 仅删除一个项目

        callback(true);

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
