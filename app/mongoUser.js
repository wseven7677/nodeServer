import mongodb from 'mongodb'
import mongoKey from './mongoKey'

let mongoClient = mongodb.MongoClient,
    dbName = mongoKey.dbName,
    dbPort = mongoKey.dbPort,
    dbUrl = mongoKey.dbUrl;

const mongoUser = function(collect, data, callback) {
    mongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            throw err;
        }
        console.log('database connected.');

        var onedb = db.db(dbName),
            oneCollection = onedb.collection(collect);

        oneCollection.find().toArray(function(error, rst) { // --查询项目--
            if (error) {
                throw error;
            }
            let flag = false,
                foundUser = {};
            rst.forEach((oneUser) => {
                if (oneUser.username === data.logusr && oneUser.userpw === data.logpw) {
                    flag = true;
                    foundUser = oneUser;
                }
            });
            if(flag) {
                callback(foundUser);
            }else {
                callback(false);
            }
        });

        db.close();
        console.log('database closed.');
    });
};

export default mongoUser;
