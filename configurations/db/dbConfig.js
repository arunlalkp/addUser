let MongoClient = require('mongodb').MongoClient

let state = {
    db: null,
};

exports.connect = function (url, done) {
    if (state.db) return done()

    MongoClient.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}, function (err, client) {
        if (err) return done(err)
        // Set Database Name
        const dbName = 'addUser'
        state.db = client.db(dbName)
        done()
    })
};

exports.get = function () {
    return state.db
};

exports.close = function (done) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
};
