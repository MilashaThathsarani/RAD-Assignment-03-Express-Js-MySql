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
        var userTableQuery = "CREATE TABLE IF NOT EXISTS orderDetails (ordersId VARCHAR(255) PRIMARY KEY , qty INT, price DOUBLE ,itemCode VARCHAR(255))"
        connection.query(userTableQuery, function (error,result) {
            if (error) throw error;
            //console.log(result);
            if (result.warningCount === 0){
                console.log("orders table Created");
            }
        })
    }
})

router.post('/', (req,res) =>{
    console.log(req.body)
    const ordersId = req.body.ordersId;
    const qty = req.body.qty;
    const price = req.body.price;
    const itemCode = req.body.itemCode;

    var query = "INSERT INTO orderDetails (ordersId,qty,price,itemCode) VALUES (?,?,?,?)"
    connection.query(query, [ordersId,qty,price,itemCode],(error) =>{
        if (error){
            res.send({'message' :'Duplicate Entry'})
        }else {
            res.send({'message' : 'Order Details Created'})
        }
    });
})

router.get('/',(req,res) =>{
    var query = "SELECT * FROM orderDetails"
    connection.query(query, (error,rows) =>{
        if (error) throw error
        res.send(rows)
    })
})

module.exports = router