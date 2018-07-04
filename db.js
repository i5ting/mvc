var mongoose = require('mongoose')
var host

var config = require('./config/mongodb')

var is_debug = config.is_debug

if (is_debug) {
    console.log('\033[32m提醒:debug状态连接数据库:\033[39m')
    host = config.host
} else {
    console.log('\033[91m警告:非debug状态连接数据库:\033[39m')
    host = config.host
}

var db = config.db
var port = config.port
var connectionString = 'mongodb://' + host + ':' + port + '/' + db + ''

var options = {
    // useMongoClient: true,
    useNewUrlParser: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
}

console.log(connectionString)

mongoose.connect(connectionString, options, function (err, res) {
    if (err) {
        console.log('[mongoose log] Error connecting to: ' + connectionString + '. ' + err)
        return process.exit(1)
    } else {
        return console.log('[mongoose log] Successfully connected to: ' + connectionString)
    }
})

db = mongoose.connection

db.on('error', console.error.bind(console, 'mongoose connection error:'))

db.once('open', function () {
    return console.log('mongoose open success')
})

module.exports = db