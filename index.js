const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

//Set up connection
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '09269646206ferbpogi',
    database: 'inventory',
    multipleStatements: true
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
app.get('/items/:id', (req,res) => {
    mysqlConnection.query('SELECT * FROM inventory.items WHERE id = ?',[req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an item
app.delete('/items/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM inventory.items WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    })
})

//Insert an item
app.post('/items', (req, res) => {
    let ite = req.body;
    var sql = "SET @id = ?;SET @name = ?;SET @qty = ?;SET @amount = ?; \
    CALL AddOrEditItem(@id,@name,@qty,@amount);";
    mysqlConnection.query(sql, [ite.id, ite.name, ite.qty, ite.amount], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array)
                    res.send('Inserted item id : ' + element[0].id);
            });
        else
            console.log(err);
    })
});

//Update an item
app.put('/items', (req, res) => {
    let ite = req.body;
    var sql = "SET @id = ?;SET @name = ?;SET @qty = ?;SET @amount = ?; \
    CALL AddOrEditItem(@id,@name,@qty,@amount);";
    mysqlConnection.query(sql, [ite.id, ite.name, ite.qty, ite.amount], (err, rows, fields) => {
        if (!err)
            res.send('Updated succesfully');
        else
            console.log(err);
    })
});