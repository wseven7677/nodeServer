let dbName = 'your db name',
    dbPort = '27017',
    dbUser = 'your user name',
    dbPassword = 'your user password',
    dbUrl = 'mongodb://'+dbUser+':'+dbPassword+'@'+'localhost:' + dbPort + '/'+dbName;

const mongoKey = {
    dbName,
    dbPort,
    dbUrl,
    dbUser,
    dbPassword
};

export default mongoKey;
