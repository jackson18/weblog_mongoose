/**
 * Created by Administrator on 2015/1/17.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'qi'
});

module.exports = pool;