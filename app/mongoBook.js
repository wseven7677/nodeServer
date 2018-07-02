import mongodb from 'mongodb'
import mongoKey from './mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbUrl = mongoKey.dbUrl;

const mongoBook = function (collect, data, callback) {
    mongoClient.connect(dbUrl, function (err, db) {
      if(err) {
        throw err;
      }
      console.log('database connected.');

      var onedb = db.db(dbName),
          oneCollection = onedb.collection(collect),
          bookContent = data;

      oneCollection.remove({});
      oneCollection.insertMany(bookContent);

      callback(true);

      db.close();
      console.log('database closed.');
    });
};

export default mongoBook;
