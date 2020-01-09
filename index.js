const mysql = require('mysql');
const express = require('express');
var app = express();

//Set up connection
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '09269646206ferbpogi',
    database: 'inventory'
});

//Check connection
mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeeded');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err,undefined, 2));
});

//Setup port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Get all items
app.get('/items', (req,res) => {
    mysqlConnection.query('SELECT * FROM inventory.items', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

