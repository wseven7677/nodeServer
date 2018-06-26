import mongodb from 'mongodb'
import mongoKey from './mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbPort = mongoKey.dbPort,
    dbUrl = mongoKey.dbUrl;

const mongoBook = function (collect, data, callback) {
    mongoClient.connect(dbUrl, function (err, db) {
      if(err) {
        throw err;
      }
      console.log('database connected.');

      var onedb = db.db(dbName),
          oneCollection = onedb.collection(collect),
          tag = data.tag,
          subTag = data.subTag;

      switch(data.demand) {
          case 'a':

            break;
          case 'm':
          break;
          case 'd':
          break;
          default:
      }

      db.close();
      console.log('database closed.');
    });
};

export default mongoBook;
