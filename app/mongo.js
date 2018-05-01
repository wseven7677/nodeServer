import mongodb from 'mongodb'

var mongoClient = mongodb.MongoClient,
    dbName = 'ycjxc',
    dbPort = '27017',
    dbUrl = 'mongodb://localhost:' + dbPort + '/';

const mongo = function (collect, callback) {
    mongoClient.connect(dbUrl, function (err, db) {
      if(err) {
        throw err;
      }
      console.log('database connected.');

      var onedb = db.db(dbName);
      onedb.collection(collect).find().toArray(function (err, rst) {
        if(err) {
          throw err;
        }

        callback(rst); // 返回数据处

        db.close();
        console.log('database closed.');
      });
    });
};

export default mongo;
