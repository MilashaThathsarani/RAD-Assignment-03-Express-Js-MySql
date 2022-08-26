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
        var userTableQuery = "CREATE TABLE IF NOT EXISTS orders (orderId VARCHAR(255) PRIMARY KEY , date DATE, customerId VARCHAR(255))"
        connection.query(userTableQuery, function (error,result) {
            if (error) throw error;
            //console.log(result);
            if (result.warningCount === 0){
                console.log("order table Created");
            }
        })
    }
})

router.post('/', (req,res) =>{
    console.log(req.body)
    const orderId = req.body.orderId;
    const date = req.body.date;
    const customerId = req.body.customerId;

    var query = "INSERT INTO orders (orderId,date,customerId) VALUES (?,?,?)"
    connection.query(query, [orderId,date,customerId],(error) =>{
        if (error){
            res.send({'message' :'Duplicate Entry'})
        }else {
            res.send({'message' : 'Order Created'})
        }
    });
})

router.get('/',(req,res) =>{
    var query = "SELECT * FROM orders"
    connection.query(query, (error,rows) =>{
        if (error) throw error
        res.send(rows)
    })
})

module.exports = router