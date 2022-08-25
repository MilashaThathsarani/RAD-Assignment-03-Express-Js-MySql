const express = require('express');
const router = express.Router();
const mysql = require('mysql')
const db = require('../configs/db.config')

const connection = mysql.createConnection(db._database)

connection.connect(function (error) {
    if (error) {
        console.log(error);
    }else {
        console.log("Connected to the MySQL Server")
        var userTableQuery = "CREATE TABLE IF NOT EXISTS item (code VARCHAR(255) PRIMARY KEY , itemName VARCHAR (255),qty INT, price DOUBLE)"
        connection.query(userTableQuery, function (error,result) {
            if (error) throw error;
            //console.log(result);
            if (result.warningCount === 0){
                console.log("item table Created");
            }
        })
    }
})

router.post('/', (req,res) =>{
    console.log(req.body)
    const code = req.body.code;
    const itemName = req.body.itemName;
    const qty = req.body.qty;
    const price = req.body.price;

    var query = "INSERT INTO item (code, itemName, qty,price) VALUES (?,?,?,?)"
    connection.query(query, [code,itemName,qty,price],(error) =>{
        if (error){
            res.send({'message' :'Duplicate Entry'})
        }else {
            res.send({'message' : 'User created'})
        }
    });
})


module.exports = router