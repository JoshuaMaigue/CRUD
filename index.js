const mysql = require('mysql');
const express = require('express');
var app = express();

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '09269646206ferbpogi',
    database: 'inventory'
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeeded');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err,undefined, 2));
});
